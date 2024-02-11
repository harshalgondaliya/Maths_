function solveEquations() {
    // Getting coefficients from input fields
    var a11 = parseFloat(document.getElementById('a11').value);
    var a12 = parseFloat(document.getElementById('a12').value);
    var a13 = parseFloat(document.getElementById('a13').value);
    var b1 = parseFloat(document.getElementById('b1').value);

    var a21 = parseFloat(document.getElementById('a21').value);
    var a22 = parseFloat(document.getElementById('a22').value);
    var a23 = parseFloat(document.getElementById('a23').value);
    var b2 = parseFloat(document.getElementById('b2').value);

    var a31 = parseFloat(document.getElementById('a31').value);
    var a32 = parseFloat(document.getElementById('a32').value);
    var a33 = parseFloat(document.getElementById('a33').value);
    var b3 = parseFloat(document.getElementById('b3').value);

    // Applying Gauss Elimination
    // Step 1: Make the first element of each row 1
    var factor = a21 / a11;
    a21 -= factor * a11;
    a22 -= factor * a12;
    a23 -= factor * a13;
    b2 -= factor * b1;

    factor = a31 / a11;
    a31 -= factor * a11;
    a32 -= factor * a12;
    a33 -= factor * a13;
    b3 -= factor * b1;

    // Step 2: Make the second element of the second row 0
    factor = a32 / a22;
    a32 -= factor * a22;
    a33 -= factor * a23;
    b3 -= factor * b2;

    // Step 3: Make the third element of the third row 1
    factor = a33 / a33;
    a33 /= factor;
    b3 /= factor;

    // Calculating x, y, and z from the last matrix in row echelon form
    var z = b3;
    var y = (b2 - a23 * z) / a22;
    var x = (b1 - a12 * y - a13 * z) / a11;

    // Displaying the solution
    document.getElementById('result').innerHTML = "x = " + x + "<br>y = " + y + "<br>z = " + z;

    var matrix = "<table border='1'><tr><td>" + a11 + "</td><td>" + a12 + "</td><td>" + a13 + "</td><td>" + b1 + "</td></tr><tr><td>" +
        a21 + "</td><td>" + a22 + "</td><td>" + a23 + "</td><td>" + b2 + "</td></tr><tr><td>" +
        a31 + "</td><td>" + a32 + "</td><td>" + a33 + "</td><td>" + b3 + "</td></tr></table>";
    document.getElementById('matrix').innerHTML = matrix;
}