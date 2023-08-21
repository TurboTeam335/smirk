import React from 'react';
import SearchBar from './Search/Search';
import MyStocks from './MyStocks/MyStocks';
import Twitter from './Twitter/Twitter';

class ParentComponent extends React.Component {
  render() {
    return (
      <main className='container my-4 bg'>
        <div className='row'>
          <SearchBar
            onSearch={this.props.handleSearch}
            onAddStock={this.props.handleAddStock}
          />
          <Twitter />
        </div>
        <div className="my-stocks-container"> 
          <MyStocks
            stocks={this.props.stocks}
            removeStock={this.props.removeStock}
          />
        </div>
      </main>
    );    
  }
}

export default ParentComponent;
