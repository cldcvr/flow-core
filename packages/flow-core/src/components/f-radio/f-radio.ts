import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-radio.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

export type FRadioState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-radio")
export class FRadio extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

  /**
   * @attribute Value of a radio defines if it is selected or not
   */
  @property({ reflect: true, type: String })
  value?: "selected" | "unselected" = "unselected";

  /**
   * @attribute States are used to communicate purpose and connotations.
   */
  @property({ reflect: true, type: String })
  state?: FRadioState = "inherit";

  /**
   * @attribute f-radio can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * emit event on click
   */
  handleClick() {
    const event = new CustomEvent("update", {
      detail: {
        value: this.value === "unselected" ? "selected" : "unselected",
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    /**
     * Final html to render
     */

    return html`
      <f-div padding="none" gap="small" direction="column">
        <f-div padding="none" gap="small" direction="row">
          <input
            type="radio"
            class="f-radio"
            checked=${this.value === "selected" ? true : false}
            size=${this.size}
            state=${this.state}
            @click=${this.handleClick}
          />
          <slot name="label-title"></slot>
        </f-div>
        <div class="f-radio-description" size=${this.size}>
          <slot name="label-description"></slot>
        </div>
      </f-div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-radio": FRadio;
  }
}
