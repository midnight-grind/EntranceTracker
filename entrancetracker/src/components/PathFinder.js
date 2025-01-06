import React, { useState } from "react";
import TemplateReader from "./TemplateReader";

function PathFinder()
{
    const [defaultPaths, setDefaultPaths] = useState({});

    function handleTemplateUploading(defaultPaths)
    {
        setDefaultPaths(defaultPaths);
        // console.log("kokiri forest paths: " + defaultPaths["Kokiri Forest"]);
        // console.log("default paths: " + JSON.stringify(defaultPaths, null, 2));

        for (const key of Object.keys(defaultPaths))
        {
            // console.log("coming from: " + key);

            for (const path of defaultPaths[key])
            {
                console.log(key + " brings you to: " + path["brings_you_to"]);
            }
        }


        searchPaths(defaultPaths, "Kokiri Forest");
    }
    
    function getPaths(startLocation, endLocation)
    {

    }

    function searchPaths(defaultPaths, startLocation, endLocation)
    {
        let searchedPaths = {};

    }

    function pathSeen(coming_from, targetPath, searchedPaths)
    {
        let locationPaths = searchedPaths[coming_from];

        if (locationPaths === undefined)
            return false;

        for (const locationPath of locationPaths)
        {
            if (targetPath["brings_you_to"] === locationPath["brings_you_to"] &&
                targetPath["entrance_door"] === locationPath["entrance_door"] &&
                targetPath["exit_door"] === locationPath["exit_door"]
            )
                return true;
            
        }

        return false;
    }

    function searchPathsRecursive(paths, currentLocation)
    {
        let nextPaths = paths[currentLocation];

        for (const nextPath of nextPaths)
        {
            if (pathSeen(currentLocation, ))
        }
    }

    return (
        <div>
            <TemplateReader sendDataToParent={handleTemplateUploading}></TemplateReader>
        </div>
    );

}

export default PathFinder;