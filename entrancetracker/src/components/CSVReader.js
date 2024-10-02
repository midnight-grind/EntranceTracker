import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CSVReader() {
	const [csvData, setCsvData] = useState([]);
	const [startLocation, setStartLocation] = useState(''); // Initialize start location
	const [endLocation, setEndLocation] = useState('');     // Initialize end location
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

		findPath(startLocation, endLocation);

		console.log("startLocation:", startLocation);
	};


	function findPath(currentLocation, endLocation)
	{
		console.log(locations);
		// console.log(locations.get(currentLocation));
		// let currentLocationObject = locations.get(currentLocation);
		// console.log(currentLocationObject);
	}

	useEffect(() => {
		// console.log(JSON.stringify(csvData, null, 2));
		
		for (let i=0; i < csvData.length; i++)
		{
			if (csvData.length > 0 && csvData[i]["Coming from"])
			{

				if (!locations.has(csvData[i]["Coming from"]))
					locations.set(csvData[i]["Coming from"], []); // add new map key

				const connectingLocations = locations.get(csvData[i]["Coming from"]);

				if (!connectingLocations.includes(csvData[i]["Brings you to"]))
					connectingLocations.push(csvData[i]["Brings you to"]);
				
				locations.set(csvData[i]["Coming from"], connectingLocations);
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