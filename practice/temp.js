let extractedHeader = {
  course_1: 58,
  course_2: 62,
  course_3: 58,
  course_4: 62,
  course_5: 31,
  course_6: 26,
  course_7: 34,
};

let inputString =
  "44 (D )17 (O ) 61 3  C   7 21|20               1  O  10 10|64 (O )19 (O ) 83 3  O  10 30|23 (O) 42 (O) 65   1  O  10 10\n" +
  "   \n" +
  " 66 (O )17 (O ) 83 3  O  10 30|22 (O)32 (C)  54 1  B   8  8|61 (A )16 (O ) 77 3  A   9 27|16                 1  C   7  7 \n" +
  " \n" +
  " 48 (O )25 (E ) 73 2  B   8 16|38 (A)39 (A)  77 2  A   9 18 |33 (C)        33 1  C   7  7 \n";

// function processData(inputString, extractedHeader) {
//   // Split input string into rows and clean empty rows
//   const rows = inputString
//     .split("\n")
//     .map((row) => row.trim())
//     .filter((row) => row);

//   // Initialize a result object with keys from extractedHeader
//   const result = Object.keys(extractedHeader).reduce((acc, key) => {
//     acc[key] = "";
//     return acc;
//   }, {});

//   let headerIndex = 0;
//   let currentKey = `course_${headerIndex + 1}`;
//   let remainingLength = extractedHeader[currentKey];

//   rows.forEach((row) => {
//     let currentRowIndex = 0;

//     // Process the row while there's data left to distribute
//     while (currentRowIndex < row.length) {
//       if (!currentKey) break; // Stop if no more headers are left

//       const dataChunk = row
//         .slice(currentRowIndex, currentRowIndex + remainingLength)
//         .trim();
//       result[currentKey] += (result[currentKey] ? "|" : "") + dataChunk;

//       currentRowIndex += remainingLength;
//       headerIndex++;

//       // Update the next course key and its length
//       currentKey = `course_${headerIndex + 1}`;
//       remainingLength = extractedHeader[currentKey];
//     }
//   });

//   return result;
// }

function processData(inputString, extractedHeader) {
  // Get lengths from extractedHeader
  const lengths = Object.values(extractedHeader);
  
  // Build a regex dynamically for the required lengths
  const regex = new RegExp(
    lengths.map(length => `(.{1,${length}})`).join("\\s*\\|?\\s*"),
    "g"
  );

  // Initialize a result object
  const result = {};
  Object.keys(extractedHeader).forEach(key => (result[key] = ""));

  // Process inputString with the regex
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    match.slice(1).forEach((chunk, index) => {
      const courseKey = `course_${index + 1}`;
      // Trim the chunk and remove leading "|" if present
      const cleanedChunk = chunk.trim().replace(/^\|/, "");
      result[courseKey] += (result[courseKey] ? "|" : "") + cleanedChunk;
    });
  }

  return result;
}



let temp = processData(inputString, extractedHeader);

console.log(temp);

// expected ouptut
/* {
  course_1: '44 (D )17 (O ) 61 3  C   7 21|20               1  O  10 10',
  course_2: '64 (O )19 (O ) 83 3  O  10 30|23 (O) 42 (O) 65   1  O  10 10',
  course_3: '66 (O )17 (O ) 83 3  O  10 30|22 (O)32 (C)  54 1  B   8  8',
  course_4: '61 (A )16 (O ) 77 3  A   9 27|16                 1  C   7  7',
  course_5: '48 (O )25 (E ) 73 2  B   8 16',
  course_6: '38 (A)39 (A)  77 2  A   9 18',
  course_7: '33 (C)        33 1  C   7  7'
 }
*/
