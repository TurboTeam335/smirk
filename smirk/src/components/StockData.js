import React from "react";

class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const key = "EsYRiuO5UyJ3IGNWDCggwH54klr9JIi8";

    let today = new Date();
    let day = today.getDay();
    let adj = 1;
    if (day === 0) adj = 2;
    if (day === 1) adj = 3;

    let dd = String(today.getDate() - adj).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const url =
      `https://api.polygon.io/v2/aggs/ticker/${this.props.ticker}/range/1/day/` +
      `${today}/${today}?adjusted=true&sort=asc&limit=120&apiKey=${key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "ERROR") {
          throw new Error("Invalid Ticker");
        }
        const dat = data.results[0];
        const parsedData = {
          price: dat.c,
          prevPrice: dat.o,
          pointsChanged: (dat.c - dat.o).toFixed(2),
          percChanged: (((dat.c - dat.o) / dat.o) * 100).toFixed(2) + "%",
        };
        this.setState({ data: parsedData });
      })
      .catch(error => console.error("Error:", error));
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>Price: {data.price}</div>
        <div>Previous Price: {data.prevPrice}</div>
        <div>Points Changed: {data.pointsChanged}</div>
        <div>Percentage Changed: {data.percChanged}</div>
      </div>
    );
  }
}

export default StockData;
