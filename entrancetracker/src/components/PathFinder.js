import React, { useState } from "react";
import TemplateReader from "./TemplateReader";

function PathFinder()
{
    const [locations, setLocations] = useState({});

    function handleTemplateUploading(locations)
    {
        setLocations(locations);
        // console.log("kokiri forest paths: " + defaultPaths["Kokiri Forest"]);
        // console.log("default paths: " + JSON.stringify(defaultPaths, null, 2));

        // getPathsBetween("Kokiri Forest", "Lost Woods", defaultPaths);
        // printAllPaths(defaultPaths);

        console.log(getLegsBetween("Kokiri Forest", "Lost Woods", locations));
        console.log(locations["Kokiri Forest"]);

        // searchPaths("Kokiri Forest", "Lost Woods", locations);
    }
    
    function searchPaths(startLocation, endLocation, locations)
    {
        let searchedPaths = {};

        // searchedPaths[startLocation] = getPathsBetween(startLocation, endLocation, defaultPaths);
    
        console.log("searchedPaths: \n");
        printAllPaths(searchedPaths);


    }

    function testAdd(searchedPaths, startLocation, item)
    {
        searchedPaths[startLocation] = item;
    }

    function searchPathsRecursive(currentLocation, locations)
    {
        let nextPaths = locations[currentLocation];

        for (const nextPath of nextPaths)
        {
            // if (pathSeen(currentLocation, ))
        }
    }


    /* gets every 1-hop leg between start and end locations
        sometimes multiple loading zones to get to same end from start
        (example you can get directly to Lost Woods from Kokiri Forest through 2 entrances)  */
    function getLegsBetween(coming_from, brings_you_to, locations)
    {
        let ret = [];

        let legs = locations[coming_from];
        for (const leg of legs)
        {
            if (leg["brings_you_to"] === brings_you_to)  // end location matches
                ret.push(leg);
        }

        return ret;
    }

    function legVisited(coming_from, targetPath, searchedPaths)
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
        for (const path of paths)
        {
            console.log(path);
        }
    }

    function printAllPaths(paths)
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