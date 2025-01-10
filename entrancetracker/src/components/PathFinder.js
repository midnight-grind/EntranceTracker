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

        // console.log(getLegsBetween("Kokiri Forest", "Lost Woods", locations));
        // console.log(locations["Kokiri Forest"]);

        findPaths("Kokiri Forest", "Lost Woods", locations);
    }
    
    function findPaths(startLocation, endLocation, locations)
    {
        // searchedPaths[startLocation] = getPathsBetween(startLocation, endLocation, defaultPaths);
        // console.log("searchedLegs: \n");
        // printAllLocations(searchedLegs);

        // this will be a list of lists where the elements are locations
        // ex: [ [kokiri forest, lost woods, zora river], [kokiri forest, lost woods, hyrule field, zora river] ]
        let finalPaths = [];
        let visitedLegs = {};

        searchPathsRecursive(startLocation, endLocation, visitedLegs, [], finalPaths, locations);

        printFinalPaths(finalPaths);
    }

    function searchPathsRecursive(currentLocation, endLocation, visitedLegs, currentPath, finalPaths, locations)
    {
        let currentPathCopy = [...currentPath];
        let legs = locations[currentLocation];
        currentPathCopy.push(currentLocation);

        console.log("current path: " + currentPathCopy);

        if (currentLocation === endLocation)
        {
            // console.log("destination reached\n\n");
            console.log('%cdestination reached\n\n', 'color: blue; font-size: 16px; font-weight: bold;');

            finalPaths.push(currentPathCopy);
            return;
        }
        
        // return;

        // console.log("next legs to visit: " + legs);
        for (const nextLeg of legs)
        {
            // console.log("leg: " + nextLeg["brings_you_to"]);
            if (!legVisited(currentLocation, nextLeg, visitedLegs))
            {
                addToVisitedLegs(currentLocation, nextLeg, visitedLegs);

                // console.log("nextLeg NOT visited\n\n");
                searchPathsRecursive(nextLeg["brings_you_to"], endLocation, visitedLegs, currentPathCopy, finalPaths, locations);
            }

        }
    }

    function addToVisitedLegs(currentLocation, nextLeg, visitedLegs)
    {
        if (!visitedLegs[currentLocation])
        {
            visitedLegs[currentLocation] = [];
        }

        // mark current location as visited
        visitedLegs[currentLocation].push(nextLeg);
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

    function legVisited(coming_from, targetLeg, visitedLegs)
    {
        let visitedLegList = visitedLegs[coming_from];
        
        if (visitedLegList === undefined)
            return false;

        for (const visitedLeg of visitedLegList)
        {
            if (targetLeg["brings_you_to"] === visitedLeg["brings_you_to"] &&
                targetLeg["entrance_door"] === visitedLeg["entrance_door"] &&
                targetLeg["exit_door"] === visitedLeg["exit_door"]
            )
            return true;
        }

        return false;
    }

    function printLocations(locations)
    {
        for (const location of locations)
        {
            console.log(location);
        }
    }

    function printAllLocations(locations)
    {
        console.log("\nprinting all paths: \n");
        for (const coming_from of Object.keys(locations))
        {   
            const legs = locations[coming_from];
            for (const leg of legs)
            {
                console.log(coming_from + " brings you to: " + leg["brings_you_to"]);
            }
        }
    }

    function printFinalPaths(finalPaths)
    {
        console.log("final paths: ");
        for (const path of finalPaths)
        {
            console.log(path);
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


// notes
// shouldn't traverse the same leg twice
// shouldn't traverse the reverse of a leg if it brings you back to where you started (or should you? idk it's a weird one)
// leg entrance door should not take you to previous location