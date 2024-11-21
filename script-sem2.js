const fs = require("fs");
const pdfParse = require("pdf-parse");
const xlsx = require("xlsx");

// --------------------------------

// Test 1:
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-1.pdf";

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-2.pdf"

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-3.pdf"

// Test :
const pdfPath =
  "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-4.pdf";

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-5.pdf"

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-17.pdf"

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-19.pdf"

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2-19.pdf"

// Test :
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-2\\1T00162 - Sem 2.pdf"

// --------------------------------

let extractedJSONData = [];

const sem_1_headers = [
  "Seat No.",
  "Name",
  "PRN",
  "Coll. Code",
  "Coll. Name",
  "Status",
  "Total Marks",
  "Total Marks Objtain",
  "Total Credits",
  "Total CGP",
  "Total GPI",
  // Course 1: MATHEMATICAL FOUNDATION FOR COMP. SC.2
  "C1 Name",
  "C1 Code",
  "C1 S1 The. Total Marks",
  "C1 S1 The. Passing Marks",
  "C1 S1 The. Marks Obtain",
  "C1 S1 The. Grade",
  "C1 S1 Int. Total Marks",
  "C1 S1 Int. Passing Marks",
  "C1 S1 Int. Marks Obtain",
  "C1 S1 Int. Grade",
  "C1 S1 Total Marks Obtain",
  "C1 S1 Credits(C)",
  "C1 S1 Grade (G)",
  "C1 S1 Grade Point (GP)",
  "C1 S1 CGP",
  "C1 S2 Assi. Total Marks",
  "C1 S2 Assi. Passing Marks",
  "C1 S2 Assi. Marks Obtain",
  "C1 S2 C",
  "C1 S2 G",
  "C1 S2 GP",
  "C1 S2 CGP",
  // Course 2: ARTIFICIAL INTELIGENCE AND MACHINE LEARN/MCAL21:LAB
  "C2 Name",
  "C2 Code",
  "C2 S1 The. Total Marks",
  "C2 S1 The. Passing Marks",
  "C2 S1 The. Marks Obtain",
  "C2 S1 The. Grade",
  "C2 S1 Int. Total Marks",
  "C2 S1 Int. Passing Marks",
  "C2 S1 Int. Marks Obtain",
  "C2 S1 Int. Grade",
  "C2 S1 Total Marks Obtain",
  "C2 S1 Credits(C)",
  "C2 S1 Grade (G)",
  "C2 S1 Grade Point (GP)",
  "C2 S1 CGP",
  "C2 S2 Assi. Total Marks",
  "C2 S2 Assi. Passing Marks",
  "C2 S2 Assi. Marks Obtain",
  "C2 S2 Assi. Grade",
  "C2 S2 Prac. Total Marks",
  "C2 S2 Prac. Passing Marks",
  "C2 S2 Prac. Marks Obtain",
  "C2 S2 Prac. Grade",
  "C2 S2 Total Marks Obtain",
  "C2 S2 Credits(C)",
  "C2 S2 Grade (G)",
  "C2 S2 Grade Point (GP)",
  "C2 S2 CGP",
  // Course 3: INFORMATION SECURITY
  "C3 Name",
  "C3 Code",
  "C3 The. Total Marks",
  "C3 The. Passing Marks",
  "C3 The. Marks Obtain",
  "C3 The. Grade",
  "C3 Int. Total Marks",
  "C3 Int. Passing Marks",
  "C3 Int. Marks Obtain",
  "C3 Int. Grade",
  "C3 Total Marks Obtain",
  "C3 Credits(C)",
  "C3 Grade (G)",
  "C3 Grade Point (GP)",
  "C3 CGP",
  // Course 4: Elective 1
  "C4 Name",
  "C4 Code",
  "C4 S1 The. Total Marks",
  "C4 S1 The. Passing Marks",
  "C4 S1 The. Marks Obtain",
  "C4 S1 The. Grade",
  "C4 S1 Int. Total Marks",
  "C4 S1 Int. Passing Marks",
  "C4 S1 Int. Marks Obtain",
  "C4 S1 Int. Grade",
  "C4 S1 Total Marks Obtain",
  "C4 S1 Credits(C)",
  "C4 S1 Grade (G)",
  "C4 S1 Grade Point (GP)",
  "C4 S1 CGP",
  "C4 S2 Assi. Total Marks",
  "C4 S2 Assi. Passing Marks",
  "C4 S2 Assi. Marks Obtain",
  "C4 S2 Assi. Grade",
  "C4 S2 Prac. Total Marks",
  "C4 S2 Prac. Passing Marks",
  "C4 S2 Prac. Marks Obtain",
  "C4 S2 Prac. Grade",
  "C4 S2 Total Marks Obtain",
  "C4 S2 Credits(C)",
  "C4 S2 Grade (G)",
  "C4 S2 Grade Point (GP)",
  "C4 S2 CGP",
  // Course 5: Elective 2
  "C5 Name",
  "C5 Code",
  "C5 S1 The. Total Marks",
  "C5 S1 The. Passing Marks",
  "C5 S1 The. Marks Obtain",
  "C5 S1 The. Grade",
  "C5 S1 Int. Total Marks",
  "C5 S1 Int. Passing Marks",
  "C5 S1 Int. Marks Obtain",
  "C5 S1 Int. Grade",
  "C5 S1 Total Marks Obtain",
  "C5 S1 Credits(C)",
  "C5 S1 Grade (G)",
  "C5 S1 Grade Point (GP)",
  "C5 S1 CGP",
  "C5 S2 Assi. Total Marks",
  "C5 S2 Assi. Passing Marks",
  "C5 S2 Assi. Marks Obtain",
  "C5 S2 C",
  "C5 S2 G",
  "C5 S2 GP",
  "C5 S2 CGP",
  // Course 6: SOFT SKILL DEVELOPMENT LAB
  "C6 Name",
  "C6 Code",
  "C6 Total Marks",
  "C6 Passing Marks",
  "C6 Marks Obtain",
  "C6 Grade",
  "C6 Total Marks Obtain",
  "C6 Credits(C)",
  "C6 Grade (G)",
  "C6 Grade Point (GP)",
  "C6 CGP",
  // Course 7: SKILL BASED LAB COURSE AWT LAB
  "C7 Name",
  "C7 Code",
  "C7 Term Work (TW) Total Marks",
  "C7 T.W. Passing Marks",
  "C7 T.W. Marks Obtain",
  "C7 T.W. Grade",
  "C7 Int. Total Marks",
  "C7 Int. Passing Marks",
  "C7 Int. Marks Obtain",
  "C7 Int. Grade",
  "C7 Total Marks Obtain",
  "C7 Credits(C)",
  "C7 Grade (G)",
  "C7 Grade Point (GP)",
  "C7 CGP",
  // Course 8: MCAL25  SKILL BASED LAB COURSE USER INTERFACE LAB
  "C8 Name",
  "C8 Code",
  "C8 Term Work (TW) Total Marks",
  "C8 T.W. Passing Marks",
  "C8 T.W. Marks Obtain",
  "C8 T.W. Grade",
  "C8 Int. Total Marks",
  "C8 Int. Passing Marks",
  "C8 Int. Marks Obtain",
  "C8 Int. Grade",
  "C8 Total Marks Obtain",
  "C8 Credits(C)",
  "C8 Grade (G)",
  "C8 Grade Point (GP)",
  "C8 CGP",
  // Course 9: SKILL BASED LAB COURSE NETWORKING LIN.LAB
  "C9 Name",
  "C9 Code",
  "C9 Term Work (TW) Total Marks",
  "C9 T.W. Passing Marks",
  "C9 T.W. Marks Obtain",
  "C9 T.W. Grade",
  "C9 Int. Total Marks",
  "C9 Int. Passing Marks",
  "C9 Int. Marks Obtain",
  "C9 Int. Grade",
  "C9 Total Marks Obtain",
  "C9 Credits(C)",
  "C9 Grade (G)",
  "C9 Grade Point (GP)",
  "C9 CGP",
  // Course 10: MINI PROJECT I-B
  "C10 Name",
  "C10 Code",
  "C10 Total Marks",
  "C10 Passing Marks",
  "C10 Marks Obtain",
  "C10 Grade",
  "C10 Total Marks Obtain",
  "C10 Credits(C)",
  "C10 Grade (G)",
  "C10 Grade Point (GP)",
  "C10 CGP",
];

