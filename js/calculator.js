$(document).ready(function() {
	$('#load_data').click(function() {
		$.ajax({
			url: 'db.csv',
			dataType: 'text',
			success: function(data) {
				/**
				 * Here I create my variables that require me to either
				 * get things from the HTMl page or getting a file
				 * or for creating a table.
				 */
				let H = parseInt(document.querySelector('#H').value);
				let W = parseInt(document.querySelector('#W').value);
				let L = parseInt(document.querySelector('#L').value);

				let database = data.split(/\r?\n|\r/);

				let final_results = '<p class="subtitle">';

				// Check to make sure digits are positive
				if (H <= 0 || W <= 0 || L <= 0) final_results = '<p class="subtitle" style="color: red;">Please enter positive numbers for Height, Width, and Length.</p>';
				else if (H === undefined || W === undefined || L === undefined) final_results = '<p class="subtitle" style="color: red;">Please enter positive numbers for Height, Width, and Length.</p>';
				else if (H === null || W === null || L === null) final_results = '<p class="subtitle" style="color: red;">Please class="subtitle" style="color: red;">Please enter positive numbers for Height, Width, and Length.</p>';

				// Create local variables A, B, x, y.
				else {
					let A, B, x, y;

					if (document.querySelector('select[name="unit"]').value === 'meters') {
						H = Math.round(parseInt(document.querySelector('#H').value) * 3.2808);
						W = Math.round(parseInt(document.querySelector('#W').value) * 3.2808);
						L = Math.round(parseInt(document.querySelector('#L').value) * 3.2808);
					}
					else {
						H = parseInt(document.querySelector('#H').value);
						W = parseInt(document.querySelector('#W').value);
						L = parseInt(document.querySelector('#L').value);
					}

					// Perform the calculations for A and B.
					A = 2 * (H + 2) + W + 5;
					B = 2 * (H + 2) + L + 5;
					console.log('A = ' + A);
					console.log('B = ' + B);

					// Create coordinates for X and Y.
					x = A;
					y = B;

					/**
					 * Since the Width and the Length of the data are the same
					 * I created a 2D array so that I can easily plot the data
					 * like points on a Cartesian coordinate graph.
					 */
					let csv_data = new Array(database.length);

					for (let i = 0; i < database.length; i++) {
						csv_data[i] = new Array(database.length);
					}

					/**
					 * Now store the data in the CSV file in a two-dimensional array.
					 * Using the coordinates, I can retrieve the data.
					 */
					for (let length = 0; length < database.length; length++) {
						let cell_data = database[length].split(',');

						for (let width = 0; width < cell_data.length; width++) {
							csv_data[length][width] = cell_data[width];
						}
					}

					/**
					 * Here I do another check to make sure the X and Y variables
					 * are not greater than 181 (the maximum Length and Width of
					 * the values in the csv file. Next I store the proper results
					 * in the 'final_results' variable.
					 */
					if (x > 180 && y > 180) {
						final_results += 'Please consult table in the <a href="typ_configs.html">Typical Configurations</a>' + ' section.\nCustom configuration may be necessary.';
						final_results += '</p>';
					} else if (x <= 15 && y <= 15) final_results += 'Screen systems required: <b style="color: blue;">1 Rhombus</b>.</p>';
					// else if (x <= 29 && y <= 29) final_results += 'Screen systems required: <b style="color: blue;">1 Octagon</b>.</p>';
					else {
						final_results += 'Screen systems required: <b style="color: blue;">';
						final_results += csv_data[x][y];
						final_results += '.</b></p>';
					}
				}

				// Display the results to the user.
				$('#results').html(final_results);
			},
		});
	});
});
