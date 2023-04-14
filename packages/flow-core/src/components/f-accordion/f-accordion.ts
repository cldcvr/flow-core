import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-accordion.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

export type FAccordionBodyHeightProp = `${number}px` | `${number}%` | `${number}vh`;

@customElement("f-accordion")
export class FAccordion extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: Boolean })
	open?: boolean = false;

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: String })
	icon?: "chevron" | "caret" | "plus" | "none" = "chevron";

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: String, attribute: "icon-size" })
	iconSize?: "x-small" | "small" | "medium" | "large" = "small";

	/**
	 * @attribute placement of icon on left or right
	 */
	@property({ reflect: true, type: String, attribute: "icon-placement" })
	iconPlacement?: "right" | "left" = "right";

	/**
	 * @attribute placement of icon on left or right
	 */
	@property({ reflect: true, type: String, attribute: "max-height" })
	maxHeight?: FAccordionBodyHeightProp;

	@query(".f-accordion")
	fAccordionBody?: FDiv;

	/**
	 * identify icon-name from string
	 */
	get iconName() {
		return this.icon === "caret"
			? "i-caret-down"
			: this.icon === "chevron"
			? "i-chevron-down"
			: this.open
			? "i-minus"
			: "i-plus";
	}

	/**
	 * toggle accordion
	 */
	toggleAccordion() {
		this.open = !this.open;
	}

	/**
	 * handling max-height of body
	 */
	handleAccordionBody() {
		if (this.fAccordionBody) {
			if (this.maxHeight) {
				if (this.open) {
					this.fAccordionBody.style.setProperty("max-height", this.maxHeight, "important");
					this.fAccordionBody.style.setProperty("overflow-y", "scroll", "important");
				} else {
					this.fAccordionBody.style.setProperty("max-height", "0px", "important");
				}
			}
		}
	}

	render() {
		// render accordion-icon
		const accordionIcon = html` <f-div height="hug-content" width="hug-content" overflow="hidden">
			<f-icon-button
				icon=${this.iconName}
				class=${this.icon === "caret" || this.icon === "chevron" ? "f-accordion-icon" : ""}
				?data-accordion-open=${this.open}
				variant="block"
				category="packed"
				.size=${this.iconSize}
				state="inherit"
			></f-icon-button>
		</f-div>`;

		return html`
			<f-div direction="column" width="100%">
				<f-div
					height="hug-content"
					@click=${this.toggleAccordion}
					align="middle-left"
					.gap=${this.iconPlacement === "left" ? "medium" : "auto"}
					width="100%"
					class="f-accordion-header"
					padding="medium"
					state="default"
					clickable
				>
					${this.icon !== "none" && this.iconPlacement === "left" ? accordionIcon : ""}
					<slot></slot>
					${this.icon !== "none" && this.iconPlacement === "right" ? accordionIcon : ""}
				</f-div>
				<f-div
					class="f-accordion"
					?data-accordion-open=${this.open}
					direction="column"
					padding="none medium"
					overflow="hidden"
				>
					<slot name="body"></slot>
				</f-div>
			</f-div>
		`;
	}
	updated() {
		this.handleAccordionBody();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-accordion": FAccordion;
	}
}
