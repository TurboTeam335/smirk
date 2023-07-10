import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      stockData: null,
    };
  }

  handleInputChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = async () => {
    let { searchValue } = this.state;
    searchValue = searchValue.toUpperCase(); // Convert to uppercase
    const key = "EsYRiuO5UyJ3IGNWDCggwH54klr9JIi8";
    let today = new Date();
    let day = today.getDay();
    let adj = 1;
    if (day === 0) adj = 2;
    if (day === 1) adj = 3;

    let dd = String(today.getDate() - adj).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const url =
      `https://api.polygon.io/v2/aggs/ticker/${searchValue}/range/1/day/` +
      `${today}/${today}?adjusted=true&sort=asc&limit=120&apiKey=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ERROR") {
        throw new Error("Invalid Ticker");
      }

      const dat = data.results[0];
      const parsedData = {
        ticker: searchValue,
        price: dat.c,
        prevPrice: dat.o,
        pointsChanged: (dat.c - dat.o).toFixed(2),
        percChanged: (((dat.c - dat.o) / dat.o) * 100).toFixed(2) + "%",
      };

      this.setState({ stockData: parsedData });
    } catch (err) {
      alert("Invalid Ticker, please search again.");
    }
  };

  render() {
    const { searchValue, stockData } = this.state;

    return (
      <div className="col-md-4 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="searchStocksInput"
            placeholder="Search stocks"
            aria-label="Search stocks"
            aria-describedby="button-addon2"
            value={searchValue}
            onChange={this.handleInputChange}
          />

          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>

        {stockData && (
          <div className="card-body">
            <div>
              <div>Price: {stockData.price}</div>
              <div>Previous Price: {stockData.prevPrice}</div>
              <div>Points Changed: {stockData.pointsChanged}</div>
              <div>
                Percentage Changed: {stockData.percChanged}{" "}
                <span
                  className={
                    stockData.pointsChanged > 0 ? "up-arrow" : "down-arrow"
                  }
                >
                  {stockData.pointsChanged > 0 ? "↑" : "↓"}
                </span>
              </div>
            </div>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => this.props.onAddStock(this.state.stockData)}
            >
              Add to My Stocks
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
