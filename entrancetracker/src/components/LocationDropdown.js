import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function LocationDropdown( {locations} )
{
    return (
        <div style={{display: 'inline-block', marginLeft: '40px'}}>    
            <Autocomplete
                disablePortal
                options={locations}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" />}
            />
        </div>
    );
}

export default LocationDropdown;