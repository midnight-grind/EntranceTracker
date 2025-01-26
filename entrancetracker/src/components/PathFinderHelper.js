import React, { useState } from "react";

export function addToVisitedLegs(currentLocation, nextLeg, visitedLegs, locations)
{
    // const currentVisitedLegs = JSON.parse(JSON.stringify(visitedLegs)); // Deep copy
    const currentVisitedLegs = visitedLegs;
    
    // 1. add current location -> next location direction
    if (!currentVisitedLegs[currentLocation])
        currentVisitedLegs[currentLocation] = [];

    currentVisitedLegs[currentLocation].push(nextLeg);

    // 2. add next location -> current location direction (using opposite entrance and exit doors)
    let reverseCurrentLocation = nextLeg['brings_you_to'];
    let reverseEntranceDoor = "To " + nextLeg['exit_door'].split("From ")[1];
    let reverseExitDoor = "From " + nextLeg['entrance_door'].split("To ")[1];
    // console.log("next leg entrance door:", nextLeg['entrance_door'], " now split:", nextLeg['entrance_door']);
    let reverseLegSearch = {brings_you_to: currentLocation, entrance_door: reverseEntranceDoor, exit_door: reverseExitDoor, condition: '', one_way: ''};

    // search for reverse leg
    // basically, we're checking to make sure the route goes both ways, TODO can be skipped using the one_way column

    // for (const leg of locations[reverseCurrentLocation])
    // {
    //     // console.log("reverse leg: ", reverseLegSearch, " actual leg: ", leg);
    //     if (leg['brings_you_to'] === currentLocation && leg['entrance_door'] === reverseEntranceDoor && leg['exit_door'] === reverseExitDoor)
    //     {
    //         console.log('%cREVERSE LEG FOUND', 'color: orange; font-size: 13px; font-weight: bold;');
    //         if (!currentVisitedLegs[reverseCurrentLocation])
    //             currentVisitedLegs[reverseCurrentLocation] = [];
            
    //         currentVisitedLegs[reverseCurrentLocation].push(leg);
    //     }
    // }

    //////////////

    return currentVisitedLegs; // Return the updated copy
}


/* gets every 1-hop leg between start and end locations
    sometimes multiple loading zones to get to same end from start
    (example you can get directly to Lost Woods from Kokiri Forest through 2 entrances)  */
export function getLegsBetween(coming_from, brings_you_to, locations)
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

export function entranceDoorWasAnExit(coming_from, targetLeg, visitedLegs)
{
    const currentVisitedLegs = JSON.parse(JSON.stringify(visitedLegs)); // Deep copy

    console.log("current visited legs:", targetLeg["entrance_door"], currentVisitedLegs);

    // console.log("current visited legs:");

    for (const location in currentVisitedLegs)
    {
        // console.log("location:", location);
        for (const visitedleg of currentVisitedLegs[location])
        {
            // console.log("visited leg:", visitedLeg);
            // check if target leg entrance door was an exit of a previous leg
            // console.log("leg comparison:", targetLeg['entrance_door'].split('To')[1], visitedleg['exit_door'].split('From')[1]);


            if (targetLeg['entrance_door'].split('To')[1] === visitedleg['exit_door'].split('From')[1])
            {
                // console.log("next leg entrance door matches visited leg exit door:");
                // console.log("entrance door", targetLeg['entrance_door'], "was already once an exit door.", "location:", coming_from);   

                return true;
            }
        }
    }

    return false;
}


// export function entranceDoorWasAnExit(coming_from, targetLeg, visitedLegs)
// {
//     let entranceDoor = targetLeg['entrance']
//     console.log("coming_from", coming_from, ", targetLeg:", targetLeg, ", visitedLegs:", visitedLegs);
//     console.log("entranceDoorWasAnExit coming from " + coming_from + " targetLeg: " + json(targetLeg));

//     let visitedLegList = visitedLegs[coming_from];

//     console.log("1: visitedLegs", visitedLegs);
//     console.log("visitedLegList length:", visitedLegList.length);
    
//     if (visitedLegList === undefined)
//         return false;

//     if (targetLeg === undefined)
//         return false;

//     for (const visitedLeg of visitedLegList)
//     {
//         if (targetLeg["entranceDoor"] === '' && visitedLeg["exitDoor"] === '')
//             return false;

//         console.log(coming_from + " comparison: " + targetLeg["entrance_door"].split("To")[1] + " : " + visitedLeg["exit_door"].split("From")[1]);

//         // printAllExitDoors(visitedLegList);

//         if (targetLeg["entrance_door"].split("To")[1] === visitedLeg["exit_door"].split("From")[1])
//         {
//             console.log("entrance door was a previous exit, cannot continue with this leg");
//             return true;
//         }
//     }

//     console.log("previous door not found, can continue");

//     return false;
// }








// TODO, make sure this includes the inital location
// export function entranceDoorWasAnExit(coming_from, targetLeg, visitedLegs)
// {
//     console.log("coming_from", coming_from, ", targetLeg:", targetLeg, ", visitedLegs:", visitedLegs);
//     console.log("entranceDoorWasAnExit coming from " + coming_from + " targetLeg: " + json(targetLeg));

//     let visitedLegList = visitedLegs[coming_from];

//     console.log("1: visitedLegs", visitedLegs);
//     // console.log("visitedLegList length:", visitedLegList.length);
    
//     if (visitedLegList === undefined)
//         return false;

//     if (targetLeg === undefined)
//         return false;


//     console.log("poop");

//     for (const visitedLeg of visitedLegList)
//     {
//         if (targetLeg["entranceDoor"] === '' && visitedLeg["exitDoor"] === '')
//             return false;

//         console.log(coming_from + " comparison: " + targetLeg["entrance_door"].split("To")[1] + " : " + visitedLeg["exit_door"].split("From")[1]);

//         // printAllExitDoors(visitedLegList);

//         if (targetLeg["entrance_door"].split("To")[1] === visitedLeg["exit_door"].split("From")[1])
//         {
//             console.log("entrance door was a previous exit, cannot continue with this leg");
//             return true;
//         }
//     }

//     console.log("previous door not found, can continue");

//     return false;
// }

export function legVisited(coming_from, targetLeg, visitedLegs)
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
        {
            console.log("leg already visited:", targetLeg);
            return true;
        }
    }

    return false;
}

export function printAllExitDoors(visitedLegs)
{
    console.log("All exit doors: ");
    for (const leg of visitedLegs)
    {
        console.log(leg["exit_door"]);
    }
}

export function printLocations(locations)
{
    for (const location of locations)
    {
        console.log(location);
    }
}

export function printAllLocations(locations)
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

export function printAllLegs(legs)
{
    console.log("printAllLegs:", legs);
}

export function printFinalPaths(finalPaths)
{
    console.log('%c\nFinal Paths\n\n', 'color: blue; font-size: 16px; font-weight: bold;');
    for (const path of finalPaths)
    {
        console.log(path);
    }
}

export function json(jsonObject)
{
    return JSON.stringify(jsonObject, null, 2)
}