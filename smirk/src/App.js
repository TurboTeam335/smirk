import React from 'react';
import './styles/index.css';
import SearchBar from './components/Search';
import MyStocks from './components/MyStocks';
import RandomStock from './components/RandomStock';
import Header from './components/Header'
import Twitter from './components/Twitter'

class App extends React.Component {
  state = {
    stocks: [],
    searchValue: '',
  };

  componentDidMount() {
    const stocksFromLocalStorage = JSON.parse(localStorage.getItem("stocks"));
    if (stocksFromLocalStorage) {
      this.setState({ stocks: stocksFromLocalStorage });
    }
  }

  handleSearch = (searchValue) => {
    // Add your search functionality here
    this.setState({ searchValue });
    console.log(`Searching for ${searchValue}`);
  };

  handleAddStock = (stockData) => {
    this.setState(prevState => {
      const updatedStocks = [...prevState.stocks, stockData];
      localStorage.setItem("stocks", JSON.stringify(updatedStocks));
      return { stocks: updatedStocks };
    });
  };
  
  removeStock = (ticker) => {
    this.setState(prevState => {
      const updatedStocks = prevState.stocks.filter(stock => stock.ticker !== ticker);
      localStorage.setItem("stocks", JSON.stringify(updatedStocks));
      return { stocks: updatedStocks };
    });
  };
  

  render() {
    return (
      <div>
        <Header />
        <main className="container my-4 bg">
          <div className="row">
          <SearchBar onSearch={this.handleSearch} onAddStock={this.handleAddStock} />
            <Twitter />
          </div>
          <MyStocks stocks={this.state.stocks} removeStock={this.removeStock} />

        </main>
      </div>
    );
  }
}

export default App;







