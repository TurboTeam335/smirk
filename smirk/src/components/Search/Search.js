import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/index.css';
import { searchStock } from '../../api/stockAPI';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      stockData: null,
      errorMessage: '',
    };
  }

  handleInputChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = async () => {
    let { searchValue } = this.state;
    const result = await searchStock(searchValue);
    this.setState(result);
  };

  render() {
    const { searchValue, stockData, errorMessage } = this.state;

    return (
      <div className='col-md-4 mb-3 col-sm-12'>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSearch();
          }}
        >
          <div className='input-group col-lg-12 mb-3'>
            <input
              type='text'
              className='form-control'
              id='searchStocksInput'
              placeholder='Search stocks'
              aria-label='Search stocks'
              aria-describedby='button-addon2'
              value={searchValue}
              onChange={this.handleInputChange}
            />

            <button
              className='button'
              type='button'
              id='button-addon2'
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </form>

        {(stockData || errorMessage) && (
          <div className='card bg-dark bg-gradient text-white'>
            <div className='card-body'>
              {stockData ? (
                <>
                  <h5 className='card-title ticker'>{stockData.ticker}</h5>
                  <div className='card-text d-flex justify-content-between'>
                    <div className='stock-info'>
                      <p>Price: ${stockData.price}</p>
                      <p>Previous Price: ${stockData.prevPrice}</p>
                      <p>Points Changed: ${stockData.pointsChanged}</p>
                      <p>
                        Percentage Changed: {stockData.percChanged}{' '}
                        <span
                          className={
                            stockData.pointsChanged > 0
                              ? 'up-arrow'
                              : 'down-arrow'
                          }
                        >
                          {stockData.pointsChanged > 0 ? '↑' : '↓'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button
                      className='button'
                      type='button'
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
                  <p style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
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
