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

    var h = (upperLimit - lowerLimit) / n;
    var sum = 0;

    for (var i = 1; i < n; i++) {
        var x = lowerLimit + i * h;
        var y = interpolate(x, xValues, yValues);
        sum += y;
    }

    var result = (h / 2) * (interpolate(lowerLimit, xValues, yValues) + 2 * sum + interpolate(upperLimit, xValues, yValues));
    document.getElementById('result').innerHTML = result.toFixed(4);
}

function interpolate(x, xValues, yValues) {
    var n = xValues.length;

    if (x <= xValues[0]) return yValues[0];
    if (x >= xValues[n - 1]) return yValues[n - 1];

    for (var i = 1; i < n; i++) {
        if (x < xValues[i]) {
            var t = (x - xValues[i - 1]) / (xValues[i] - xValues[i - 1]);
            return yValues[i - 1] + t * (yValues[i] - yValues[i - 1]);
        }
    }
}
