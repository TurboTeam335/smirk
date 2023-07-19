import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.css"
import SimpleLineChart from './SimpleLineChart';

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

  fetchData = async (ticker) => {
    const key = "EsYRiuO5UyJ3IGNWDCggwH54klr9JIi8";
    // let today = new Date();
    // let day = today.getDay();
    // let adj = 1;
    // if (day === 0) adj = 2;
    // if (day === 1) adj = 3;
  
    // let dd = String(today.getDate() - adj).padStart(2, "0");
    // let mm = String(today.getMonth() + 1).padStart(2, "0");
    // let yyyy = today.getFullYear();
  
    // today = `${yyyy}-${mm}-${dd}`;
  
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30); // for example, 7 days ago

  const url =
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/` +
    `${startDate.toISOString().slice(0,10)}/${endDate.toISOString().slice(0,10)}?adjusted=true&sort=asc&limit=120&apiKey=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "ERROR") {
        throw new Error("Invalid Ticker");
      }

      // Format the data for Recharts
      const formattedData = data.results.map(result => ({
        date: new Date(result.t).toISOString().slice(0,10), // convert timestamp to date
        price: result.c,
      }));

      this.setState({ data: formattedData });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  render() {
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <SimpleLineChart data={data} />
      </div>
    );
  }
}

export default StockData;
