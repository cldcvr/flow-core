import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-text-area.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FForm } from "../f-form/f-form";

export type FTextAreaState = "primary" | "default" | "success" | "warning" | "danger";

export type FTextAreaCustomEvent = {
  value: string;
};

@customElement("f-text-area")
export class FTextArea extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute value to be inserted in text-area.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute categories are of three types.
   */
  @property({ reflect: true, type: String })
  category?: "fill" | "transparent" | "outline";

  /**
   * @attribute States are used to communicate purpose and connotations.
   */
  @property({ reflect: true, type: String })
  state?: FTextAreaState = "default";

  /**
   * @attribute f-text-area can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * @attribute Defines the  no. of rows to display. By default f-text-area provides 3 rows. After 3 rows text area becomes scrollable.
   */
  @property({ reflect: true, type: String })
  rows?: string;

  /**
   * @attribute Defines the placeholder text for f-text-area.
   */
  @property({ reflect: true, type: String })
  placeholder?: string;

  /**
   * @attribute This shows the character count while typing and auto limits after reaching the max length.
   */
  @property({ reflect: true, type: String, attribute: "max-length" })
  maxLength?: string;

  /**
   * @attribute Provides a resize handle on the bottom right of text-area which enables a user to resize the text-area within the parents scope.
   */
  @property({ reflect: true, type: Boolean })
  resizable?: boolean = false;

  /**
   * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
   */
  @property({ reflect: true, type: Boolean })
  clear?: boolean = true;

  /**
   * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute Only Text could be read, can't be edited
   */
  @property({ reflect: true, type: Boolean, attribute: "read-only" })
  readOnly?: boolean = false;

  /**
   * emit event
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    const event = new CustomEvent<FTextAreaCustomEvent>("input", {
      detail: {
        value: (e.target as HTMLInputElement)?.value,
      },
      bubbles: true,
      composed: true,
    });
    this.value = (e.target as HTMLInputElement)?.value;
    this.dispatchEvent(event);
  }

  /**
   * clear value inside f-text-area on click of clear icon.
   */
  clearValue() {
    const event = new CustomEvent<FTextAreaCustomEvent>("input", {
      detail: {
        value: "",
      },
      bubbles: true,
      composed: true,
    });
    this.value = "";
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /**
   * apply styles
   */
  applyStyles(parent: HTMLElement | "") {
    if (parent && parent.style.height) {
      return `max-height: ${parent.style.height}`;
    } else {
      return `max-height: inherit`;
    }
  }

  /*
   * whwnever parent attribute changes for category and variant
   */
  connectedCallback() {
    super.connectedCallback();
    const parentNode = this.closest("f-form") as FForm;
    if (parentNode && !this.category) {
      const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          switch (mutation.type) {
            case "attributes":
              if (parentNode?.category) {
                this.category = this.closest("f-form")?.category;
              }
              break;
          }
        });
      });
      const observerOptions = {
        attributes: true,
      };
      observer.observe(parentNode, observerOptions);
      this.requestUpdate();
    } else {
      if (!this.category) this.category = "fill";
    }
  }

  render() {
    const parentDiv = this.parentElement?.tagName === "F-DIV" ? this.parentElement : "";
    /**
     * Final html to render
     */

    return html`
      <f-div padding="none" gap="x-small" direction="column" width="100%">
        <f-div padding="none" gap="none" align="bottom-left">
          <f-div padding="none" gap="x-small" direction="column" width="fill-container">
            <f-div
              padding="none"
              gap="small"
              direction="row"
              width="hug-content"
              height="hug-content"
            >
              <f-div padding="none" direction="row" width="hug-content" height="hug-content">
                <slot name="label"></slot>
              </f-div>
              <slot name="icon-tooltip"></slot>
            </f-div>
            <slot name="description"></slot>
          </f-div>
          <f-div padding="none" gap="none" width="hug-content">
            ${this.maxLength
              ? html` <f-text variant="para" size="small" weight="regular" state="secondary"
                  >${this.value?.length ?? 0} / ${this.maxLength}</f-text
                >`
              : null}
          </f-div>
        </f-div>
        <div class="f-text-area-wrapper">
          <textarea
            class="f-text-area"
            style=${this.applyStyles(parentDiv)}
            state=${this.state}
            size=${this.size}
            placeholder=${this.placeholder}
            category=${this.category}
            rows=${this.rows ?? "3"}
            maxlength=${this.maxLength}
            ?resizable=${this.resizable}
            ?readonly=${this.readOnly}
            @input=${this.handleInput}
            .value=${this.value}
          ></textarea>
          ${this.clear && this.value
            ? html` <f-icon
                class="f-text-area-clear-icon"
                source="i-close"
                clickable
                size="x-small"
                @click=${this.clearValue}
              ></f-icon>`
            : null}
        </div>
        <slot name="help"></slot>
      </f-div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-text-area": FTextArea;
  }
}
