import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CSVReader() {
	const [csvData, setCsvData] = useState([]);
	const [startLocation, setStartLocation] = useState('Gohma'); // Initialize start location
	const [endLocation, setEndLocation] = useState('Deku Tree');     // Initialize end location
	const [locations, setLocations] = useState(new Map());


	// Handle file upload
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			Papa.parse(file, {
				complete: (result) => {
					setCsvData(result.data);
				},
				header: true, // Treat the first row as the header
			});
		}
	};

	const handleClick = () => {
		// Start the search from startLocation and trace to endLocation
		// if (findPath(startLocation, endLocation)) {
		// 	alert(`Path found from ${startLocation} to ${endLocation}`);
		// } else {
		// 	alert(`No path found from ${startLocation} to ${endLocation}`);
		// }

		console.log("\n\n\nend location:", endLocation + '\n\n');
		// console.log("path:", findPath(startLocation, endLocation, []));
    let all_paths = [];
    // console.log("path:", findPath2(startLocation, endLocation, [], all_paths));
		findPath2(startLocation, endLocation, [], all_paths)

		console.log("All Paths:", JSON.stringify(all_paths, null, 2));

		for (let path in all_paths)
		{
			console.log(path);
		}
  };

	function findPath2(current_location, target_location, searched_locations_temp, all_paths) {
    let next_locations = locations.get(current_location) || [];
    let searched_locations_copy = [...searched_locations_temp]; // Make a copy of the array

    searched_locations_copy.push(current_location);

    if (next_locations.includes(target_location)) {
        let path_to_target = [...searched_locations_copy];
        path_to_target.push(target_location);
        all_paths.push(path_to_target);
        // Instead of returning here, let it continue to search for other paths
    }

    for (let next_location of next_locations) {
        // Prevent revisiting locations
        if (!searched_locations_copy.includes(next_location)) {
            findPath2(next_location, target_location, searched_locations_copy, all_paths);
        }
    }
	}




	function findPath(currentLocation, endLocation, searchedLocations)
	{    
		let currentLocationBringsToArray = locations.get(currentLocation);
		// console.log("\ncurrentLocation", currentLocation);
		// console.log("searchedLocations", searchedLocations);
		// console.log("currentLocationBringsToArray", currentLocationBringsToArray);
		
		// console.log("adding " + currentLocation + " to searched locations");
		searchedLocations.push(currentLocation);
    console.log("searched locations: " + searchedLocations);

		// we've arrived at the end location, return each location it took to get here
		// if (currentLocation == endLocation)
		// {
		// 	console.log("reached end location");	
		// 	return searchedLocations;
		// }

    if (currentLocationBringsToArray.includes(endLocation))
    {
      searchedLocations.push(endLocation);
      return searchedLocations;
    }
    
    // console.log("currentLocationBringsToArray length: " + currentLocationBringsToArray.length);

    for (let i=0; i<currentLocationBringsToArray.length; i++)
    {
      // console.log(i);
			let nextLocation = currentLocationBringsToArray[i];

			if (!searchedLocations.includes(nextLocation))
      {
        // console.log("haven't searched " + nextLocation + ", searching now");
      	return findPath(nextLocation, endLocation, searchedLocations);
      }
			else 
				console.log("already visited " + nextLocation);
    }
    
		console.log("currentLocation: " + currentLocation + "brings to:", currentLocationBringsToArray);
	}

	useEffect(() => {
		// console.log(JSON.stringify(csvData, null, 2));
		
		for (let i=0; i < csvData.length; i++)
		{
			let coming_from = csvData[i]["Coming from"];
			let brings_you_to = csvData[i]["Brings you to"];
			
			if (csvData.length > 0 && coming_from)
			{
				if (!locations.has(coming_from))
					locations.set(coming_from, []); // new location found, add to map

				const childLocations = locations.get(coming_from);

				if (!childLocations.includes(brings_you_to))
					childLocations.push(brings_you_to);
				
				locations.set(coming_from, childLocations);
			}


		}
		console.log(locations);
		setLocations(locations);
		
	}, [csvData]);

	const location = {
		name: "",
		connectingLocations: [],
	};

	const doors = {
		location: "",
		entranceDoor: "",
		exitDoor: "",
		oneWay: false,
	}

	return (
		<div>
			{/* Input for uploading CSV */}
			<input type="file" accept=".csv" onChange={handleFileUpload} />

			<br/>
			Start Location &nbsp;
			<input 
				type="text" 
				value={startLocation} 
				onChange={(e) => setStartLocation(e.target.value)} 
			/>
			<br/>
			End Location &nbsp;
			<input 
				type="text" 
				value={endLocation} 
				onChange={(e) => setEndLocation(e.target.value)} 
			/>
			<br/>
			<button onClick={handleClick}> Test </button>
		</div>
	);
}

export default CSVReader;