import React from "react";
import './ComingFromBringsYouTo.css';
import WavyDiv from "./WavyDiv";

function ComingFromBringsYouTo({ locations, locationsObjects }) {
    console.log("from ComingFromBringsYouTo: ");
    console.log(locationsObjects);

    // Check if props are empty or non-existent
    if (!locations || locations.length === 0 || !locationsObjects || Object.keys(locationsObjects).length === 0) {
        console.log("nothing loaded into ComingFromBringsYouTo");
        return (
            <WavyDiv text="Entrance Template File not loaded">
                <div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '20px' }}></div>
            </WavyDiv>
        );
    }

    console.log("Coming from loaded");

    let ret = [];

    ret.push(
        <div
            key="header"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: '#855dc9', fontSize: '20px', marginBottom: '20px', textAlign : 'center' }}
        >
            Coming From &rarr; Brings You To
        </div>
    );

    for (let [key, value] of Object.entries(locationsObjects)) {
        for (let obj of value) {
            let coming_from = key;
            let brings_you_to = obj["brings_you_to"];
            let entrance_door = obj["entrance_door"];
            let exit_door = obj["exit_door"];

            ret.push(
                <div
                    key={`${coming_from}-${brings_you_to}`}
                    style={{ marginBottom: '15px', display: 'block' }}
                >
                    <div style={{ fontSize: "20px", color: "white" }}>
                        <span>{coming_from}</span>
                        <span style={{ marginLeft: "10px", fontSize: "12px", color: "lightgray" }}>
                            {entrance_door ? `${entrance_door}` : ""}
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                            &rarr;&nbsp;&nbsp;{brings_you_to}
                        </span>
                        <span style={{ marginLeft: "10px", fontSize: "12px", color: "lightgray" }}>
                            {exit_door ? `${exit_door}` : ""}
                        </span>
                    </div>
                </div>
            );
        }
    }

    return ret;
}

export default ComingFromBringsYouTo;
