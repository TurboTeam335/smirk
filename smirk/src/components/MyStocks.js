import React from 'react';
import StockData from './StockData';

class MyStocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: this.getSavedStocks(),
        };
        this.removeStock = this.removeStock.bind(this);
    }

    getSavedStocks() {
        let savedStocks = JSON.parse(localStorage.getItem('stocks'));
        return savedStocks ? savedStocks : [];
    }

    removeStock(ticker) {
        let stocks = this.state.stocks;
        stocks = stocks.filter(stock => stock !== ticker);
        this.setState({ stocks: stocks });
        localStorage.setItem('stocks', JSON.stringify(stocks));
    }

    render() {
        return (
            <div>
                <h2>My Stocks</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Price</th>
                            <th>Points Changed</th>
                            <th>Percent Changed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stocks.map((ticker) => (
                            <tr key={ticker}>
                                <StockData ticker={ticker} removeStock={this.removeStock} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyStocks;
