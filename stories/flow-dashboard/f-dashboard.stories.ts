import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FDashboardConfig, FDashboardWidget } from "@ollion/flow-dashboard";

export default {
	title: "@ollion/flow-dashboard/f-dashboard",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<any>;

const widgets: FDashboardWidget[] = [];
for (let index = 0; index < 20; index++) {
	widgets.push({
		type: "big-number",
		data: Math.random() * 100,
		dataType: "count",
		pollingConfig: {
			frequency: 3000
		},
		id: (Math.random() + 1).toString(36).substring(7),
		placement: {
			w: parseInt(String(Math.ceil(Math.random() * 6))),
			h: parseInt(String(Math.ceil(Math.random() * 4)))
		}
	});
}

const Template = () => {
	const dashboardConfig: FDashboardConfig = {
		widgets
	};
	return html` <f-dashboard .config=${dashboardConfig}> </f-dashboard> `;
};

export const basic = Template.bind({});
