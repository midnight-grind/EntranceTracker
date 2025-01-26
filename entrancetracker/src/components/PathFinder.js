import React, { useState } from "react";
import TemplateReader from "./TemplateReader";

import {
    addToVisitedLegs,
    getLegsBetween,
    entranceDoorWasAnExit,
    legVisited,
    printLocations,
    printAllLocations,
    printAllLegs,
    printFinalPaths,
    json
} from "./PathFinderHelper";

function PathFinder()
{
    const [locations, setLocations] = useState({});
    const [startLocationInput, setStartLocationInput] = useState('Kokiri Forest');
    const [endLocationInput, setEndLocationInput] = useState("Lost Woods");

    function handleTemplateUploading(locations)
    {
        setLocations(locations);

        // findPaths("Kokiri Forest", "Lost Woods", locations);
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

        console.log("visitedLegs before recursion:", visitedLegs);

        let iterationCount = 1;
        searchPathsRecursive(startLocation, endLocation, visitedLegs, [], finalPaths, locations, iterationCount);

        printFinalPaths(finalPaths);

        // console.log("visitedLegs: " + json(visitedLegs));
    }

    function searchPathsRecursive(currentLocation, endLocation, visitedLegs, currentPath, finalPaths, locations, iterationCount)
    {
        console.log("\n\nNext Recursion:", iterationCount);
        iterationCount ++;

        // console.log("visitedLegs recursion 1:", visitedLegs);

        let currentPathCopy = [...currentPath];
        // let visitedLegsCopy = JSON.parse(JSON.stringify(visitedLegs)); // deep copy
        let visitedLegsCopy = visitedLegs;


        let legs = locations[currentLocation];
        currentPathCopy.push(currentLocation);

        // console.log("visitedLegs recursion 2:", visitedLegs);
        // console.log("visitedLegs copy:", visitedLegsCopy);

        // console.log("current path: " + currentPathCopy);
        console.log('%c\ncurrent path: ' + currentPathCopy + '\n\n', 'color: red; font-size: 13px; font-weight: bold;');

        if (currentLocation === endLocation)
        {
            // console.log("destination reached\n\n");
            console.log('%cdestination reached at:', 'color: green; font-size: 16px; font-weight: bold;', currentPathCopy + '\n\n');

            finalPaths.push(currentPathCopy);
            return;
        }
        
        // return;

        try {
            if (legs)
            {
                console.log(currentLocation + " all legs 1: ");
                printAllLegs(legs);
                console.log("\n");

                for (const nextLeg of legs)
                {
                    console.log('%c\ncurrent path: ' + currentPathCopy, 'color: purple; font-size: 13px; font-weight: bold;');
                    console.log("checking next", currentLocation + " leg:", nextLeg["brings_you_to"]);


                    if (!legVisited(currentLocation, nextLeg, visitedLegsCopy))
                    // if (!legVisited(currentLocation, nextLeg, visitedLegsCopy))
                    {
                        if (!entranceDoorWasAnExit(currentLocation, nextLeg, visitedLegsCopy))
                        {
                            console.log("need to visit next:", nextLeg);
    
                            console.log("visitedLegs before:", visitedLegsCopy);
                            visitedLegsCopy = addToVisitedLegs(currentLocation, nextLeg, visitedLegsCopy, locations);
                            console.log("visitedLegs after:", visitedLegsCopy);
    
                            // console.log("nextLeg NOT visited\n\n");
                            // console.log("next brings_you_to: ", nextLeg["brings_you_to"]);
                            searchPathsRecursive(nextLeg["brings_you_to"], endLocation, visitedLegsCopy, currentPathCopy, finalPaths, locations, iterationCount);
                        }
                        else
                        {
                            // console.log("entrance door", nextLeg['entrance_door'], "was already once an exit door");        
                        }
                    }
                    else
                    {
                        // console.log("leg already visited");
                    }

                    // break;
    
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    function clearLocations()
    {
        setLocations({});
    }

    function handleClearConsole() {
        console.clear(); // This clears the browser console
    }

    return (
        <div>
            <TemplateReader sendDataToParent={handleTemplateUploading}></TemplateReader><br/>
            <input 
                type="text" 
                value={startLocationInput} 
                onChange={(e) => setStartLocationInput(e.target.value)} 
            /><br/>

            <input 
                type="text" 
                value={endLocationInput} 
                onChange={(e) => setEndLocationInput(e.target.value)} 
            /><br/>


            {/* <input type="text" placeholder="start location" value={startLocationInput}></input><br/> */}
            {/* <input type="text" placeholder="end location" value={endLocationInput}></input><br/> */}
            <button onClick={() => findPaths(startLocationInput, endLocationInput, locations)}> Find Paths </button>
            {/* <button onClick={() => clearLocations()}> Clear Locations </button> */}
            <button onClick={() => handleClearConsole()}> Clear console </button>
        </div>
    );

}

export default PathFinder;


/* notes
 
    - shouldn't traverse the same leg twice
    - shouldn't traverse the reverse of a leg if it brings you back to where you started (or should you? idk it's a weird one)
    - leg entrance door should not take you to previous location
    - we need to have different entranceDoors/exit doors for locations that are in the same loading zone, but some parts of it are
        unreachable due to a condition (such as needing a hookshot to get to the forest temple platform in sacred forest meadow).
        in this example, the rest of sacred forest meadow is available if you loaded in from the fairy grotto, the entrance grotto,
        or from the lost woods. entering from these locations DOES NOT mean every region within the location is accessible, you
        still need the hookshot to get to the forest temple platform. These regions should be treated differently
        - this record keeping is intended to prevent the path finding algorithm from recording paths pointless cycles.
          example: If we're trying to get to Lost Woods from Kokiri Forest, you could do this path:
          Kokiri Forest -> Deku Tree -> Gohma -> Kokiri Forest -> Lost Woods.......Stupid right? We were already at Kokiri Forest,
          we can just go straight to Lost Woods (Kokiri Forest -> Lost Woods). There's a clear cycle there that can be avoided.
          This doesn't stop us from having to do the initial traversal to FIND the cycles within the paths, but the final list of
          viable paths from startLocation to endLocation should NEVER include one of these cycles

    - conditions need to be met in order to traverse leg 
    - need a way to allow for locations that look almost idential. Example grottos might look exactly the same, so how is the
        end-user going to record this information? How will they know the grotto they entered belongs to Death Mountain Crater,
        and not the one in kokiri forest?
    - add multi-player functionality, so everyone can record to the same saved tracker file
 */
