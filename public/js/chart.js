var data = {
	labels: ["Red", "Green", "Yellow"],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
		hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
	}]
};

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: data,
		options: {
			cutoutPercentage: 50
		}
});

