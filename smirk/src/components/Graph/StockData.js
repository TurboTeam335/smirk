import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/index.css';
import './loading.css'
import SimpleLineChart from './SimpleLineChart';
import { fetchStockData } from '../../api/stockAPI';

class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.ticker);
  }

  fetchData = async ticker => {
    try {
      const formattedData = await fetchStockData(ticker);
      this.setState({ data: formattedData });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { data } = this.state;
  
    if (!data) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading...</p> {/* Added class here */}
        </div>
      );
    }
  
    return (
      <div>
        <SimpleLineChart data={data} />
      </div>
    );
  }
  
  
}

export default StockData;
