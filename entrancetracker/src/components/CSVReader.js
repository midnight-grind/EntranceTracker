import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVReader() {
  const [csvData, setCsvData] = useState([]);

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

  return (
    <div>
      {/* <h1>Upload CSV</h1> */}
      {/* Input for uploading CSV */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {/* Display parsed CSV data */}
      <pre>{JSON.stringify(csvData, null, 2)}</pre>
    </div>
  );
}

export default CSVReader;