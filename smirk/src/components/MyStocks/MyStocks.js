import React from 'react';
import SimpleLineChart from '../Graph/SimpleLineChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/index.css';
import './MyStocks.css';
import StockData from '../Graph/StockData';

class MyStocks extends React.Component {
  removeStock(ticker) {
    this.props.removeStock(ticker);
  }

  render() {
    const { stocks } = this.props;

    return (
      <div className='row mt-4 w-100' style={{ marginBottom: '40px' }}>
        <h2 className='col-12'>My Stocks</h2>
        {stocks.map((stock, index) => (
          <div className='col-lg-12' key={index}>
            <div className='card shadow mt-3 bg-dark bg-gradient text-white'>
              <div className='card-body'>
                <div className='header-section'>
                  <h5 className='card-title'>{stock.ticker}</h5>
                </div>
                <div className='text-section'>
                  <div className='stock-data-item'>
                    <span>Price:</span>
                    <span>${stock.price}</span>
                  </div>
                  <div className='stock-data-item'>
                    <span>Previous Price:</span>
                    <span>${stock.prevPrice}</span>
                  </div>
                  <div className='stock-data-item'>
                    <span>Points Changed:</span>
                    <span>${stock.pointsChanged}</span>
                  </div>
                  <div className='stock-data-item'>
                    <span>Percentage Changed:</span>
                    <span>
                      {stock.percChanged}{' '}
                      <span
                        className={
                          stock.pointsChanged > 0 ? 'up-arrow' : 'down-arrow'
                        }
                      >
                        {stock.pointsChanged > 0 ? '↑' : '↓'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className='chart-section mt-3'>
                  <StockData ticker={stock.ticker} />
                </div>
                <div className='action-section d-flex justify-content-center'>
                  <button
                    className='button'
                    type='button'
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
