function calculateInterpolation() {
    var xValuesInput = document.getElementById("xValues").value;
    var yValuesInput = document.getElementById("yValues").value;
    var xInput = parseFloat(document.getElementById("x").value);

    // Convert comma-separated string values to arrays
    var xValues = xValuesInput.split(",").map(Number);
    var yValues = yValuesInput.split(",").map(Number);

    if (xValues.length !== yValues.length) {
        alert("Number of x values must be equal to the number of y values.");
        return;
    }

    var interpolatedValue = newtonInterpolation(xInput, xValues, yValues);
    document.getElementById("result").innerText = "Divided difference value at f(" + xInput + ") : " + interpolatedValue.toFixed(4);
}

function newtonInterpolation(x, xValues, yValues) {
    var n = xValues.length;
    var result = yValues[0];
    var coefficients = new Array(n);

    // Calculate the divided differences
    for (var i = 0; i < n; i++) {
        coefficients[i] = yValues[i];
    }
    for (var j = 1; j < n; j++) {
        for (var i = n - 1; i >= j; i--) {
            coefficients[i] = (coefficients[i] - coefficients[i - 1]) / (xValues[i] - xValues[i - j]);
        }
        result += coefficients[j] * productTerm(x, xValues, j);
    }
    return result;
}

function productTerm(x, xValues, j) {
    var product = 1;
    for (var k = 0; k < j; k++) {
        product *= (x - xValues[k]);
    }
    return product;
}