import React from "react";
import './ComingFromBringsYouTo.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ComingFromBringsYouTo( {locations, locationsObjects} )
{
    return (
        <div>
            <div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: 'white', fontSize: '20px' }}>Coming From &rarr; Brings You To </div>


            <br/>
            <div style={{display: 'inline-block'}}>
            <div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: 'white', fontSize: '20px'  }}>   Sort By: </div>

            </div>

            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                <Autocomplete
                    disablePortal
                    options={locations}
                    sx={{
                        width: 250, // Reduced width
                        '& .MuiInputBase-root': { fontSize: '14px', padding: '4px 8px' }, // Smaller font and padding
                        '& .MuiFormLabel-root': { fontSize: '12px' }, // Smaller label font size
                    }}
                    renderInput={(params) => <TextField {...params} label="Start Location" />}
                />
            </div>

            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
                <Autocomplete
                    disablePortal
                    options={locations}
                    sx={{
                        width: 250, // Reduced width
                        '& .MuiInputBase-root': { fontSize: '14px', padding: '4px 8px' }, // Smaller font and padding
                        '& .MuiFormLabel-root': { fontSize: '12px' }, // Smaller label font size
                    }}
                    renderInput={(params) => <TextField {...params} label="End Location" />}
                />
            </div>

        </div>
    );
}

export default ComingFromBringsYouTo;