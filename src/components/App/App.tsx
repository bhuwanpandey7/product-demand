import React from 'react';
import Tabs from '../Tabs/Tabs';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <span className='App__header-heading'>Create Demand</span>
        <span className='App__header-text'>Search the product you need here. Use tags to find any alternative</span>
      </div>
      <Tabs />
    </div>
  );
}

export default App;
