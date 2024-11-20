function extractMarksDetails(rawLine) {
  // Define a regular expression pattern to match the components
  const regex = /Total Marks obtained (\d+)\/(\d+)\s+(\d+)\s+(\d+)\s+([\d\.]+|--)/;
  const match = rawLine.match(regex);

  if (match) {
      // Extract the values using the matched groups
      const totalMarksObtain = match[1];
      const totalMarks = match[2];
      const totalCredits = match[3];
      const totalCgp = match[4];
      let gpi = match[5];

      // Return the extracted data as a JSON object
      return {
          "total_marks": totalMarks,
          "total_marks_obtain": totalMarksObtain,
          "total_credits": totalCredits,
          "total_cgp": totalCgp,
          "gpi": gpi
      };
  } else {
      // If the pattern doesn't match, return an empty object or handle the error
      return {};
  }
}

// Example usage
const rawLine1 = "Total Marks obtained 642/850           21 184  8.76";
const rawLine2 = "Total Marks obtained 559/850           15 120 --";
const rawLine3 = "Total Marks obtained 0/850              0   0 --";

console.log(extractMarksDetails(rawLine1));
console.log(extractMarksDetails(rawLine2));
console.log(extractMarksDetails(rawLine3));