let Sem1_2DArr = [sem_1_headers];

const readPDFText = async (pdfPath) => {
  // Read the PDF file into a buffer
  const pdfBuffer = fs.readFileSync(pdfPath);

  try {
    // Parse the PDF buffer
    const data = await pdfParse(pdfBuffer);

    // The text of the entire PDF (this is one large string)
    const fullText = data.text;

    // Split the text into an array of pages based on page breaks
    const pages = fullText.split("\n\n");

    // Loop through each page
    for (let index = 1; index < pages.length; index++) {
      const pageText = pages[index];

      let extractedData = pageText.split(
        "----------------------------------------------------------------------------------------------------------------------------------"
      );

      // console.log(extractedData);
      processAllStudentsData(extractedData);
    }

    // displayExtractedJSONData();

    // flatAllStudents(extractedJSONData);
    // displayArr();
    // convert2DArrToExcel(Sem1_2DArr);
  } catch (error) {
    console.error("Error reading PDF:", error);
  }
};

function processAllStudentsData(extractedData) {
  const data = extractedData;

  data.splice(0, 3); // Removes the first 3 elements
  data.splice(-3, 3); // Removes the last 3 elements

  // console.log(data);

  if (data.length != 0) {
    // console.log("Array length: " + data.length);

    for (let i of data) {
      // sending data of 1 student at a time
      // console.log(data[i])
      const result = parseCompleteData(i);
      // console.log(result);
      // extractedJSONData.push(result);
    }
  } else {
    console.log("Array is empty !!");
  }
}

