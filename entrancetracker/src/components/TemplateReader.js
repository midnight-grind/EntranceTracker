/* handles loading the default locations of a game with their legs to other locations
    a leg is the direct path between two locations
    
    structure:
    locations = {
        "coming_from" : [
            [brings_you_to : '', entrance_door : '', exit_door : '', condition : '', notes : '']
        ]
    }

    example:
    locations = {
        "Kokiri Forest" : [
            [brings_you_to : 'Lost Woods', entrance_door : 'To Lost Woods', exit_door : 'From Kokiri Forest', condition : '', notes : ''],
            [brings_you_to : 'Lost Woods', entrance_door : 'To Lost Woods Bridge', exit_door : 'From Kokiri Forest', condition : 'Kokiri_Emerald', notes : '']
        ]
    }
*/


function TemplateReader(props) {
    async function combinedHandler(event) {
        const locations = await handleTemplateFile(event); // Wait for the file to be processed
        sendDataToParent(locations);
    }

    function sendDataToParent(locations) {
        // console.log("default paths:", locations);
        props.sendDataToParent(locations);
    }

    function handleTemplateFile(event) {
        return new Promise((resolve) => {
            let tempLocations = {};

            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const fileContent = e.target.result;

                    const csvLines = fileContent
                        .split("\n")
                        .map((line) => line.trim())
                        .slice(1); // Skips the first row (column titles)

                    for (const legEntry of csvLines) {
                        let leg = legEntry.split(",");
                        
                        let tempPath = {
                            brings_you_to: leg[1],
                            entrance_door: leg[2],
                            exit_door: leg[3],
                            one_way: leg[4],
                            condition: leg[5],
                            notes: leg[6],
                        };
                        
                        let coming_from = leg[0];
                        if (!(coming_from in tempLocations)) {
                            tempLocations[coming_from] = [];
                        }

                        tempLocations[coming_from].push(tempPath);
                    }

                    resolve(tempLocations); // Resolve the promise with the processed data
                };

                reader.readAsText(file);
            }
        });
    }

    return (
        <div>
            <h1>CSV Reader</h1>
            <input type="file" accept=".csv" onChange={combinedHandler} />
        </div>
    );
}

export default TemplateReader;