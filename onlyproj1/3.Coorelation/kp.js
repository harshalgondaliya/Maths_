function calculate() {
    var xValues = document.getElementById('x').value.split(',').map(Number);
    var yValues = document.getElementById('y').value.split(',').map(Number);
  
    if (xValues.length !== yValues.length) {
      document.getElementById('result').innerHTML = "Error: X and Y values must have the same length.";
      return;
    }
  
    var n = xValues.length;
    var sumX = xValues.reduce((acc, curr) => acc + curr, 0);
    var sumY = yValues.reduce((acc, curr) => acc + curr, 0);
    var sumXY = 0;
    var sumXSquared = 0;
    var sumYSquared = 0;
  
    for (var i = 0; i < n; i++) {
      sumXY += xValues[i] * yValues[i];
      sumXSquared += Math.pow(xValues[i], 2);
      sumYSquared += Math.pow(yValues[i], 2);
    }
  
    var numerator = (n * sumXY) - (sumX * sumY);
    var denominator = Math.sqrt((n * sumXSquared - Math.pow(sumX, 2)) * (n * sumYSquared - Math.pow(sumY, 2)));
    var correlationCoefficient = numerator / denominator;
  
    document.getElementById('result').innerHTML = "Pearson Coefficient of Correlation: " + correlationCoefficient.toFixed(4);
  }
  