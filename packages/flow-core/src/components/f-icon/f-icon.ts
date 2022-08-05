import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-icon.scss";
import { FElement } from "../../mixins/components/f-element/f-element";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { ConfigUtil } from "./../../modules/config";
import loader from "../../mixins/svg/loader";
import { isValidHttpUrl } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

@customElement("f-icon")
export class FIcon extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  private _source!: string;

  /**
   * @internal
   * @property set it to true if source value is url
   */
  private isURLSource = false;

  /**
   * @attribute The small size is the default.
   */
  @property({ reflect: true, type: String })
  size?: "x-large" | "large" | "medium" | "small" | "x-small" = "small";

  /**
   * @attribute The state of an Icon helps in indicating the degree of emphasis. The Icon component inherits the state from the parent component. By default it is subtle.
   */
  @property({ reflect: true, type: String })
  state?:
    | "default"
    | "secondary"
    | "subtle"
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "neutral" = "default";

  /**
   * @attribute Source property defines what will be displayed on the icon. For icon variant It can take the icon name from a library , any inline SVG or any URL for the image. For emoji, it takes emoji as inline text.
   */
  @property({
    type: String,
    reflect: true,
  })
  get source(): string {
    return this._source;
  }
  set source(value) {
    const emojiRegex = /\p{Emoji}/u;
    if (isValidHttpUrl(value)) {
      this.isURLSource = true;
      this._source = `<img src="${value}"/>`;
    } else if (emojiRegex.test(value)) {
      this._source = value;
    } else {
      const IconPack = ConfigUtil.getConfig().iconPack;
      if (IconPack) {
        this._source = IconPack[value];
      } else {
        throw new Error(
          `Icon pack not configured! \n please install \`yarn add @cldcvr/flow-icon\` \n Set config as below \n 	
		\`import IconPack from "@cldcvr/flow-icon" \n;
		import { ConfigUtil } from "@cldcvr/flow-core" \n;
	   ConfigUtil.setConfig({ iconPack: IconPack });\``
        );
      }
    }
    this.requestUpdate();
  }

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the f-icon.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute display loader
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute is clickable
   */
  @property({ reflect: true, type: Boolean })
  clickable?: boolean = false;

  readonly required = ["source"];

  /**
   * validation for all atrributes
   */
  validateProperties() {
    if (!this.source) {
      throw new Error("f-icon : source is mandatory field");
    }
  }

  render() {
    this.validateProperties();
    return html`${this.loading
      ? html`${unsafeSVG(loader)}`
      : html`${this.isURLSource
          ? unsafeHTML(this.source)
          : unsafeSVG(this.source)}`}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-icon": FIcon;
  }
}
