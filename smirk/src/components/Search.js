import React from 'react';
import StockData from './StockData';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({ searchText: event.target.value });
  }

  async handleSearchClick() {
    try {
      const stockData = await <StockData ticker={this.state.searchText} />;
      this.setState({ data: stockData });
    } catch (error) {
      alert('Invalid Ticker, please search again.');
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.searchText} onChange={this.handleInputChange} />
        <button onClick={this.handleSearchClick}>Search</button>
        <div>
          {/* display the search result */}
          {this.state.data && 
            <div>
              <h4>{`Search results for "${this.state.searchText}"`}</h4>
              <div>Price: {this.state.data.price}</div>
              <div>Previous Price: {this.state.data.prevPrice}</div>
              <div>Points Changed: {this.state.data.pointsChanged}</div>
              <div>Percentage Changed: {this.state.data.percChanged}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Search;
