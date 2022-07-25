annotate_bird = function (target_id, num) {
	const type = d3.annotationCallout
	const animals = [
		"Animal",
		"Chordate",
		"Mammal",
		"Reptile",
		"Insect",
		"Dinosaur",
		"Eye",
	]
	let annotations = [];

	animals.forEach(animal => {
		annotations.push(
			{
				note: {
					label: "animal",
					padding: 0,
					// title: "country"
				},
				data: { node: animal, cnt: nodes.find(n => n.node == animal).cnt },
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