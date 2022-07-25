read_csv = async function (target_id) {
	// Links must have a valid node id as a source and a target
	links = await d3.csv("data/edge.csv")
	links = d3.filter(links, x => x.target == target_id)
	links.forEach(function (d) {
		d['source'] = +d['source'];
		d['target'] = +d['target'];
	});

	// Nodes must have unique ids
	nodes = await d3.csv("data/cnt.csv")
	d3.select("#graph-name").text("Link Graph for " + nodes.find(x => x.id == target_id).node)
	nodes.forEach(function (d) {
		d['id'] = +d['id'];
		d['cnt'] = +d['cnt'];
	});

	// Extract only related nodes
	nodes = d3.filter(nodes, node => links.map(link => link.source).includes(node.id) || node.id == target_id)
}
