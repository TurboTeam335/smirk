import React from 'react';
import './styles/index.css';
import Header from './components/Header';
import ParentComponent from './components/ParentComponent';
import {
  getStocksFromLocalStorage,
  saveStocksToLocalStorage,
} from './utils/storage';

class App extends React.Component {
  state = {
    stocks: getStocksFromLocalStorage(),
    searchValue: '',
  };

  componentDidMount() {
    const stocksFromLocalStorage = JSON.parse(localStorage.getItem('stocks'));
    if (stocksFromLocalStorage) {
      this.setState({ stocks: stocksFromLocalStorage });
    }
  }

  handleSearch = searchValue => {
    // Add your search functionality here
    this.setState({ searchValue });
    console.log(`Searching for ${searchValue}`);
  };

  handleAddStock = stockData => {
    this.setState(prevState => {
      const updatedStocks = [...prevState.stocks, stockData];
      saveStocksToLocalStorage(updatedStocks);
      return { stocks: updatedStocks };
    });
  };

  removeStock = ticker => {
    this.setState(prevState => {
      const updatedStocks = prevState.stocks.filter(
        stock => stock.ticker !== ticker
      );
      saveStocksToLocalStorage(updatedStocks);
      return { stocks: updatedStocks };
    });
  };

  render() {
    return (
      <div className='background'>
        <Header />
        <ParentComponent
          handleSearch={this.handleSearch}
          handleAddStock={this.handleAddStock}
          stocks={this.state.stocks}
          removeStock={this.removeStock}
        />
      </div>
    );
  }
}

export default App;
