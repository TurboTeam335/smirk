import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import SimpleLineChart from "./SimpleLineChart";
import StockData from './StockData';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      stockData: null,
      errorMessage: "",
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

      this.setState({ stockData: parsedData, errorMessage: "" });
    } catch (err) {
      this.setState({
        errorMessage: "Invalid Ticker, please search again.",
        stockData: null,
      });
    }
  };

  render() {
    const { searchValue, stockData, errorMessage } = this.state;
  
    return (
      <div className="col-md-4 mb-3 col-sm-12">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSearch();
          }}
        >
          <div className="input-group col-lg-12 mb-3">
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
              className="button"
              type="button"
              id="button-addon2"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </form>
  
        {(stockData || errorMessage) && (
          <div className="card bg-dark bg-gradient text-white">
            <div className="card-body">
              {stockData ? (
                <>
                  <h5 className="card-title ticker">{stockData.ticker}</h5>
                  <div className="card-text d-flex justify-content-between">
                    <div className="stock-info">
                      <p>Price: {stockData.price}</p>
                      <p>Previous Price: {stockData.prevPrice}</p>
                      <p>Points Changed: {stockData.pointsChanged}</p>
                      <p>
                        Percentage Changed: {stockData.percChanged}{" "}
                        <span
                          className={
                            stockData.pointsChanged > 0
                              ? "up-arrow"
                              : "down-arrow"
                          }
                        >
                          {stockData.pointsChanged > 0 ? "↑" : "↓"}
                        </span>
                      </p>
                    </div>
                    {/* <div className="chart-container">
                      <StockData ticker={stockData.ticker} />
                    </div> */}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="button"
                      type="button"
                      onClick={() =>
                        this.props.onAddStock(this.state.stockData)
                      }
                    >
                      Add to My Stocks
                    </button>
                  </div>
                </>
              ) : (
                errorMessage && (
                  <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                    {errorMessage}
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  
}

export default SearchBar;
