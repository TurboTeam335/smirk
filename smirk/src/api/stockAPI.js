const apiKey = "EsYRiuO5UyJ3IGNWDCggwH54klr9JIi8";

export const searchStock = async (searchValue) => {
  searchValue = searchValue.toUpperCase(); // Convert to uppercase
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
    `https://api.polygon.io/v2/aggs/ticker/${searchValue}/range/1/day/` +
    `${today}/${today}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ERROR") {
      throw new Error("Invalid Ticker");
    }

    const dat = data.results[0];
    const parsedData = {
      ticker: searchValue,
      price: dat.c,
      prevPrice: dat.o,
      pointsChanged: (dat.c - dat.o).toFixed(2),
      percChanged: (((dat.c - dat.o) / dat.o) * 100).toFixed(2) + "%",
    };

    return { stockData: parsedData, errorMessage: "" };
  } catch (err) {
    return {
      errorMessage: "Invalid Ticker, please search again.",
      stockData: null,
    };
  }
};


export const fetchStockData = async (ticker) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30); // for example, 7 days ago

  const url =
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/` +
    `${startDate.toISOString().slice(0,10)}/${endDate.toISOString().slice(0,10)}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (data.status === "ERROR") {
      throw new Error("Invalid Ticker");
    }

    // Format the data for Recharts
    const formattedData = data.results.map(result => ({
      date: new Date(result.t).toISOString().slice(0,10), // convert timestamp to date
      price: result.c,
    }));
    return formattedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
