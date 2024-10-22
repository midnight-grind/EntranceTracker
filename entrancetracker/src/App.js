import React from 'react';
import './App.css';
import NodeGroup from './components/NodeGroup';
import TextField from '@mui/material/TextField';
import CSVReader from './components/CSVReader';
import SwirlCanvas from './components/SwirlCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left">
          <CSVReader />
        </div>
      </header>
      <SwirlCanvas />
    </div>
  );
}

function FromTo() {
  return (
    <div>
      <TextField
        id="outlined-required"
        label="From"
        defaultValue="Deku Tree"
      />
      <br />
      <TextField
        id="outlined-required"
        label="To"
        defaultValue="Kokiri Forest"
      />
    </div>
  );
}

export default App;
