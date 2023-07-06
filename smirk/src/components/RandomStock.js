import React from 'react';
import StockData from './StockData';

class RandoStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: this.generateRandomTicker(),
    };
  }

  generateRandomTicker() {
    // For simplicity, let's assume a static list of tickers here
    // In the real world, this could be fetched from the API
    const tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "FB"];
    const randomIndex = Math.floor(Math.random() * tickers.length);
    return tickers[randomIndex];
  }

  render() {
    return (
      <div>
        <h2>Random Stock of the Day</h2>
        <StockData ticker={this.state.ticker} />
      </div>
    );
  }
}

export default RandoStock;