function parseCompleteData(rawData) {
  rawData = rawData.split("\n");

  // console.log(rawData);

  function removeIndicesUsingSplice(arr) {
    // Remove the last element
    arr.pop();

    // Remove the 5th last element (if it exists)
    if (arr.length >= 5) {
      // Remove 5th last element
      arr.splice(arr.length - 5, 1);
    }

    // Remove the 0th element from the start
    arr.shift();

    // console.log(arr.length);
    return arr;
  }

  rawData = removeIndicesUsingSplice(rawData);

  console.log(rawData);

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

  if (rawData.length === 9) {
    function extractElectiveInfo(rawString, coursesList) {
      // Define the regex to match the single elective entry
      const regex = /\(ELECTIVE\s\d\s?:\s*(MCAE\d+):([^)]+)\)/;

      const match = regex.exec(rawString); // Find a match

      if (match) {
        const courseCode = match[1].trim(); // Extract the course code
        const courseName = match[2].trim(); // Extract the course name

        // Determine the elective number from the input string
        const electiveNumberMatch = rawString.match(/ELECTIVE\s(\d)/);
        const electiveNumber = electiveNumberMatch ? electiveNumberMatch[1] : 1; // Default to 1 if not found

        // Add the extracted elective to the coursesList
        coursesList[`e${electiveNumber}`] = [courseName, courseCode];
      }
    }
    extractElectiveInfo(rawData[0], coursesList);
    extractElectiveInfo(rawData[1], coursesList);

    console.log(coursesList);
  } else {
    function extractElectivesInfo(rawString, coursesList) {
      // Define the regex to match elective subjects
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
    extractElectivesInfo(rawData[0], coursesList);
    console.log(coursesList);
  }
  // let studentInfo = extractStudentDetails(rawData[0]);
  // let studentStatus = extractStudentStatus(rawData[1]);
  // let studentTotal = extractStudentTotals(rawData[rawData.length - 1]);
  // let courses = extractStudentsMarksForEachCourse([
  //   rawData[1],
  //   rawData[2],
  //   rawData[3],
  // ]);

  // return {
  //   ...studentInfo,
  //   status: studentStatus,
  //   totals: studentTotal,
  //   courses,
  // };
}

readPDFText(pdfPath);
