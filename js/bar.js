const width = 800;
const height = 500;
const col = "#a0b1bd";
const svg = d3.select("#bar").attr("width", width).attr("height", height);

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "1000")
	.style("background", "white")
	.style("font-weight", "bold")
	.style("visibility", "hidden")

draw_bar = function (target_id, num) {
	data = nodes.filter(n => n.id != (target_id))
	data = data.slice(0, num)
	xs = d3.scaleBand().domain(data.map(x => x.node)).range([0, width]);
	ys = d3.scaleLinear().domain([0, data[1].cnt + 300]).range([height, 0]);

	svg.append("g")
		.attr("transform", "translate(50,50)")
		.selectAll("rect")
		.data(data).enter()
		.append("rect")
		.attr("x", function (d, i) { return xs(d.node); })
		.attr("y", function (d, i) { return ys(d.cnt); })
		.attr("height", function (d, i) { return height - ys(d.cnt); })
		.attr("width", width / data.length)
		.attr("fill", col)
		.attr("stroke", "white")
		.attr("stroke-width", 1)
		.on("mouseover", function (event, d) {
			d3.select(this).style("fill", "green");
			tooltip.text(d.node + ":" + d.cnt);
			tooltip.style("visibility", "visible")
				.style("top", event.pageY - 50 + "px")
				.style("left", event.pageX - 20 + "px");
		})
		.on("mouseout", function (event, d) {
			d3.select(this).style("fill", col);
		});
	
	svg.append("g")
		.attr("transform", "translate(50," + (height + 50) + ")")
		.call(d3.axisBottom(xs))
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function (d) {
			return "rotate(-65)"
		});
	
	svg.append("g")
		.attr("transform", "translate(50,50)")
		.call(d3.axisLeft(ys));
}	