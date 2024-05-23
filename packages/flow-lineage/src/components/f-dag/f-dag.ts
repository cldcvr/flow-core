/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import * as d3dag from "d3-dag";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent

@flowElement("f-dag")
export class FDag extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	createRenderRoot() {
		return this;
	}

	svgElement: Ref<SVGSVGElement> = createRef();

	render() {
		return html` <svg ${ref(this.svgElement)}>
			<g transform="translate(2, 2)">
				<defs id="defs" />
				<g id="links" />
				<g id="nodes" />
				<g id="arrows" />
			</g>
		</svg>`;
	}
	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		// ----- //
		// Setup //
		// ----- //

		/**
		 * get transform for arrow rendering
		 *
		 * This transform takes anything with points (a graph link) and returns a
		 * transform that puts an arrow on the last point, aligned based off of the
		 * second to last.
		 */
		function arrowTransform({
			points
		}: {
			points: readonly (readonly [number, number])[];
		}): string {
			const [[x1, y1], [x2, y2]] = points.slice(-2);
			const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 90;
			return `translate(${x2}, ${y2}) rotate(${angle})`;
		}

		// our raw data to render
		const data = [
			{
				id: "0",
				parentIds: ["8"]
			},
			{
				id: "1",
				parentIds: []
			},
			{
				id: "2",
				parentIds: []
			},
			{
				id: "3",
				parentIds: ["11"]
			},
			{
				id: "4",
				parentIds: ["12"]
			},
			{
				id: "5",
				parentIds: ["18"]
			},
			{
				id: "6",
				parentIds: ["9", "15", "17"]
			},
			{
				id: "7",
				parentIds: ["3", "17", "20", "21"]
			},
			{
				id: "8",
				parentIds: []
			},
			{
				id: "9",
				parentIds: ["4"]
			},
			{
				id: "10",
				parentIds: ["16", "21"]
			},
			{
				id: "11",
				parentIds: ["2"]
			},
			{
				id: "12",
				parentIds: ["21"]
			},
			{
				id: "13",
				parentIds: ["4", "12"]
			},
			{
				id: "14",
				parentIds: ["1", "8"]
			},
			{
				id: "15",
				parentIds: []
			},
			{
				id: "16",
				parentIds: ["0"]
			},
			{
				id: "17",
				parentIds: ["19"]
			},
			{
				id: "18",
				parentIds: ["9"]
			},
			{
				id: "19",
				parentIds: []
			},
			{
				id: "20",
				parentIds: ["13"]
			},
			{
				id: "21",
				parentIds: []
			}
		];

		// create our builder and turn the raw data into a graph
		const builder = d3dag.graphStratify();
		const graph = builder(data);
		// -------------- //
		// Compute Layout //
		// -------------- //

		// set the layout functions
		const nodeRadius = 40;
		const nodeSize = [nodeRadius * 2, nodeRadius * 2] as const;
		// this truncates the edges so we can render arrows nicely
		const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);
		// use this to render our edges
		const line = d3.line().curve(d3.curveMonotoneY);
		// here's the layout operator, uncomment some of the settings
		const layout = d3dag
			.sugiyama()
			//.grid()
			//.zherebko()
			//@ts-ignore
			.nodeSize(nodeSize)
			.gap([nodeRadius, nodeRadius])
			.tweaks([shape]);

		// actually perform the layout and get the final size
		const { width, height } = layout(graph);

		// --------- //
		// Rendering //
		// --------- //

		// colors
		// const steps = graph.nnodes() - 1;
		// const interp = d3.interpolateRainbow;
		// const colorMap = new Map(
		// 	[...graph.nodes()]
		// 		.sort((a, b) => a.y - b.y)
		// 		.map((node, i) => [node.data.id, interp(i / steps)])
		// );

		// global
		const svg = d3
			.select(this.svgElement.value as SVGSVGElement)
			// pad a little for link thickness
			.style("width", Math.max(width, this.offsetWidth))
			.style("height", Math.max(height, this.offsetHeight));

		// nodes
		svg
			.select("#nodes")
			.selectAll("g")
			.data(graph.nodes())
			.join(enter =>
				enter
					.append("g")
					.attr("transform", ({ x, y }) => `translate(${x - nodeRadius}, ${y - nodeRadius})`)
					.append("foreignObject")
					.attr("width", nodeRadius * 2)
					.attr("height", nodeRadius * 2)
					.html(d => {
						return `<f-div width="100%" variant="round" align="middle-center" height="100%" state="secondary">${d.data.id}</f-div>`;
					})
			);

		// // link gradients
		// svg
		// 	.select("#defs")
		// 	.selectAll("linearGradient")
		// 	.data(graph.links())
		// 	.join(enter =>
		// 		enter
		// 			.append("linearGradient")
		// 			.attr("id", ({ source, target }) =>
		// 				encodeURIComponent(`${source.data.id}--${target.data.id}`)
		// 			)
		// 			.attr("gradientUnits", "userSpaceOnUse")
		// 			.attr("x1", ({ points }) => points[0][0])
		// 			.attr("x2", ({ points }) => points[points.length - 1][0])
		// 			.attr("y1", ({ points }) => points[0][1])
		// 			.attr("y2", ({ points }) => points[points.length - 1][1])
		// 			.call(enter => {
		// 				enter
		// 					.append("stop")
		// 					.attr("class", "grad-start")
		// 					.attr("offset", "0%")
		// 					.attr("stop-color", ({ source }) => colorMap.get(source.data.id)!);
		// 				enter
		// 					.append("stop")
		// 					.attr("class", "grad-stop")
		// 					.attr("offset", "100%")
		// 					.attr("stop-color", ({ target }) => colorMap.get(target.data.id)!);
		// 			})
		// 	);

		// link paths
		svg
			.select("#links")
			.selectAll("path")
			.data(graph.links())
			.join(
				enter =>
					enter
						.append("path")
						.attr("d", ({ points }) => line(points))
						.attr("fill", "none")
						.attr("stroke-width", 1.5)
						.attr("stroke", "var(--color-border-default)")
				// .attr("stroke", ({ source, target }) => `url(#${source.data.id}--${target.data.id})`)
			);

		// Arrows
		const arrowSize = 80;
		// const arrowLen = Math.sqrt((4 * arrowSize) / Math.sqrt(3));
		const arrow = d3.symbol().type(d3.symbolTriangle).size(arrowSize);
		svg
			.select("#arrows")
			.selectAll("path")
			.data(graph.links())
			.join(
				enter =>
					enter
						.append("path")
						.attr("d", arrow)
						.attr("fill", "var(--color-border-default)")
						// .attr("fill", ({ target }) => colorMap.get(target.data.id)!)
						.attr("transform", arrowTransform)
				// .attr("stroke", "white")
				// .attr("stroke-width", 1)
				// .attr("stroke-dasharray", `${arrowLen},${arrowLen}`)
			);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-dag": FDag;
	}
}