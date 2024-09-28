import React from 'react';
import logo from './logo.svg';
import './App.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
// import Tooltip from '@mui/material/Tooltip';


function App() {
  const items = [1, 2, 3];
  return (
    <div className="App">
      <header className="App-header">

      {/* <AddCircleTwoToneIcon style={{ fontSize: 40, color: 'green' }} /> */}
      <TextField
          id="outlined-required"
          label="From"
          defaultValue="Deku Tree"
        /><br></br>
        <TextField
          id="outlined-required"
          label="To"
          defaultValue="Kokiri Forest"
        />
        <div>
          {items.map((item) => (
            <Locations key={item} />
          ))}
        </div>
      </header>
    </div>
  );
}

function Locations() {
  return (
    <React.Fragment>
      <span className="box">test</span>
      <span className="space"></span>
    </React.Fragment>
  )

  // return (
  //   <div className="wrapper">
  //     <span className="box">test</span>
  //     <span className="space"></span>
  //   </div>
  // );
}

// function 

export default App;