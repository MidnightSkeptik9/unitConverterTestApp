// Event listener to make sure the page is loaded before running
document.addEventListener('DOMContentLoaded', () => {
	// Define the Elements
	const userEntry = document.getElementById('user-entry');

	const convertButton = document.getElementById('convert-button');

	const categorySelector = document.getElementById('category-selector');
	const fromSelector = document.getElementById('from-selector');
	const toSelector = document.getElementById('to-selector');

	const resultLabel = document.getElementById('result-label');

	// define empty save-for-later variables
	var userEntryValue;
	var result;

	var fromUnit;
	var toUnit;

	// event listener to update userEntryValue on userEntry value changed
	userEntry.addEventListener('input', (event) => {
		userEntryValue = parseFloat(event.target.value);
	}); // end of event listener for userEntryValue

	fromSelector.addEventListener('change', (event) => {
		fromUnit = event.target.value.toString();
	});

	toSelector.addEventListener('change', (event) => {
		toUnit = event.target.value.toString();
	});

	function convertUnits(value, fromUnit, toUnit, data) {
		if (!data || !data.length) {
		  	console.error('Invalid data');
		  	return NaN;
		}
		var conversionFactor = data["length"][fromUnit][toUnit];
		return value * conversionFactor;
	}

	convertButton.addEventListener('click', () => {
		// load the JSON data
		fetch('./units.json')
			.then(response => response.json())
			.then(data => {
				// Define unit types/categories
				var unitTypes = ['inches', 'feet', 'yards', 'miles', 'knots', 'micrometers', 'nanometers', 'nautical-miles', 'centimeters', 'meters', 'millimeters', 'kilometers'];

				// check if the unit types are valid
				if (unitTypes.includes(fromUnit) && unitTypes.includes(toUnit)) {
					// Convert the value between units
					result = convertUnits(userEntryValue, fromUnit, toUnit, data);
					resultLabel.innerHTML = `Converted Value: ${result} ${toUnit}`;
				} else {
					console.error("Invalid unit types: fromUnit: " + fromUnit + ", toUnit: " + toUnit);
				}
			})
			.catch(error => console.error('error while loading units.json', error));
	});
});