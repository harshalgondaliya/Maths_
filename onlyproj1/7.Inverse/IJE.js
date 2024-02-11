function findInverse() {
    var numRows = parseInt(document.getElementById('numRows').value);
    var numCols = parseInt(document.getElementById('numCols').value);

    // Get user input for matrix A
    var A = [];
    for (var i = 0; i < numRows; i++) {
        A[i] = [];
        for (var j = 0; j < numCols; j++) {
            A[i][j] = parseFloat(document.getElementById('a' + (i + 1) + (j + 1)).value);
        }
    }

    // Augmenting matrix A with the identity matrix
    var augmentedMatrix = [];
    for (var i = 0; i < numRows; i++) {
        augmentedMatrix[i] = [];
        for (var j = 0; j < numCols * 2; j++) {
            if (j < numCols) {
                augmentedMatrix[i][j] = A[i][j];
            } else if (j - numCols == i) {
                augmentedMatrix[i][j] = 1;
            } else {
                augmentedMatrix[i][j] = 0;
            }
        }
    }

    // Applying Gauss-Jordan Elimination to transform the left side into identity matrix
    for (var i = 0; i < numRows; i++) {
        // Finding pivot
        var pivot = augmentedMatrix[i][i];

        // Check if pivot is zero
        if (pivot === 0) {
            document.getElementById('inverseMatrix').innerHTML = "<p>Matrix is singular. Inverse does not exist.</p>";
            return;
        }

        // Scaling pivot row to make pivot 1
        for (var j = 0; j < numCols * 2; j++) {
            augmentedMatrix[i][j] /= pivot;
        }

        // Eliminating other entries in the column
        for (var k = 0; k < numRows; k++) {
            if (k !== i) {
                var factor = augmentedMatrix[k][i];
                for (var j = 0; j < numCols * 2; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
        }
    }

    // Extracting the inverse matrix
    var inverseMatrix = [];
    for (var i = 0; i < numRows; i++) {
        inverseMatrix[i] = [];
        for (var j = numCols; j < numCols * 2; j++) {
            inverseMatrix[i][j - numCols] = augmentedMatrix[i][j];
        }
    }

    // Displaying the inverse matrix with 4 digits after the decimal point
    var inverseMatrixString = "<p>Inverse Matrix:</p><table border='1'>";
    for (var i = 0; i < numRows; i++) {
        inverseMatrixString += "<tr>";
        for (var j = 0; j < numCols; j++) {
            inverseMatrixString += "<td>" + inverseMatrix[i][j].toFixed(4) + "</td>";
        }
        inverseMatrixString += "</tr>";
    }
    inverseMatrixString += "</table>";
    document.getElementById('inverseMatrix').innerHTML = inverseMatrixString;
}

function generateInputs() {
    var numRows = parseInt(document.getElementById('numRows').value);
    var numCols = parseInt(document.getElementById('numCols').value);
    var matrixInputs = document.getElementById('matrixInputs');
    matrixInputs.innerHTML = '';

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var input = document.createElement('input');
            input.type = 'text';
            input.id = 'a' + (i + 1) + (j + 1);
            input.placeholder = 'a' + (i + 1) + (j + 1);
            matrixInputs.appendChild(input);
        }
        matrixInputs.appendChild(document.createElement('br'));
    }
}

document.getElementById('numRows').addEventListener('input', generateInputs);
document.getElementById('numCols').addEventListener('input', generateInputs);