annotate_oxygen = function (target_id, num) {
	const type = d3.annotationCallout
	const elements = [
		"Iron",
		"Gold",
		"Hydrogen",
		"Chemical_element",
		"Steel",
		"Nitrogen",
		"Carbon_dioxide",
		"Water",
	]
	let annotations = [];

	elements.forEach(element => {
		annotations.push(
			{
				note: {
					label: "element",
					padding: 0,
					// title: "country"
				},
				data: { node: element, cnt: nodes.find(n => n.node == element).cnt },
				className: "show-bg",
				dy: -10,
				dx: 0,
			}
		)
	})

	const makeAnnotations = d3.annotation()
		.notePadding(15)
		.type(type)
		.accessors({
			x: d => xs(d.node) + xs.bandwidth() / 2,
			y: d => ys(d.cnt)
		})
		.annotations(annotations)

	svg.append("g").attr("transform", "translate(50,50)")
		.attr("class", "annotation-group")
		.style("font-size", "12px")
		.call(makeAnnotations)
}	