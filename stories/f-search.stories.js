import { html } from "lit-html";
import fInputAnatomy from "./svg/i-finput-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default {
	title: "Components/f-search",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleInput = e => {
			console.log(e.detail);

			updateArgs({
				value: e.detail.value,
				["selected-scope"]: e.detail.scope
			});
		};

		const handleSearch = event => {
			console.log(event.detail);
		};

		return html`
			<f-div padding="large">
				<f-search
					value=${args.value}
					selected-scope=${args["selected-scope"]}
					.variant=${args.variant}
					.category=${args.category}
					.placeholder=${args.placeholder}
					.result=${args.result}
					.scope=${args.scope}
					@input=${handleInput}
					state=${args.state}
					?disabled=${args.disabled}
					?clear=${args.clear}
					?search-button=${args["search-button"]}
					.size=${args.size}
					.resultMaxHeight=${args["result-max-height"]}
					@search=${handleSearch}
				>
					${unsafeHTML(args.slot)}
				</f-search>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		["selected-scope"]: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		slot: {
			control: "text"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		disabled: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		["search-button"]: {
			control: "boolean"
		},

		["result-max-height"]: {
			control: "text"
		}
	},

	args: {
		value: "",
		["selected-scope"]: "",
		placeholder: undefined,
		variant: "curved",
		category: "fill",
		state: "default",
		size: "medium",

		slot: `<f-div slot="label" padding="none" gap="none">Label</f-div>
              <f-div width="100%" slot="help"><f-text  variant="para" size="small">This is a Subtext</f-text></f-div>
        <f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
      <f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>`,

		disabled: false,
		clear: false,
		["search-button"]: false,

		result: {
			Category1: ["option 1", "option2"],
			Category2: ["option3", "option 4"],
			Category3: ["option5", "option6"]
		},

		scope: [
			"Scope 2",
			"Scope 3",
			"Scope 4",
			"Scope 5",
			"Scope 6",
			"Scope 7",
			"Scope 8",
			"Scope 9",
			"Scope 10",
			"Scope 11",
			"Scope 12",
			"Scope 13",
			"Scope 14",
			"Scope 15",
			"Scope 16",
			"Scope 17",
			"Scope 18"
		]
	}
};

export const Variant = {
	render: args => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Search"
            @input=${handleValue}
            .variant=${item}
            size="medium"
      .result=${[
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis porta dignissim. Etiam a aliquam elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam hendrerit quis lorem cursus consectetur. Donec sem ipsum, scelerisque at nulla vel, rutrum efficitur tortor. Praesent eu tincidunt mauris. Nam eu aliquam turpis. Curabitur placerat maximus tempor. Donec non ante in nunc eleifend elementum eu quis lorem",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18",
				"<f-text state='success'>Using markup</f-text>"
			]}
          >
             <f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: args => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Search"
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
      .result=${[
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18",
				"<f-text state='success'>Using markup</f-text>"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (category="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: args => {
		const [value, setValue] = useState("Suggestion 2");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Search"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						@input=${handleValue}
						placeholder="Search Here"
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-search
            value=${value}
            @input=${handleValue}
            size=${item}
      .result=${[
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: args => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div
										><f-search
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
											.result=${[
												"Suggestion 2",
												"Suggestion 3",
												"Suggestion 4",
												"Suggestion 5",
												"Suggestion 6",
												"Suggestion 7",
												"Suggestion 8",
												"Suggestion 9",
												"Suggestion 10",
												"Suggestion 11",
												"Suggestion 12",
												"Suggestion 13",
												"Suggestion 14",
												"Suggestion 15",
												"Suggestion 16",
												"Suggestion 17",
												"Suggestion 18"
											]}
										>
											<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-search></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Result = {
	render: args => {
		const [value, setValue] = useState("jane");

		const handleValue = e => {
			console.log("in input", e);
			setValue(e.detail.value);
		};

		const handleSelected = e => {
			console.log("in selected", e);
		};

		const template = [
			{
				value: {
					firstname: "henry",
					lastname: "jane"
				},

				template: function (value) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}
							>${this.value.firstname} ${this.value.lastname}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return this.value.firstname + " " + this.value.lastname;
				}
			},
			{
				value: {
					firstname: "tony",
					lastname: "stark"
				},

				template: function (value) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}
							>${this.value.firstname} ${this.value.lastname}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return this.value.firstname + " " + this.value.lastname;
				}
			}
		];

		const resultWhen = (result, value) => {
			console.log("in result when");

			if (value === "*" || value === "$") {
				return true;
			} else if (typeof result === "object") {
				return result
					.toString()
					.toLocaleLowerCase()
					.includes(value?.toLocaleLowerCase() ?? "");
			}

			return result.toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.resultMaxHeight=${"150px"}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for array search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
						<f-div slot="no-data" padding="medium">
							<f-text variant="para" size="small">This is no-data slot.</f-text>
						</f-div>
					</f-search></f-div
				>
				<f-div align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${{
							Category1: ["option 1", "option2"],
							Category2: ["option3", "option 4"],
							Category3: ["option5", "option6"]
						}}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for categorized search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				>
				<f-div align="middle-center">
					<f-search
						value=${value}
						.resultWhen=${resultWhen}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${template}
						@selected=${handleSelected}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for custom template search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				>
			</f-div>
		`;
	},

	name: "result"
};

export const Scope = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-search
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.result=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
						.scope=${["scope 1", "scope 2", "scope 3"]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for scope</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-search></f-div
				></f-div
			>
		`;
	},

	name: "scope"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0, 1, 2, 3].map(
					item => html`<f-div>
          <f-search
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size="medium"
            ?search-button=${item === 0 ? true : false}
            ?disabled=${item === 1 ? true : false}
            ?clear=${item === 2 ? true : false}
      ?loading=${item === 3 ? true : false}
          >
            <f-div slot="label" padding="none" gap="none">${
							item === 0 ? "search-button" : item === 1 ? "Disabled" : "Clear Icon on Type"
						}</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-search></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};