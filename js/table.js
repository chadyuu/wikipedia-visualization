draw = function (data, num) {
	data = data.slice(0, num)
	let rows = d3.select("#table-all")
		.selectAll("tr")
		.data(data)
		.enter()
		.append("tr")
	
	let cells = rows.selectAll("td")
		.data(function (row) {
			return ['node', 'cnt'].map(function (column) {
				return { column: column, value: row[column] };
			});
		})
		.enter()
		.append('td')
		.text(function (d) { return d.value; })
}	

data = d3.csv("./data/cnt.csv")
	.then(function (data) {
		draw(data, selected_num.value);
		
		var slider = d3.select('input');
		slider.on('change', function () {
			d3.selectAll("tbody > tr").remove()
			draw(data, this.value);
		});
	});