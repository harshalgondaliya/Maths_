// si1.js

function calculateIntegration() {
    var xValues = document.getElementById('xValues').value.split(',').map(Number);
    var yValues = document.getElementById('yValues').value.split(',').map(Number);
    var lowerLimit = parseFloat(document.getElementById('lowerLimit').value);
    var upperLimit = parseFloat(document.getElementById('upperLimit').value);
    var n = parseInt(document.getElementById('n').value);

    if (xValues.length !== yValues.length) {
        alert("Number of x values must match number of y values");
        return;
    }

    if (n % 2 !== 0) {
        alert("Number of intervals must be even for Simpson's 1/3 rule");
        return;
    }

    var h = (upperLimit - lowerLimit) / n;
    var sum = yValues[0] + yValues[yValues.length - 1];

    for (var i = 1; i < n; i++) {
        if (i % 2 === 0) {
            sum += 2 * yValues[i];
        } else {
            sum += 4 * yValues[i];
        }
    }

    var result = (h / 3) * sum;
    document.getElementById('result').innerHTML = result.toFixed(4);
}
