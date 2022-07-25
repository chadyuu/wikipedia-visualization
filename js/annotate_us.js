annotate_us = function (target_id, num) {
	const type = d3.annotationCallout
	const countries = [
		"France",
		"Germany",
		"India",
		"Japan",
		"Canada",
		"Australia",
		"Italy",
		"Spain",
		"Russia",
		"China",
		"Africa",
		"North_America",
		"Egypt",
		"Netherlands",
		"Soviet_Union",
	]
	let annotations = [];

	countries.forEach(country => {
		annotations.push(
			{
				note: {
					label: "country",
					padding: 0,
					// title: "country"
				},
				data: { node: country, cnt: nodes.find(n => n.node == country).cnt },
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