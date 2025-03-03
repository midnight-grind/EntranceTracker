import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import Switch from '@mui/material/Switch';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';


import UploadIcon from '@mui/icons-material/Upload'; // If using Material-UI icons
import ComingFromBringsYouTo from './ComingFromBringsYouTo';
import InfoIcon from '@mui/icons-material/Info';
import UnexploredCheckmarks from './UnexploredCheckmarks';
import LocationDropdown from './LocationDropdown';
import ShortestPath from './ShortestPath';

function CSVReader() 
{
	const [csvData, setCsvData] = useState([]);
	const [startLocation, setStartLocation] = useState('Gohma'); // Initialize start location
	const [endLocation, setEndLocation] = useState('Deku Tree'); // Initialize end location
	const [locations, setLocations] = useState(new Map());
	const [locations_objects, setLocationsObjects] = useState(new Map());
	const [shortest_path, setShortest_path] = useState([]);
	const [conditions, setConditions] = useState([]);
	const [final_conditions, setFinalConditions] = useState({});
	const [shortestPathButtonVisible, setShortestPathButtonVisible] = useState(false);

	// Handle file upload
	const handleFileUpload = (event) => {
		reset();
		const file = event.target.files[0];
		if (file) {
			Papa.parse(file, {
				complete: (result) => {
					console.log("CSV Parsing Result:", result.data);
					setCsvData(result.data);
				},
				header: true,
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

		console.log("all_paths_final: " + all_paths_final);

		let shortest = null;  // Declare a local variable to hold the shortest path
		for (let path of all_paths_final)
		{
			if (shortest === null || path.length < shortest.length)
			{
				shortest = "";
				for (let i=0; i<path.length; i++)
				{
					shortest += path[i];
					if (i != path.length-1)
						shortest += " -> ";

					console.log("path location: " + path[i]);
				}

				// shortest = path;  // Update the local shortest variable
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

	function isValidPath(path)
	{
		let condition_list = [];

		// needs to meet all specified conditions
		for (let i=0; i<path.length-1; i++)
		{

			console.log("path location: " + path[i]);
		}

	}

	function get_doors(start_location, end_location)
	{
		for (let end_locations of locations_objects.get(start_location))
		{

		}
	}

	const locationNames = useMemo(() => {
		let ret = [];
		for (let [key] of locations) {
			ret.push(key);
		}
		return ret;
	}, [locations]);
	

	function get_all_conditionals(newLocationsObjects)
	{
		// console.log("get all conditions");

		let all_conditionals = {};
		let all_conditionals_with_arrays = {};
		
		for (let [key, value] of newLocationsObjects)
		{
			for (let obj of value)
			{
				if (obj["condition"] != "")
				{
					let conditions_separated = obj["condition"].replaceAll("(", " ").replaceAll(")", " ").replaceAll("&&", " ").replaceAll("||", " ");
					conditions_separated = conditions_separated.replaceAll(/\s+/g, ' ');
					// console.log(conditions_separated);

					for (let condition_separated of conditions_separated.split(" "))
					{
						if (condition_separated != " " && condition_separated != "")
						{
							all_conditionals[condition_separated] = "";
						}
					}
				}
			}
		}

		// console.log(all_conditionals);
		for (let [key, value] of Object.entries(all_conditionals))
		{
			// console.log(key);

			// key looks like: Song_of_Storms, child-0


			let last_index = key.length - 1;
			let last_char = key[last_index];

			// console.log("key : " + key + " last index: " + last_index + " last char: " + last_char);

			// conditional belongs to an array, last character is a number
			if (!isNaN(last_char))
			{
				// console.log("last character of " + key + " is numerical: " + last_char);
				if (!all_conditionals_with_arrays.hasOwnProperty(last_char)) // condition set not already set
				{
					all_conditionals_with_arrays[last_char] = {
						condition_list : [key],
						active_condition : "none",
						checked : false
					};
				}
				else
				{
					all_conditionals_with_arrays[last_char].condition_list.push(key);
				}
			}
		}

		for (let [key, value] of Object.entries(all_conditionals))
		{
			// console.log(key);

			// key looks like: Song_of_Storms, child-0


			let last_index = key.length - 1;
			let last_char = key[last_index];

			// console.log("key : " + key + " last index: " + last_index + " last char: " + last_char);

			// only one conditional on its own
			if (isNaN(last_char))
			{
				let max = -1;

				for (let [key, value] of Object.entries(all_conditionals_with_arrays))
				{
					if (Number(key) > max)
						max = Number(key);  // Make sure to compare numerical values
				}

				all_conditionals_with_arrays[max + 1] = {
					condition_list : [key],
					active_condition : "none", // TODO this should start off as false
					checked : false
				};
			}
		}

		// console.log("all_conditionals: " + all_conditionals_with_arrays);
		// console.log("Formatted all_conditionals_with_arrays:", JSON.stringify(all_conditionals_with_arrays, null, 2));

		// only two options, default to first option, if more than two: keep it "none" until condition is selected
		for (let [key, value] of Object.entries(all_conditionals_with_arrays))
		{
			if (all_conditionals_with_arrays[key]["condition_list"].length == 2)
			{
				// console.log("2 elements, key: " + key);
				all_conditionals_with_arrays[key]["active_condition"] = all_conditionals_with_arrays[key]["condition_list"][0];
			}
		}


		setFinalConditions(all_conditionals_with_arrays);

		return all_conditionals_with_arrays;
	}

	function switch_pressed(key)
	{
		// console.log("switch pressed", final_conditions[key]);

		// Create a shallow copy of final_conditions
		const updatedConditions = { ...final_conditions };

		// Toggle the checked state
		updatedConditions[key]["checked"] = !updatedConditions[key]["checked"];

		// one condition
		if (updatedConditions[key]["condition_list"].length == 1)
		{
			console.log("updatedConditions[key][\"condition_list\"][0] : " + updatedConditions[key]["condition_list"][0]);
			console.log("updatedConditions[key][\"active_condition\"] : " + updatedConditions[key]["active_condition"]);

			if (updatedConditions[key]["active_condition"] === "none")
			{
				updatedConditions[key]["active_condition"] = updatedConditions[key]["condition_list"][0];
			}
			else
			{
				updatedConditions[key]["active_condition"] = "none";
			}

			console.log("condition list only 1, active condition: ", updatedConditions[key]["active_condition"]);
		}
		
		// two conditions
		else if (updatedConditions[key]["condition_list"].length == 2)
		{
			if (updatedConditions[key]["active_condition"] === updatedConditions[key]["condition_list"][0])
			{
				updatedConditions[key]["active_condition"] = updatedConditions[key]["condition_list"][1];
			}
			else if (updatedConditions[key]["active_condition"] === updatedConditions[key]["condition_list"][1])
			{
				updatedConditions[key]["active_condition"] = updatedConditions[key]["condition_list"][0];
			}
			else if (updatedConditions[key]["active_condition"] === "none")
			{
				updatedConditions[key]["active_condition"] = updatedConditions[key]["condition_list"][0];
			}

			console.log("condition list 2, active condition: ", updatedConditions[key]["active_condition"]);
		}

		// more than two conditions
		else if (updatedConditions[key]["condition_list"].length > 2)
			console.log("condition list greater than 2");
		
		// Update the state to trigger a re-render
		setFinalConditions(updatedConditions);
	}

	function isChecked(key)
	{
		return final_conditions[key]?.checked || false;
	}
	

	function selectMultiCondition(key, condition)
	{
		// Create a shallow copy of final_conditions
		const updatedConditions = { ...final_conditions };
		
		// Toggle the checked state
		updatedConditions[key]["active_condition"] = condition;
		
		// Update the state to trigger a re-render
		setFinalConditions(updatedConditions);

		console.log("select multi condition key: " + key + ", condition: " + condition);
	}

	function display_conditions()
	{
		let ret = [];
		let key_index = 1;

		for (let [key, value] of Object.entries(final_conditions))
		{
			let checked = true;
			if (value["condition_list"].length === 1) // single condition, true or false
			{
				ret.push(
				  <div key={key} style={{ textAlign: 'left', fontSize: '16px' }}>
					{/* {key}&nbsp; */}
					{value["condition_list"][0].replaceAll("_", " ") + ": "}
					<Switch checked={isChecked(key)} onChange={() => switch_pressed(key)}/>
					<hr style={{ width: '50%', marginLeft: '0' }}/>
				  </div>
				);

				key_index ++;
			}
			else if (value["condition_list"].length === 2) // two conditions, one or the other
			{
				ret.push(
				  <div key={key}>
					{/* {key}&nbsp; */}
					<div style={{ textAlign: 'left', fontSize: '16px' }}>
						{value["condition_list"][0].split("-" + key)[0].replaceAll("_", " ") + " "}
						<Switch checked={value["checked"]} onChange={() => switch_pressed(key)}/>
						{value["condition_list"][1].split("-" + key)[0].replaceAll("_", " ") + " "}
					</div>
					<hr style={{ width: '50%', marginLeft: '0' }}/>
				  </div>
				);

				key_index ++;
			}
			else if (value["condition_list"].length > 2) // three or more conditions, choose one of them
			{
				ret.push
				(
					<div>
						<RadioGroup key={key} name="simple-radio-group" style={{ textAlign: 'left', fontSize: '16px' }}>
							{/* {key}&nbsp; */}
							{value["condition_list"].map((condition) => (
							<FormControlLabel key={condition} value={condition} onChange={() => selectMultiCondition(key, condition)} control={<Radio />} label={condition.split("-" + key)[0].replaceAll("_", " ")} />
							))}
						</RadioGroup>
						<hr style={{ width: '50%', marginLeft: '0' }}/>
					</div>
				);
				key_index++;
			}
			// ret += <Switch checked='true' onChange={handleSwitchChange(index)} inputProps={{ 'aria-label': 'controlled' }}/>;
		}

		// final_conditions
		return ret;
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
	

	// useEffect(() => 
	// {
	// 	let newLocations = new Map(locations); // Clone the locations map to avoid direct mutation
	// 	let newLocationsObjects = new Map(locations_objects); // Clone the locations_objects map
	
	// 	// Populate the locations map from CSV data
	// 	for (let i = 0; i < csvData.length; i++)
	// 	{
	// 		let coming_from = csvData[i]["Coming from"];
	// 		let brings_you_to = csvData[i]["Brings you to"];
	// 		let entrance_door = csvData[i]["Entrance Door"];
	// 		let exit_door = csvData[i]["Exit Door"];
	// 		let condition = csvData[i]["Condition"];
			
	// 		if (csvData.length > 0 && coming_from)
	// 		{
	// 			if (!newLocations.has(coming_from))
	// 			{
	// 				newLocations.set(coming_from, []); // new location found, add to map
	// 			}
	
	// 			if (!newLocationsObjects.has(coming_from))
	// 			{
	// 				newLocationsObjects.set(coming_from, []); // new location object found
	// 			}
	
	// 			const child_locations_names = newLocations.get(coming_from);
	// 			const child_locations_objects = newLocationsObjects.get(coming_from);
	
	// 			if (!child_locations_names.includes(brings_you_to))
	// 			{
	// 				child_locations_names.push(brings_you_to);
	
	// 				child_locations_objects.push({
	// 					"brings you to": brings_you_to,
	// 					"entrance door": entrance_door,
	// 					"exit door": exit_door,
	// 					"condition": condition
	// 				});
	// 			}
	
	// 			// Update maps with new arrays
	// 			newLocations.set(coming_from, child_locations_names);
	// 			newLocationsObjects.set(coming_from, child_locations_objects);
	// 		}
	// 	}
	
	// 	// Update the state with the modified maps
	// 	setLocations(newLocations);
	// 	setLocationsObjects(newLocationsObjects);
	
	// 	// console.log(newLocations);
	// 	console.log("All locations:\n");
	// 	console.log(newLocationsObjects);
	// 	get_all_conditionals(newLocationsObjects);
	// }, [csvData]);

	useEffect(() => {
		const newLocations = new Map();
		const newLocationsObjects = new Map();
	
		csvData.forEach((row) => {
			const coming_from = row["Coming from"];
			const brings_you_to = row["Brings you to"];
			if (coming_from && brings_you_to) {
				if (!newLocations.has(coming_from)) {
					newLocations.set(coming_from, []);
				}
				if (!newLocationsObjects.has(coming_from)) {
					newLocationsObjects.set(coming_from, []);
				}
	
				newLocations.get(coming_from).push(brings_you_to);
				newLocationsObjects.get(coming_from).push({
					brings_you_to,
					entrance_door: row["Entrance Door"],
					exit_door: row["Exit Door"],
					condition: row["Condition"],
				});
			}
		});
	
		setLocations(newLocations);
		setLocationsObjects(newLocationsObjects);
	
		// Invoke get_all_conditionals after updating locationsObjects
		const conditions = get_all_conditionals(newLocationsObjects);
		setFinalConditions(conditions);
	
		console.log("Updated locations and locations_objects:", newLocations, newLocationsObjects);
	}, [csvData]);
	
	
	
	

	function updateShortestPathButton()
	{
		if (startLocation != "" && endLocation != "")
		{
			setShortestPathButtonVisible(true);
		}
	}

	function reset()
	{
		setCsvData([]);
		setStartLocation('Gohma');
		setEndLocation('Deku Tree');
		setLocations(new Map());
		setLocationsObjects(new Map());
		setShortest_path([]);
		setConditions([]);
		setFinalConditions({}); // Clear final_conditions
		setShortestPathButtonVisible(false);
	}
	


	
	const fileInputRef = React.useRef();

	const handleIconClick = () => {
	  fileInputRef.current.click(); // Triggers the hidden file input
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
			<div style={{ flex: '1', marginRight: '20px' }}>
				{/* Input for uploading CSV */}

				<input
					type="file"
					accept=".csv"
					onChange={(event) => {
						handleFileUpload(event);
						updateShortestPathButton(event);
					}}
					ref={fileInputRef}
					style={{ display: 'none' }}
				/>
				
				<div style={{ textAlign: 'left'}}>
					<Button variant="outlined" sx={{ color: '#FF6B6B', borderColor: '#FF6B6B' }} onClick={reset}>Reset</Button>
				</div>

				<br/>
				<div style={{ textAlign: 'left'}}>
					<div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Upload Entrance Template File</div>
					<button onClick={handleIconClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
						<UploadIcon style={{ fontSize: '24px', color: '#000' }} /> {/* Customize size and color */}
					</button>
				</div>




				<div style={{ textAlign: 'left'}}>
					<br/>
					<div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Start Location</div> &nbsp;
					<input 
						type="text" 
						value={startLocation} 
						onChange={(e) => setStartLocation(e.target.value)} 
					/>
					
					{/* <LocationDropdown locations={get_location_names()}></LocationDropdown> */}
					<LocationDropdown locations={locationNames}></LocationDropdown>


					<br/>
					<div style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}> End Location </div> &nbsp;
					<input 
						type="text" 
						value={endLocation} 
						onChange={(e) => setEndLocation(e.target.value)} 
					/>
					<br/>
					<div>
						{shortestPathButtonVisible && (
							<button onClick={handleClick}>Find Shortest Path</button>
						)}
					</div>
				</div>

				<div>
					{/* {JSON.stringify(final_conditions)} */}
					<h4 style={{ textAlign: 'left', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Game State</h4>
					<div style={{ fontSize: '14px', marginTop: '-40px', marginBottom: '50px' }}>
						<em>Determines what conditions need to pass for an entrance door to be unlocked</em>&nbsp;&nbsp;&nbsp;
						
						<Tooltip title="If a player randomly exits through a door and can immediately re-enter it, entry conditions may no longer apply,
						as a valid path has been found.">
							<InfoIcon
								style={{
									fontSize: '30px', // Adjust the size of the icon
									color: '#FF6B6B',    // Change the color of the icon
								}}
							/>
						</Tooltip>

					</div>
				</div>
				
				<div style={{ overflow: 'auto', maxHeight: '800px' }}>
					{display_conditions()}
				</div><br></br>
				

			</div>

			<div style={{ width: '2px', height: '100vh', backgroundColor: 'light-gray', marginLeft: '30px', boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.7)'}}></div>

			<div style={{ flex: '0 0 auto', textAlign: 'middle', marginLeft: '50px'}}>
				{/* <ComingFromBringsYouTo locations={['1','e']}></ComingFromBringsYouTo><br></br> */}

				<em style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Shortest Path</em><br/><br/>
				{/* <div style={{color: '#6BCB77', textShadow: '2px 20px 20px rgba(0, 0, 0, 0.5)' }}>  */}
					<ShortestPath text={shortest_path} color="#6BCB77"> </ShortestPath> 
				{/* </div> */}

				<br></br><br></br><br></br>

				<em style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Randomized Entrances</em> &nbsp;
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center', // Horizontal alignment
						alignItems: 'center', // Vertical alignment
						flexWrap: 'wrap',
						'& > :not(style)': {
						m: 1, // Margin
						width: 700,
						},
					}}
					>
					<Paper
						elevation={24}
						sx={{
						backgroundColor: '#444',
						padding: 2, // Add padding inside the Paper for spacing
						}}
					>
						{/* <ComingFromBringsYouTo locations={get_location_names()}></ComingFromBringsYouTo> */}
						{/* <ComingFromBringsYouTo locations={locationNames} locationsObjects={locations_objects}></ComingFromBringsYouTo> */}

						<ComingFromBringsYouTo
							locations={Array.from(locations.keys())}
							locationsObjects={Object.fromEntries(locations_objects)}
						/>


					</Paper>
				</Box>

				<br/><br/>

				{/* <em style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Unexplored Entrances</em> &nbsp;
				<UnexploredCheckmarks numUnavailable={2} numAvailable={1}></UnexploredCheckmarks>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center', // Horizontal alignment
						alignItems: 'center', // Vertical alignment
						flexWrap: 'wrap',
						'& > :not(style)': {
						m: 1, // Margin
						width: 700,
						},
					}}
					>
					<Paper
						elevation={24}
						sx={{
						backgroundColor: '#444',
						padding: 2, // Add padding inside the Paper for spacing
						}}
					>
						<ComingFromBringsYouTo locations={get_location_names()}></ComingFromBringsYouTo>
					</Paper>
				</Box> */}


				<br/><br/>

				<em style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Vanilla Entrances</em> &nbsp;
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center', // Horizontal alignment
						alignItems: 'center', // Vertical alignment
						flexWrap: 'wrap',
						'& > :not(style)': {
						m: 1, // Margin
						width: 700,
						},
					}}
					>
					<Paper
						elevation={24}
						sx={{
						backgroundColor: '#444',
						padding: 2, // Add padding inside the Paper for spacing
						}}
					>
						{/* <ComingFromBringsYouTo locations={locationNames} locationsObjects={locations_objects}></ComingFromBringsYouTo> */}

						<ComingFromBringsYouTo
							locations={Array.from(locations.keys())}
							locationsObjects={Object.fromEntries(locations_objects)}
						/>
					</Paper>
				</Box>
			</div>


			<div style={{ width: '2px', height: '100vh', backgroundColor: 'light-gray', marginLeft: '30px', boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.7)'}}></div>



		</div>
	);
}

export default CSVReader;