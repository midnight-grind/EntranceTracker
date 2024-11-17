import React from "react";
import './ComingFromBringsYouTo.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ComingFromBringsYouTo( {locations} )
{
    return (
        <div>
            <div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Coming From &rarr; Brings You To </div>
            <br></br><br></br>
            <div style={{display: 'inline-block'}}>
            <div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>   Sort By: </div>

            </div>

            <div style={{display: 'inline-block', marginLeft: '40px'}}>    
                <Autocomplete
                    disablePortal
                    options={locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Start Location" />}
                />
            </div>

            <div style={{display: 'inline-block', marginLeft: '40px'}}>
                <Autocomplete
                    disablePortal
                    options={locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="End Location" />}
                />
            </div>
        </div>
    );
}

export default ComingFromBringsYouTo;