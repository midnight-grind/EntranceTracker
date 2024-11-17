import React from "react";
import './ComingFromBringsYouTo.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ComingFromBringsYouTo( {locations} )
{
    return (
        <div>
            Coming From &rarr; Brings You To
            <br></br><br></br>
            <div style={{display: 'inline-block'}}>
                Sort By:

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