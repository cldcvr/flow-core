import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import globalStyle from "./f-tab-content-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { flowElement } from "./../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
injectCss("f-tab-content", globalStyle);

@flowElement("f-tab-content")
export class FTabContent extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute Defines the transition to show the next tab content
	 */
	@property({ type: String, reflect: true })
	transition?: "fade" | "slide" | "none" = "none";

	/**
	 * @attribute Defines the duration of the transition. It accepts a value in ms(milli-seconds).Default value is 200 ms.
	 */
	@property({ type: Number, reflect: true })
	duration?: number = 200;

	render() {
		/**
		 * adding class and custom styling for transitions
		 */
		this.style.animationDuration = `${this.duration}ms`;
		if (this.transition === "fade") {
			this.setAttribute("class", "fade-effect-animation");
		}
		if (this.transition === "slide") {
			this.setAttribute("class", "slide-effect-animation");
		}

		/**
		 * Final html to render
		 */
		return html`<slot></slot>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-tab-content": FTabContent;
	}
}
