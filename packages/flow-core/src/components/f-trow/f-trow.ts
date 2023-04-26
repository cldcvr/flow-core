import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { FTcell } from "../f-tcell/f-tcell";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-trow.scss";

@customElement("f-trow")
export class FTrow extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FIcon.styles];

	/**
	 * @attribute is details slot collapsed
	 */
	@property({ type: Boolean, reflect: true })
	open?: boolean;

	/**
	 * @attribute is row selected
	 */
	@property({ type: Boolean, reflect: true })
	selected?: boolean;

	@query(".expandable")
	expndablePanel?: FTcell;

	@query("slot[name='details']")
	detailsSlotElement!: HTMLSlotElement;

	render() {
		return html`<slot
				@slotchange=${this.propogateProps}
				@toggle-row=${this.toggleDetails}
				@toggle-row-selection=${this.handleInput}
			></slot>

			<f-div
				direction="column"
				border="small solid default bottom"
				class="expandable ${this.open ? "opened" : "closed"}"
			>
				<slot name="details" @slotchange=${this.handleDetailsSlot}></slot>
			</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		const allCells = this.querySelectorAll(":scope > f-tcell");
		if (this.expndablePanel) {
			this.expndablePanel.style.gridColumnEnd = `${allCells.length + 1}`;
		}

		this.propogateProps();
	}

	propogateProps() {
		const firstCell = this.querySelector<FTcell>(":scope > f-tcell");
		firstCell?.setSelection(this.selected);
		this.handleDetailsSlot();
	}

	toggleDetails(event: CustomEvent) {
		this.open = !this.open;
		const chevron = (event.target as FTcell).chevron;
		if (chevron) {
			if (this.open) {
				chevron.source = "i-chevron-up";
			} else {
				chevron.source = "i-chevron-down";
			}
		}
	}

	handleInput(event: CustomEvent) {
		this.selected = event.detail;
		const toggle = new CustomEvent("select", {
			detail: { element: this, value: event.detail },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	handleDetailsSlot() {
		if (this.detailsSlotElement.assignedNodes().length > 0) {
			const lastCell = this.lastElementChild as FTcell;
			lastCell.expandIcon = true;

			const chevron = lastCell.chevron;
			if (chevron) {
				if (this.open) {
					chevron.source = "i-chevron-up";
				} else {
					chevron.source = "i-chevron-down";
				}
			}
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-trow": FTrow;
	}
}