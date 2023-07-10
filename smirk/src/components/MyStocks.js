import React from "react";
import StockData from "./StockData";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";

class MyStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.getSavedStocks(),
    };
    this.removeStock = this.removeStock.bind(this);
  }

  getSavedStocks() {
    let savedStocks = JSON.parse(localStorage.getItem("stocks"));
    return savedStocks ? savedStocks : [];
  }

  removeStock(ticker) {
    let stocks = this.state.stocks;
    stocks = stocks.filter(stock => stock !== ticker);
    this.setState({ stocks: stocks });
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }

  render() {
    const { stocks } = this.state;
  
    return (
      <div className="row mt-4 w-100">
        <div className="col">
          <h2>My Stocks</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Ticker Name</th>
                <th>Value</th>
                <th>Points Changed</th>
                <th>% Changed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.ticker}</td>
                  <td>{stock.price}</td>
                  <td>{stock.pointsChanged}</td>
                  <td>
                    {stock.percChanged}
                    <span className={stock.pointsChanged > 0 ? "up-arrow" : "down-arrow"}>
                      {stock.pointsChanged > 0 ? "↑" : "↓"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => this.removeStock(stock.ticker)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
}

export default MyStocks;
