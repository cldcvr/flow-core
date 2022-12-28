import { html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import eleStyle from "./f-icon-button.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { FIcon } from "../f-icon/f-icon";
import { FCounter } from "../f-counter/f-counter";
import { validateHTMLColorName } from "validate-color";
import { validateHTMLColor } from "validate-color";
import getTextContrast from "../../utils/get-text-contrast";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import LightenDarkenColor from "../../utils/get-lighten-darken-color";

const variants = ["round", "curved", "block"] as const;
const types = ["fill", "outline", "transparent", "packed"] as const;
const sizes = ["large", "medium", "small", "x-small"] as const;

export type FIconButtonVariant = typeof variants[number];
export type FIconButtonType = typeof types[number];
export type FIconButtonSize = typeof sizes[number];
export type FIconButtonState =
  | "primary"
  | "danger"
  | "warning"
  | "success"
  | "neutral"
  | "inherit"
  | `custom, ${string}`;

@customElement("f-icon-button")
export class FIconButton extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute local state for managing custom fill.
   */
  @state()
  fill = "";

  /**
   * @attribute local state for managing input class.
   */
  @state()
  iconInputClass = false;

  /**
   * @attribute Icon property defines what icon will be displayed on the icon. It can take the icon name from a library , any inline SVG or any URL for the image.
   */
  @property({ type: String })
  icon!: string;

  /**
   * @attribute Variants are various representations of an icon button. For example an icon button can be round, curved or block.
   */
  @property({ type: String })
  variant?: FIconButtonVariant = "round";
  /**
   * @attribute Type of f-icon-button
   */
  @property({ type: String })
  type?: FIconButtonType = "fill";

  /**
   * @attribute Size of f-icon-button
   */
  @property({ type: String })
  size?: FIconButtonSize = "medium";

  /**
   * @attribute Size of f-icon-button
   */
  @property({ type: String })
  state?: FIconButtonState = "primary";

  /**
   * @attribute Counter property enables a counter on the button.
   */
  @property({ reflect: true, type: Number })
  counter?: string;

  /**
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the button.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * icon element reference
   */
  @query("f-icon")
  iconElement!: FIcon;

  /**
   * icon element reference
   */
  @query("f-counter")
  counterElement?: FCounter;

  /**
   * compute counter size based on button size
   */
  get counterSize() {
    if (this.size === "small") {
      return this.type === "packed" ? "small" : "medium";
    }
    if (this.size === "x-small") {
      return "small";
    }
    if (this.size === "large" && this.type === "packed") {
      return "medium";
    }
    if (this.size === "medium" && this.type === "packed") {
      return "small";
    }
    return this.size;
  }

  /**
   * apply inline styles to shadow-dom for custom fill.
   */
  applyStyles() {
    if (this.fill) {
      if (this.loading) {
        if (this.type === "fill") {
          if (this.variant !== "block") {
            return `background-color: ${LightenDarkenColor(
              this.fill,
              -150
            )}; border: 1px solid ${LightenDarkenColor(
              this.fill,
              -150
            )}; color: transparent; fill: ${this.fill}`;
          } else {
            return `background: transparent; border: none; fill: ${this.fill};`;
          }
        } else if (this.type === "outline") {
          return `background: transparent; border: 1px solid ${this.fill}; fill: ${this.fill};`;
        } else {
          return `background: transparent; border: none; fill: ${this.fill};`;
        }
      } else {
        if (this.type === "fill") {
          if (this.variant !== "block") {
            return `background: ${this.fill}; border: 1px solid ${this.fill};`;
          } else {
            return "background: transparent; border: none;";
          }
        } else if (this.type === "outline") {
          return `background: transparent; border: 1px solid ${this.fill};`;
        } else {
          return "background: transparent; border: none;";
        }
      }
    } else return "";
  }

  /**
   * validation for all atrributes
   */
  validateProperties() {
    if (
      this.state?.includes("custom") &&
      this.fill &&
      !validateHTMLColor(this.fill) &&
      !validateHTMLColorName(this.fill)
    ) {
      throw new Error("f-icon-button : enter correct color-name or hex-color-code");
    }
  }

  render() {
    /**
     * creating local fill variable out of state prop.
     */
    this.fill = getCustomFillColor(this.state ?? "");

    /**
     * validate
     */
    this.validateProperties();

    const hasShimmer = (getComputedStyle(this, "::before") as any)["animation-name"] === "shimmer";
    const iconClasses = {
      "fill-button-surface":
        this.type === "fill" && this.variant !== "block" && !this.fill ? true : false,
      "fill-button-surface-light":
        this.fill &&
        this.type === "fill" &&
        this.variant !== "block" &&
        getTextContrast(this.fill) === "light-text"
          ? true
          : false,
      "fill-button-surface-dark":
        this.fill &&
        this.type === "fill" &&
        this.variant !== "block" &&
        getTextContrast(this.fill) === "dark-text"
          ? true
          : false,
    };
    if (hasShimmer) {
      this.classList.add("hasShimmer");
    }
    /**
     * create counter if available
     */
    const counterClasses = {
      "absolute-counter": true,
      "outline-counter": this.type === "fill" ? true : false,
      [`packed-${this.size}`]: this.type === "packed" ? true : false,
      [`size-${this.size}`]: true,
      "fill-outline-counter": this.type === "fill" && this.fill ? true : false,
    };
    const counter =
      this.counter && !(this.type === "packed" && this.size === "x-small")
        ? html`<f-counter
            .state=${this.state}
            .size=${this.counterSize}
            .label=${this.counter}
            class=${classMap(counterClasses)}
          ></f-counter>`
        : "";

    // classes to apply on inner element
    const classes: Record<string, boolean> = {
      "f-icon-button": true,
      hasShimmer,
      "custom-loader": this.fill ? true : false,
      "custom-hover": this.fill && this.type === "fill" && this.variant !== "block" ? true : false,
    };
    // merging host classes
    this.classList.forEach((cl) => {
      classes[cl] = true;
      console.log(cl, classes[cl]);
      if (cl === "f-input-duplicate") {
        this.iconInputClass = true;
      }
    });

    return html`<button
      class=${classMap(classes)}
      style=${this.applyStyles()}
      variant=${this.variant}
      type=${this.type}
      size=${this.size}
      state=${this.state}
      ?counter=${this.counter}
      ?disabled=${this.disabled}
      ?loading=${this.loading}
    >
      ${this.loading ? unsafeSVG(loader) : ""}
      <f-icon
        .source=${this.icon}
        .state=${this.state}
        .size=${this.size}
        class=${classMap({
          ...iconClasses,
          "fill-button-surface-input": this.iconInputClass ? true : false,
        })}
      ></f-icon>
      ${counter}
    </button>`;
  }

  updated() {
    /**
     * Force update child element
     */
    this.iconElement.requestUpdate();
    this.counterElement?.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-icon-button": FIconButton;
  }
}
