import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-form-group.scss?inline";
import globalStyle from "./f-form-group-global.scss?inline";
import { flowElement } from "./../../utils";

import { injectCss } from "@ollion/flow-core-config";
import { ifDefined } from "lit-html/directives/if-defined.js";
injectCss("f-form-group", globalStyle);

export type FGroupLabel = {
	title: string;
	description?: string;
	iconTooltip?: string;
};

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-form-group")
export class FFormGroup extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles, ...FText.styles];

	/**
	 * @attribute Label for showing group label
	 */
	@property({ type: Object, reflect: true })
	label?: FGroupLabel;

	/**
	 * @attribute Variant decides whether the input elements in a group have some gap or not when they are aligned horizontally.
	 */
	@property({ type: String, reflect: true })
	variant?: "normal" | "compact" = "normal";

	/**
	 * @attribute Decides the direction of the input elements within the group.
	 */
	@property({ type: String, reflect: true })
	direction?: "vertical" | "horizontal" = "vertical";

	/**
	 * @attribute decides the gap between elements of a group
	 */
	@property({ type: String, reflect: true })
	gap?: "large" | "medium" | "small" | "x-small" = "small";

	/**
	 * @attribute Defines whether the group will be collapsed as an accordion or as text.
	 */
	@property({ type: String, reflect: true })
	collapse?: "none" | "accordion" | "text" = "none";

	/**
	 * @attribute Defines whether the group will be collapsed as an accordion or as text.
	 */
	@property({ type: Boolean, reflect: true, attribute: "is-collapsed" })
	isCollapsed?: boolean = false;

	/**
	 * @attribute Allows the group to be duplicated by clicking on the plus button
	 */
	@property({ type: Boolean, reflect: true, attribute: "can-duplicate" })
	canDuplicate?: boolean = false;

	/**
	 * apply styles
	 */
	applyStyles() {
		if (this.collapse !== "none") {
			if (!this.isCollapsed)
				return `max-height:800px; transition: max-height var(--transition-time-rapid) ease-in 0s; );`;
			else
				return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s; );`;
		} else return ``;
	}

	/**
	 * apply cursor styles
	 */
	applyCursorStyles() {
		if (this.collapse !== "none") {
			return `cursor:pointer`;
		} else return ``;
	}

	/*
	 * emit duplication event
	 */
	duplicationClick(e: MouseEvent) {
		e.stopPropagation();
		const event = new CustomEvent("duplicate-group", {
			detail: {
				message: "Duplicate Group clicked!",
				duplicate: true
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	render() {
		/**
		 * Final html to render
		 */
		return html` <f-div direction="column" height="hug-content" width="100%" .gap=${this.gap}>
			${this.label &&
			Object.keys(this.label)?.length > 0 &&
			Object.values(this.label)?.every(item => item !== undefined)
				? html`
						<f-div
							direction="row"
							gap="auto"
							align="middle-left"
							class="f-form-group-label-wrapper"
							@click=${() => {
								if (this.collapse !== "none") this.isCollapsed = !this.isCollapsed;
							}}
							.style="${this.applyCursorStyles()}"
						>
							<f-div gap="x-small" direction="column" width="fill-container">
								<f-div gap="small" direction="row">
									<f-div height="hug-content" width="hug-content">
										<f-text
											variant="heading"
											size="small"
											weight="regular"
											data-qa-label-for=${ifDefined(this.dataset["qaId"])}
											.state=${this.collapse === "text" ? "primary" : "default"}
										>
											${this.collapse === "text"
												? html`<a
														href=""
														@click=${(e: MouseEvent) => {
															e.preventDefault();
															if (this.collapse === "text") {
																this.isCollapsed = !this.isCollapsed;
															}
														}}
														>${this.label.title}</a
												  >`
												: html`${this.label.title}`}
										</f-text>
									</f-div>
									${this.label?.iconTooltip
										? html` <f-icon
												source="i-question-filled"
												size="small"
												state="default"
												data-qa-info-icon-for=${ifDefined(this.dataset["qaId"])}
												.tooltip="${this.label?.iconTooltip}"
												clickable
										  ></f-icon>`
										: nothing}
								</f-div>
								${this.label?.description
									? html` <f-div height="hug-content" width="hug-content">
											<f-text variant="para" size="small" weight="regular">
												${this.label.description}
											</f-text>
									  </f-div>`
									: nothing}
							</f-div>
							<f-div
								direction="row"
								gap="small"
								width="hug-content"
								padding="none large none none"
								align="middle-center"
							>
								${this.canDuplicate
									? html` <f-icon
											source="i-plus-fill"
											size="medium"
											state="default"
											clickable
											@click=${this.duplicationClick}
									  ></f-icon>`
									: nothing}
								${this.collapse === "accordion"
									? html` <f-icon
											.source=${!this.isCollapsed ? "i-chevron-up" : "i-chevron-down"}
											size="small"
											state="default"
											clickable
									  ></f-icon>`
									: nothing}
							</f-div>
						</f-div>
				  `
				: nothing}
			${!this.isCollapsed || this.collapse === "none"
				? html`
						<f-div gap="small">
							<f-div
								direction=${this.direction === "vertical" ? "column" : "row"}
								.gap=${this.variant === "compact" && this.direction === "horizontal"
									? "none"
									: this.gap}
							>
								<slot></slot>
							</f-div>
							<slot name="action"></slot>
						</f-div>
				  `
				: nothing}
		</f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-form-group": FFormGroup;
	}
}
