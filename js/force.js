draw_force = async function () {
	const width = 800;
	const height = 600;

	d3.select("#force").attr("width", width).attr("height", height);

	d3.select("#force").selectAll("circle").remove();
	d3.select("#force").selectAll("line").remove();

	var node = d3.select("#force")
		.selectAll("circle")
		.data(nodes)
		.enter()
		.append("circle")
		.attr("stroke", "white")
		.attr("r", function (d) {
			return Math.log(d.cnt + 1);
		})
		.attr("fill", "blue")
		.on("mouseover", function (event, d) {
			d3.select(this).style("fill", "green");
			tooltip.text(d.node + ":" + d.cnt);
			return tooltip.style("visibility", "visible")
				.style("top", event.pageY + 10 + "px")
				.style("left", event.pageX + 10 + "px");
		})
		.on("mouseout", function (event, d) {
			d3.select(this).style("fill", "blue");
		});

	function ticked() {
		node
			.attr("cx", function (d) { return d.x; })
			.attr("cy", function (d) { return d.y; });
		link
			.attr("x1", function (d) { return d.source.x; })
			.attr("y1", function (d) { return d.source.y; })
			.attr("x2", function (d) { return d.target.x; })
			.attr("y2", function (d) { return d.target.y; });
	}

	var simulation = d3.forceSimulation()
		.force("charge", d3.forceManyBody().strength(-60))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.nodes(nodes)
		.on('tick', ticked);

	simulation.force("link", d3.forceLink(links).id(function (d) {
		return d.id; // as default, use node.index. Here, we want to use node.id instead.
	}))

	var link = d3.select("svg")
		.selectAll("line")
		.data(links)
		.enter()
		.append("line")
		.attr("stroke-width", 0.1)
		.attr("stroke", "grey");
}

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "1000")
	.style("background", "white")
	.style("visibility", "hidden")
	.text("a simple tooltip");