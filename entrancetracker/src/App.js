import React from 'react';
import logo from './logo.svg';
import './App.css';
import NodeGroup from './components/NodeGroup';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
// import Tooltip from '@mui/material/Tooltip';

import CSVReader from './components/CSVReader';


function App() {
  return (
    <div className="App">
      <header className="App-header">

      {/* <AddCircleTwoToneIcon style={{ fontSize: 40, color: 'green' }} /> */}

      {/* <FromTo></FromTo> */}

      <div className="top-left">
        <CSVReader/>
      </div>
      <div className="container">
        <div className="nodegroup">
          <NodeGroup/>
        </div>
      </div>



      </header>
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