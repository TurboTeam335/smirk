async function returnStockData(ticker) {

  {
    var key = "EsYRiuO5UyJ3IGNWDCggwH54klr9JIi8";
  }

  var today = new Date();
  var dd = String(today.getDate() - 1).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  var url = "https://api.polygon.io/v2/aggs/ticker/" + ticker + "/range/1/day/" + today + "/" + today + "?adjusted=true&sort=asc&limit=120&apiKey=" + key;

  let response = await fetch(url);
  let temp = await response.json();
  var dat = temp.results[0];
  var data = {
  'price' : dat.c,
  'prevPrice' : dat.o,
  'pointsChanged' : dat.c - dat.o,
  'percChanged' : (dat.c - dat.o) / dat.o,
  };
  return data;

}

// Get the search input and button elements
const searchInput = document.querySelector('#searchStocksInput');
const searchButton = document.querySelector('#button-addon2');

// Get the element to update with the search text
const tickerName = document.querySelector('.rdm-ticker-name');

// Get the "Add to My Stocks" button and the "My Stocks" table body
const addToMyStocksButton = document.querySelector('.btn-success');
const myStocksTableBody = document.querySelector('.table tbody');

// Add a click event listener to the search button
searchButton.addEventListener('click', function () {
  // Get the value of the search input
  const searchText = searchInput.value;

  // Update the ticker name element with the search text
  tickerName.textContent = `Search results for "${searchText}"`;
});

// Add a click event listener to the "Add to My Stocks" button
addToMyStocksButton.addEventListener('click', function () {
  
  // Create a new table row and table cells
  const newRow = document.createElement('tr');
  const tickerCell = document.createElement('td');
  const valueCell = document.createElement('td');
  const valueChangeCell = document.createElement('td');
  const percentChangeCell = document.createElement('td');
  const removeButtonCell = document.createElement('td');

  // Set the text content of the table cells
  tickerCell.textContent = tickerName.textContent.replace('Search results for "', '').replace('"', '');
  valueCell.textContent = '$0'; 
  valueChangeCell.textContent = '0'; 
  percentChangeCell.textContent = '0%'; 

  // Create a remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('btn', 'btn-danger');
  removeButton.addEventListener('click', function () {
    newRow.remove();
  });

  // Append the remove button to its table cell
  removeButtonCell.appendChild(removeButton);

  // Append the table cells to the new table row
  newRow.appendChild(tickerCell);
  newRow.appendChild(valueCell);
  newRow.appendChild(valueChangeCell);
  newRow.appendChild(percentChangeCell);
  newRow.appendChild(removeButtonCell);

  // Append the new row to the "My Stocks" table body
  myStocksTableBody.appendChild(newRow);
  
});