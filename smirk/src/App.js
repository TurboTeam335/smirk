import React from 'react';
import './index.css';
import SearchBar from './components/Search';
import MyStocks from './components/MyStocks';
import RandoStock from './components/RandomStock';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <MyStocks />
        <RandoStock />
      </div>
    );
  }
}

export default App;
