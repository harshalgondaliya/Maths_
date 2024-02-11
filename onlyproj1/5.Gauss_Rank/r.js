function createMatrixInput() {
    var rows = parseInt(document.getElementById("rows").value);
    var cols = parseInt(document.getElementById("cols").value);

    var matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";

    for (var i = 0; i < rows; i++) {
        var row = matrixInput.insertRow(i);
        for (var j = 0; j < cols; j++) {
            var cell = row.insertCell(j);
            var input = document.createElement("input");
            input.type = "number";
            input.id = "m" + i + j;
            input.style.width = "50px"; // Adjust width of input fields
            cell.appendChild(input);
        }
    }
}

function calculateRank() {
    var rows = parseInt(document.getElementById("rows").value);
    var cols = parseInt(document.getElementById("cols").value);

    var matrix = [];
    // Get values from user input
    for (var i = 0; i < rows; i++) {
        matrix[i] = [];
        for (var j = 0; j < cols; j++) {
            matrix[i][j] = parseFloat(document.getElementById("m" + i + j).value);
        }
    }

    // Initialize rank
    var rank = 0;

    // Loop through rows
    for (var row = 0; row < rows; row++) {
        // Initialize flag for finding non-zero element
        var nonZeroFound = false;

        // Loop through columns
        for (var col = 0; col < cols; col++) {
            // If current element is non-zero
            if (matrix[row][col] !== 0) {
                nonZeroFound = true;

                // Increment rank
                rank++;

                // Eliminate non-zero elements below the pivot
                for (var i = row + 1; i < rows; i++) {
                    var factor = matrix[i][col] / matrix[row][col];
                    for (var j = col; j < cols; j++) {
                        matrix[i][j] -= factor * matrix[row][j];
                    }
                }

                // Break the inner loop
                break;
            }
        }

        // If no non-zero element is found in this row, break the outer loop
        if (!nonZeroFound) break;
    }

    var matrixOutput = "Final Matrix:<br>";
    matrixOutput += "<table border='1'>";
    for (var i = 0; i < rows; i++) {
        matrixOutput += "<tr>";
        for (var j = 0; j < cols; j++) {
            matrixOutput += "<td>" + matrix[i][j] + "</td>";
        }
        matrixOutput += "</tr>";
    }
    matrixOutput += "</table>";
    document.getElementById("finalMatrix").innerHTML = matrixOutput;

    // Output rank
    document.getElementById("rank").innerText = "Rank of the matrix: " + rank;

}