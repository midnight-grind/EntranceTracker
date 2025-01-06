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

        printPaths(defaultPaths);

        searchPaths(defaultPaths, "Kokiri Forest");
    }
    
    function searchPaths(defaultPaths, startLocation, endLocation)
    {
        let searchedPaths = {};

        console.log("");

    }

    function searchPathsRecursive(paths, currentLocation)
    {
        let nextPaths = paths[currentLocation];

        for (const nextPath of nextPaths)
        {
            // if (pathSeen(currentLocation, ))
        }
    }


    // gets every path you can take from start location to end location
    // sometimes contains multiple paths 
    function getPaths(coming_from, brings_you_to, allPaths)
    {
        let allComingFromPaths = allPaths[coming_from];

        console.log("allComingFromPaths: " + allComingFromPaths);
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

    function printPaths(paths)
    {
        console.log("\nprinting all paths: \n");
        for (const key of Object.keys(paths))
        {

            for (const path of paths[key])
            {
                console.log(key + " brings you to: " + path["brings_you_to"]);
            }
        }
    }

    return (
        <div>
            s
            <TemplateReader sendDataToParent={handleTemplateUploading}></TemplateReader>
        </div>
    );

}

export default PathFinder;