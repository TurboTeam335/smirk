import React from "react";
import HoverableStockData from "./HoverableStockData";
import SimpleLineChart from "./SimpleLineChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";


class MyStocks extends React.Component {
  removeStock(ticker) {
    this.props.removeStock(ticker);
  }

  render() {
    const { stocks } = this.props;

    return (
      <div className="row mt-4 w-100">
        <h2 className="col-12">My Stocks</h2>
        {stocks.map((stock, index) => (
          <div className="col-xs-12 col-md-6 col-lg-4" key={index}>

            <div className="card shadow mt-3 bg-dark bg-gradient text-white">
              <div className="card-body">
                <h5 className="card-title">{stock.ticker}</h5>
                <p className="card-text">
                  <div>Price: {stock.price}</div>
                  <div>Previous Price: {stock.prevPrice}</div>
                  <div>Points Changed: {stock.pointsChanged}</div>
                  <div>
                    Percentage Changed: {stock.percChanged}{" "}
                    <span
                      className={
                        stock.pointsChanged > 0 ? "up-arrow" : "down-arrow"
                      }
                    >
                      {stock.pointsChanged > 0 ? "↑" : "↓"}
                    </span>
                  </div>
                  <div className="mt-3 chart-small">
                    <SimpleLineChart ticker={stock.ticker} />
                  </div>
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    className="button"
                    type="button"
                    onClick={() => this.removeStock(stock.ticker)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MyStocks;
