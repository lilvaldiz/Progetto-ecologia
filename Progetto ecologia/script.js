document.addEventListener("DOMContentLoaded", function() {
    createTable(5, 5);
  });
  
  function createTable(rows, cols) {
    var tableContainer = document.getElementById("table-container");
    var table = document.createElement("table");
  
    for (var i = 0; i < rows; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < cols; j++) {
        var cell = document.createElement("td");
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    tableContainer.appendChild(table);
  }
  