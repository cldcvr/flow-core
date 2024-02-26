import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSwitchField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
import { getAriaLabel } from "../../../modules/utils";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderSwitchField;
	const fieldHtml = html`
		<f-switch
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${getAriaLabel(field) ?? name}"
			name=${name}
			${ref(fieldRef)}
			.value="${value}"
			data-qa-element-id=${field.qaId || field.id}
			state=${ifDefined(field.state)}
			?disabled=${field.disabled ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-switch>
	`;

	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
