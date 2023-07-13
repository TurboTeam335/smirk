import React from 'react';
import StockData from './StockData';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.css"

function Header() {
  return (
    <header class="bg-dark gradient  py-3">
    <div
      class="container d-flex flex-column flex-md-row align-items-center justify-content-between"
    >
      <h1 class="text-light display-4 fw-bold mb-0 mb-md-3">
        SM<span class="IR">IR</span>K
      </h1>
      <p class="text-light h5 d-none d-md-block mb-0">
        Stock Market Insights &amp; Ridiculous Knowledge
      </p>
    </div>
  </header>
  )
}

export default Header