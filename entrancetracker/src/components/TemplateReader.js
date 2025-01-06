function TemplateReader(props) {
    async function combinedHandler(event) {
        const defaultPaths = await handleTemplateFile(event); // Wait for the file to be processed
        sendDataToParent(defaultPaths);
    }

    function sendDataToParent(defaultPaths) {
        // console.log("default paths:", defaultPaths);
        props.sendDataToParent(defaultPaths);
    }

    function handleTemplateFile(event) {
        return new Promise((resolve) => {
            let tempDefaultPaths = {};

            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const fileContent = e.target.result;

                    const csvLines = fileContent
                        .split("\n")
                        .map((line) => line.trim())
                        .slice(1); // Skips the first row (column titles)

                    for (const path of csvLines) {
                        let pathArray = path.split(",");
                        let coming_from = pathArray[0];

                        let tempPath = {
                            brings_you_to: pathArray[1],
                            entrance_door: pathArray[2],
                            exit_door: pathArray[3],
                            one_way: pathArray[4],
                            condition: pathArray[5],
                            notes: pathArray[6],
                        };

                        if (!(coming_from in tempDefaultPaths)) {
                            tempDefaultPaths[coming_from] = [];
                        }

                        tempDefaultPaths[coming_from].push(tempPath);
                    }

                    resolve(tempDefaultPaths); // Resolve the promise with the processed data
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
