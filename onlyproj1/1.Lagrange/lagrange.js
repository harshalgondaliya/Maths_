function interpolate() {
    var x_values_str = document.getElementById("x_values").value;
    var y_values_str = document.getElementById("y_values").value;
    var interpolate_value = parseFloat(document.getElementById("interpolate").value);

    var x_values = x_values_str.split(",").map(parseFloat);
    var y_values = y_values_str.split(",").map(parseFloat);

    if (x_values.length !== y_values.length) {
        document.getElementById("result").innerText = "Number of x and y values must be equal";
        return;
    }

    var n = x_values.length;
    var result = 0;

    for (var i = 0; i < n; i++) {
        var term = y_values[i];
        for (var j = 0; j < n; j++) {
            if (j !== i) {
                term *= (interpolate_value - x_values[j]) / (x_values[i] - x_values[j]);
            }
        }
        result += term;
    }

    document.getElementById("result").innerText = "Lagrange Interpolated value at f(" + interpolate_value + ") is " + result.toFixed(2);
}