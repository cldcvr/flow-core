/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import globalStyle from "./f-log-global.scss?inline";
import eleStyle from "./f-log.scss?inline";

import { FRoot, flowElement, FDiv } from "@cldcvr/flow-core";

import { injectCss } from "@cldcvr/flow-core-config";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { classMap } from "lit/directives/class-map.js";
// Anser is used to highlight bash color codes
import anser from "anser";

injectCss("f-log", globalStyle);
// The number of lines we process in one batch
const DEFAULT_BATCH_SIZE = 1000;

// The maximum character length we process in a line, this is to prevent overflows
const MAXIMUM_LINE_LENGTH = 10000;

// Adds some general formatting/highlighting to logs
function formatLogLine(logLine: string): string {
	// Highlight [xxx] with a greyed out version
	let newLine = logLine
		// Highlight quoted strings
		//@ts-ignore
		.replaceAll(/("[^"]*?"|'[^']*?')/g, '<span style="color: #bdab0f">$1</span>')

		// Highlight bracket contents
		// 100 is an arbitrary limit to prevent catastrophic backtracking in Regex
		.replaceAll(
			/(\[[^\]]{0,100}\])/g,
			'<span style="color:var(--color-text-subtle); font-weight: bold;">$1</span>'
		)

		// Highlight potential dates (YYYY/MM/DD HH:MM:SS)
		.replaceAll(
			/(\d{1,4}\/\d{1,2}\/\d{1,4}(?: \d{1,2}:\d{1,2}:\d{1,2})?)/g,
			'<span style="color: #68c9f2">$1</span>'
		)

		// Highlight potential dates (YYYY-MM-DD with timezone)
		.replaceAll(
			/(\d{1,4}-\d{1,2}-\d{1,4}(?:\s?T?\d{1,2}:\d{1,2}:[\d.]{1,10})?Z?)/g,
			'<span style="color: #68c9f2">$1</span>'
		)

		// Highlight YAML keys
		// 100 is an arbitrary limit to prevent catastrophic backtracking in Regex
		.replaceAll(
			/(^\s*[-\sa-z0-9_]{1,100}:\s)/gi,
			'<span style="color:var(--color-primary-default)">$1</span>'
		)

		// Highlight urls
		.replaceAll(
			/((https?:\/\/)([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:[0-9]+)?(\/[^" ]*)?)/g,
			'<a style="color: var(--color-primary-default); text-decoration: underline" href="$1" rel="noopener" target="_blank">$1</a>'
		) as string;

	if (/(ERROR|FAILED)/gi.test(newLine)) {
		newLine = `<span style="background: var(--color-danger-default)">${newLine}</span>`;
	}

	return newLine;
}

function getUniqueStringId() {
	return `${new Date().valueOf()}`;
}

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-log")
export class FLog extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute logs to be displayed on screen
	 */
	@property({ type: String, reflect: false })
	logs!: string;

	/**
	 * @attribute show search bar
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-search" })
	showSearch?: boolean = false;

	/**
	 * @attribute show scroll bar to scroll the terminal
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-scrollbar" })
	showScrollbar?: boolean = false;
	/**
	 * @attribute show scroll bar to scroll the terminal
	 */
	@property({ type: Boolean, reflect: true, attribute: "wrap-text" })
	wrapText?: boolean = false;

	scrollRef: Ref<FDiv> = createRef();

	logContainer: Ref<HTMLPreElement> = createRef();

	// These pointers are used to find out the current index of the logs string being rendered

	lastPointerIdx: number = 0;

	currentIdx: number = 0;

	currentBatchId: string = getUniqueStringId();

	requestIdleId?: number;

	// Processes the current log batch and renders the lines in the terminal
	processNextBatch(batchSize = DEFAULT_BATCH_SIZE) {
		let currentBatchSize = 0;

		let fragment = "";

		while (currentBatchSize < batchSize) {
			if (
				this.logs &&
				// If we have reached a new line
				(this.logs[this.currentIdx] === "\n" ||
					// Or if we exceed maximum log lines we render and move on
					this.currentIdx - this.lastPointerIdx > MAXIMUM_LINE_LENGTH)
			) {
				fragment = `${fragment}${this.getCurrentLogLine()}`;
				this.lastPointerIdx = this.currentIdx + 1;
				currentBatchSize++;
			}

			// Check if we ended up processing beyond the file
			if (this.logs && this.currentIdx === this.logs.length) {
				fragment = `${fragment}${this.getCurrentLogLine()}`;
				break;
			}

			this.currentIdx++;
		}

		this.logContainer.value?.append(document.createRange().createContextualFragment(fragment));
	}

	getCurrentLogLine() {
		return `<span>${anser.ansiToHtml(
			formatLogLine(this.logs.substring(this.lastPointerIdx, this.currentIdx + 1))
		)}</span>`;
	}

	// Renders log in batches to prevent browser from freezing
	renderBatchedLogs(batchId: string) {
		if (this.currentIdx < this.logs.length && this.currentBatchId === batchId) {
			this.processNextBatch();
			if (this.scrollRef.value && this.logs.length > 0) {
				this.scrollRef.value.scrollTop = this.scrollRef.value.scrollHeight;
			}
			if (this.requestIdleId) {
				cancelIdleCallback(this.requestIdleId);
			}
			this.requestIdleId = requestIdleCallback(() => this.renderBatchedLogs(batchId));
		}
	}
	render() {
		const cssClasses = {
			"logs-view": true,
			"flow-add-scrollbar": Boolean(this.showScrollbar),
			"wrap-text": Boolean(this.wrapText)
		};
		return html` <f-div
			${ref(this.scrollRef)}
			class=${classMap(cssClasses)}
			align="top-left"
			overflow="scroll"
			width="100%"
			height="100%"
		>
			<pre ${ref(this.logContainer)}></pre>
		</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		void this.updateComplete.then(() => {
			this.lastPointerIdx = 0;
			this.currentIdx = 0;
			this.currentBatchId = getUniqueStringId();
			if (this.logContainer.value) {
				this.logContainer.value.innerHTML = "";
			}
			this.renderBatchedLogs(this.currentBatchId);
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-log": FLog;
	}
}
