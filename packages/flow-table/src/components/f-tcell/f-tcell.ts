import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { customElement, property, query, state } from "lit/decorators.js";
import { FCheckbox } from "@cldcvr/flow-core/src/components/f-checkbox/f-checkbox";
import { FDiv } from "@cldcvr/flow-core/src/components/f-div/f-div";
import { FIconButton } from "@cldcvr/flow-core/src/components/f-icon-button/f-icon-button";
import { FIcon } from "@cldcvr/flow-core/src/components/f-icon/f-icon";
import { FRadio } from "@cldcvr/flow-core/src/components/f-radio/f-radio";
import { FTableSelectable } from "../f-table/f-table";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-tcell.scss";

export type FTcellAction = {
	icon: string;
	onClick?: (event: PointerEvent) => void;
	onMouseOver?: (event: MouseEvent) => void;
	onMouseLeave?: (event: MouseEvent) => void;
};

export type FTcellActions = FTcellAction[];
@customElement("f-tcell")
export class FTcell extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		...FDiv.styles,
		...FCheckbox.styles,
		...FRadio.styles,
		...FIcon.styles,
		...FIconButton.styles
	];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object, reflect: false })
	actions?: FTcellActions;

	@property({ type: Boolean, reflect: true })
	selected? = false;

	@state()
	selectable?: FTableSelectable = "none";

	@state()
	expandIcon = false;

	@query("f-checkbox")
	checkbox?: FCheckbox;

	@query("f-radio")
	radio?: FRadio;

	@query(".row-toggler")
	chevron?: FIconButton;

	renderActions() {
		if (this.actions) {
			return html`${this.actions.map(ac => {
				return html`<f-icon-button
					size="medium"
					category="packed"
					state="neutral"
					.icon=${ac.icon}
					@click=${ifDefined(ac.onClick)}
					@mouseover=${ifDefined(ac.onMouseOver)}
					@mouseleave=${ifDefined(ac.onMouseLeave)}
				></f-icon-button>`;
			})}`;
		}
		return nothing;
	}

	render() {
		return html`<f-div aling="middle-left" gap="medium"
			>${this.selectable === "multiple"
				? html`<f-checkbox @input=${this.handleSelection}></f-checkbox>`
				: nothing}
			${this.selectable === "single"
				? html`<f-radio @input=${this.handleSelection} class="cell-radio"></f-radio>`
				: nothing} <slot></slot>
			<f-div class="details-toggle" gap="medium" align="middle-right">
				${this.renderActions()}
				${this.expandIcon
					? html`
							<f-icon-button
								size="medium"
								category="packed"
								class="row-toggler"
								state="neutral"
								@click=${this.toggleDetails}
								icon="i-chevron-down"
							></f-icon-button>
					  `
					: nothing}
			</f-div>
		</f-div>`;
	}

	setSelection(value = false) {
		if (value) {
			if (this.checkbox) {
				this.checkbox.value = "checked";
			}
			if (this.radio) {
				this.radio.value = "selected";
			}
		} else {
			if (this.checkbox) {
				this.checkbox.value = "unchecked";
			}
			if (this.radio) {
				this.radio.value = "unselected";
			}
		}
	}

	handleSelection(event: CustomEvent) {
		const toggle = new CustomEvent("update-row-selection", {
			detail: event.detail.value === "checked" || event.detail.value === "selected",
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	toggleDetails() {
		const toggle = new CustomEvent("toggle-row", {
			detail: {},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);

		this.onmouseover = this.toggleColumnHighlight;

		this.onmouseleave = this.toggleColumnHighlight;
		this.onclick = this.toggleColumnSelection;
	}

	toggleColumnSelection() {
		const row = this.closest("f-trow");
		if (row?.getAttribute("slot") === "header") {
			const columnIndex = Array.from(this.parentNode?.children ?? []).indexOf(this);
			const toggle = new CustomEvent("selected-column", {
				detail: { columnIndex },
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(toggle);
		}
	}

	toggleColumnHighlight() {
		const row = this.closest("f-trow");
		if (row?.getAttribute("slot") === "header") {
			const columnIndex = Array.from(this.parentNode?.children ?? []).indexOf(this);
			const toggle = new CustomEvent("highlight-column", {
				detail: { columnIndex },
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(toggle);
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-tcell": FTcell;
	}
}