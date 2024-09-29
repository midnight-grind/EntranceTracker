import React from "react";
import './NodeGroup.css';

function NodeGroup(props) 
{
  const children =  [];
  const items = [1, 2, 3];
  var x;
  var y;

  // for (const item of items) {
  //   children.push(<Locations/>);
  // }

  for (var i=0; i<6; i++)
    children.push(<Locations></Locations>);

  return (
    <div>
      {children}
    </div>
  );
}

function Locations() {
  return (
    <div className="wrapper">
      <span className="box">test</span>
      <span className="space"></span>
    </div>
  );
}



export default NodeGroup;