export const getStocksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("stocks")) || [];
};

export const saveStocksToLocalStorage = (stocks) => {
  localStorage.setItem("stocks", JSON.stringify(stocks));
};
