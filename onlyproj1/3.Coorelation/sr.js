function calculateCorrelation() {
    const xValuesInput = document.getElementById("xValues").value.split(",");
    const yValuesInput = document.getElementById("yValues").value.split(",");

    const n = xValuesInput.length;

    if (n !== yValuesInput.length) {
        alert("The number of X and Y values must be the same.");
        return;
    }

    let xValues = [];
    let yValues = [];

    for (let i = 0; i < n; i++) {
        xValues.push(parseFloat(xValuesInput[i]));
        yValues.push(parseFloat(yValuesInput[i]));
    }

    let rankX = [];
    let rankY = [];

    for (let i = 0; i < n; i++) {
        let countX = 1;
        let countY = 1;
        for (let j = 0; j < n; j++) {
            if (xValues[i] > xValues[j]) countX++;
            if (yValues[i] > yValues[j]) countY++;
        }
        rankX.push(countX);
        rankY.push(countY);
    }

    let d = 0;
    for (let i = 0; i < n; i++) {
        d += Math.pow(rankX[i] - rankY[i], 2);
    }

    const correlation = 1 - ((6 * d) / (n * (Math.pow(n, 2) - 1)));

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Spearman's Rank Correlation Coefficient: " + correlation.toFixed(4);
}