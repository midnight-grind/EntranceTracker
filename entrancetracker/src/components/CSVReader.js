import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CSVReader() 
{
	const [csvData, setCsvData] = useState([]);
	const [startLocation, setStartLocation] = useState('Gohma'); // Initialize start location
	const [endLocation, setEndLocation] = useState('Deku Tree'); // Initialize end location
	const [locations, setLocations] = useState(new Map());
	const [locations_objects, setLocationsObjects] = useState(new Map());
	const [shortest_path, setShortest_path] = useState([]);
	const [conditions, setConditions] = useState([]);

	// Handle file upload
	const handleFileUpload = (event) => 
	{
		const file = event.target.files[0];
		if (file) 
		{
			Papa.parse(file, {
				complete: (result) => {
					setCsvData(result.data);
				},
				header: true, // Treat the first row as the header
			});
		}
	};

	const handleClick = () => 
	{
		console.log("\n\n\nend location:", endLocation + '\n\n');

		let all_paths = [];
		findPath2(startLocation, endLocation, [], all_paths);

		let all_paths_final = [];

		for (let path of all_paths)
		{
			let final_path = [];
			for (let location of path)
			{
				if (location !== endLocation)
					final_path.push(location);
				else
					break;
			}
			final_path.push(endLocation);
			all_paths_final.push(final_path);
		}

		let shortest = null;  // Declare a local variable to hold the shortest path

		for (let path of all_paths_final)
		{
			if (shortest === null || path.length < shortest.length)
			{
				shortest = path;  // Update the local shortest variable
			}
			console.log(path);  // This logs all paths
		}

		setShortest_path(shortest);  // Only set state once with the final shortest path

		// console.log("all_paths_final:", all_paths_final);
	};


	function findPath2(current_location, target_location, searched_locations_temp, all_paths) 
	{
		let next_locations = locations.get(current_location) || [];
		let searched_locations_copy = [...searched_locations_temp]; // Make a copy of the array

		searched_locations_copy.push(current_location);

		if (next_locations.includes(target_location)) 
		{
			let path_to_target = [...searched_locations_copy];
			path_to_target.push(target_location);
			all_paths.push(path_to_target);
		}

		for (let next_location of next_locations)
		{
			// Prevent revisiting locations
			if (!searched_locations_copy.includes(next_location))
				findPath2(next_location, target_location, searched_locations_copy, all_paths);
		}
	}

	function get_doors(start_location, end_location)
	{
		for (let end_locations of locations_objects.get(start_location))
		{

		}
	}

	function get_all_conditionals(newLocationsObjects)
	{
		console.log("get all conditions");
		for (let value of newLocationsObjects.values())
		{
			console.log(value);
		}
	}

	function condition_met()
	{

		return true;
	}

	// Effect to log the updated shortest path when it's updated
	useEffect(() => 
	{
		if (shortest_path.length > 0)
		{
			console.log("Updated shortest path:", shortest_path);

			let final_route = [];
			// for (let i=0; i<shortest_path.length-1; i++)
			// {
			// 	final_route.push(get_doors(shortest_path[i], shortest_path[i+1]));
			// }
		}
	}, [shortest_path]);  // This effect will run whenever `shortest_path` is updated
	

	useEffect(() => 
		{
			let newLocations = new Map(locations); // Clone the locations map to avoid direct mutation
			let newLocationsObjects = new Map(locations_objects); // Clone the locations_objects map
		
			// Populate the locations map from CSV data
			for (let i = 0; i < csvData.length; i++)
			{
				let coming_from = csvData[i]["Coming from"];
				let brings_you_to = csvData[i]["Brings you to"];
				let entrance_door = csvData[i]["Entrance Door"];
				let exit_door = csvData[i]["Exit Door"];
				let condition = csvData[i]["Condition"];
				
				if (csvData.length > 0 && coming_from)
				{
					if (!newLocations.has(coming_from))
					{
						newLocations.set(coming_from, []); // new location found, add to map
					}
		
					if (!newLocationsObjects.has(coming_from))
					{
						newLocationsObjects.set(coming_from, []); // new location object found
					}
		
					const child_locations_names = newLocations.get(coming_from);
					const child_locations_objects = newLocationsObjects.get(coming_from);
		
					if (!child_locations_names.includes(brings_you_to))
					{
						child_locations_names.push(brings_you_to);
		
						child_locations_objects.push({
							"brings you to": brings_you_to,
							"entrance door": entrance_door,
							"exit door": exit_door,
							"condition": condition
						});
					}
		
					// Update maps with new arrays
					newLocations.set(coming_from, child_locations_names);
					newLocationsObjects.set(coming_from, child_locations_objects);
				}
			}
		
			// Update the state with the modified maps
			setLocations(newLocations);
			setLocationsObjects(newLocationsObjects);
		
			// console.log(newLocations);
			console.log(newLocationsObjects);
			get_all_conditionals(newLocationsObjects);
		}, [csvData]);
		

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

			<br/>
			{shortest_path}
		</div>
	);
}

export default CSVReader;