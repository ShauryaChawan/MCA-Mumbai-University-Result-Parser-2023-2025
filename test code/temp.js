function processData(rawData) {
  let coursesList = {
    c1: ["MATHEMATICAL FOUNDATION FOR COMP. SC.2", "MCA21"],
    c2: ["ARTIFICIAL INTELIGENCE AND MACHINE LEARN/MCAL21:LAB", "MCA22"],
    c3: ["INFORMATION SECURITY", "MCA23"],
    c6: ["SOFT SKILL DEVELOPMENT LAB", "MCAL22"],
    c7: ["S.B.L.C. AWT LAB", "MCAL24"],
    c8: ["S.B.L.C. USER INTERFACE LAB", "MCAL25"],
    c9: ["S.B.L.C. NETWORKING LIN.LAB", "MCAL26"],
    c10: ["MINI PROJECT I-B", "MCAP21"],
  };

  function extractElectiveInfo(rawData, coursesList) {
    // Define the regex to match the single elective entry

    if (typeof rawData === "string") {
      const regex = /\(ELECTIVE\s\d\s?:\s*(MCAE\d+):([^)]+)\)/;
      const match = regex.exec(rawData); // Find a match

      if (match) {
        const courseCode = match[1].trim(); // Extract the course code
        const courseName = match[2].trim(); // Extract the course name

        // Determine the elective number from the input string
        const electiveNumberMatch = rawData.match(/ELECTIVE\s(\d)/);
        const electiveNumber = electiveNumberMatch ? electiveNumberMatch[1] : 1; // Default to 1 if not found

        // Add the extracted elective to the coursesList
        coursesList[`e${electiveNumber}`] = [courseName, courseCode];
      }
    } else if (Array.isArray(rawData) && rawData.length === 2) {
      const regex = /\(ELECTIVE\s\d\s?:\s*(MCAE\d+):([^)]+)\)/g;

      let match;
      let electiveCounter = 1;

      // Loop through all matches in the raw string
      while ((match = regex.exec(rawString)) !== null) {
        const courseCode = match[1].trim(); // Extract the course code
        const courseName = match[2].trim(); // Extract the course name

        // Add the extracted elective to the coursesList
        coursesList[`e${electiveCounter}`] = [courseName, courseCode];
        electiveCounter++;
      }
    }
  }
  if (rawData.length === 9) {
    extractElectiveInfo(rawData[0], coursesList);
    extractElectiveInfo(rawData[1], coursesList);

    console.log(coursesList);
  } else {
    extractElectiveInfo(rawData[0], coursesList);
    console.log(coursesList);
  }
}

// Example usage
let rawData = [
  "(ELECTIVE 1:MCAE243:ROBOTIC PROCESS AUTOMATION)/MCALE233:LAB",
  "(ELECTIVE 2 :MCAE251:NATURAL LANGUAGE PROCESSING)",
];

const s1 = "(ELECTIVE 1:MCAE243:ROBOTIC PROCESS AUTOMATION)/MCALE233:LAB";
const s2 = "(ELECTIVE 2 :MCAE251:NATURAL LANGUAGE PROCESSING)";
const s3 = "(ELECTIVE 1:MCAE244:COMPUTER VISION)/MCALE234:LAB ";

// Example inputs:

console.log(coursesList);
