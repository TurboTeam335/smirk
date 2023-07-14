import React from "react";
import StockData from "./StockData";
import "../styles/index.css";

class HoverableStockData extends React.Component {
  render() {
    return (
      <div className="hoverable-chart">
        <StockData ticker={this.props.ticker} />
      </div>
    );
  }
}

export default HoverableStockData;
