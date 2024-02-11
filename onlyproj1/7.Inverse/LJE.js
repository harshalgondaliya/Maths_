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

    // Creating the augmented matrix
    var matrix = [
        [a11, a12, a13, b1],
        [a21, a22, a23, b2],
        [a31, a32, a33, b3]
    ];

    // Applying Gauss-Jordan Elimination
    var rank = 0;
    for (var i = 0; i < 3; i++) {
        // Search for nonzero entry in this column from row i downwards
        var nonzeroRow = -1;
        for (var j = i; j < 3; j++) {
            if (matrix[j][i] !== 0) {
                nonzeroRow = j;
                break;
            }
        }
        if (nonzeroRow === -1) continue; // No nonzero entry found, skip this column

        // Swap rows to make the nonzero entry the pivot
        var tempRow = matrix[i];
        matrix[i] = matrix[nonzeroRow];
        matrix[nonzeroRow] = tempRow;

        // Scale pivot row to make the pivot 1
        var pivot = matrix[i][i];
        for (var j = i; j <= 3; j++) {
            matrix[i][j] /= pivot;
        }

        // Eliminate other entries in this column
        for (var k = 0; k < 3; k++) {
            if (k === i) continue; // Skip pivot row
            var factor = matrix[k][i];
            for (var j = i; j <= 3; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }

        rank++;
    }

    // Displaying the matrix with rank and augmented rank
    var matrixString = "<p>Matrix:</p><table border='1'>";
    for (var i = 0; i < 3; i++) {
        matrixString += "<tr>";
        for (var j = 0; j < 4; j++) {
            matrixString += "<td>" + matrix[i][j] + "</td>";
        }
        matrixString += "</tr>";
    }
    matrixString += "</table>";
    matrixString += "<p>Rank: " + rank + "</p>";
    matrixString += "<p>Augmented Rank: " + (rank === 3 ? rank : rank + 1) + "</p>";
    document.getElementById('matrix').innerHTML = matrixString;
}