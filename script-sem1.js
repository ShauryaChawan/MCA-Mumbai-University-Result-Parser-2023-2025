const fs = require("fs");
const pdfParse = require("pdf-parse");

// Test 1: Failed ❌
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\sem-1\\passed-students\\1T00161 - Sem 1-179.pdf";
// Test 2: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\passed-students\\1T00161 - Sem 1-516.pdf";
// Test 3: Passed ✅
const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\passed-students\\1T00161 - Sem 1-518.pdf";
// Test 4: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-400.pdf";
// Test 5: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-402.pdf";
// Test 6: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-403.pdf";
// Test 7: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-406.pdf";
// Test 8: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-414.pdf";
// Test 9: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-515-520.pdf";
// Test 10: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1.pdf";

// Testing sem 1 kt pdf
// Test 11: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1-kt\\1T00161J31 - Sem 1 KT-1.pdf";
// Test 12: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1-kt\\1T00161J31 - Sem 1 KT-2.pdf";
// Test 13: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1-kt\\1T00161J31 - Sem 1 KT-3.pdf";
// Test 14: Passed ✅
// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1-kt\\1T00161J31 - Sem 1 KT.pdf";

// Code - Shaurya

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
    displayExtractedJSONData();
  } catch (error) {
    console.error("Error reading PDF:", error);
  }
};

// Run the function to read and extract text from the PDF
readPDFText(pdfPath);


let extractedJSONData = [];

function processAllStudentsData(extractedData) {
  const data = extractedData;

  data.splice(0, 3); // Removes the first 3 elements
  data.splice(-3, 3); // Removes the last 3 elements

  // console.log(data);

  if (data.length != 0) {
    // console.log("Array length: " + data.length);

    for (let i of data) {
      // sending data of 1 student at a time
      const result = parseCompleteData(i);
      // console.log(result);
      extractedJSONData.push(result);
    }
  } 
  // else {
  //   console.log("Array is empty !!");
  // }
}

const displayExtractedJSONData = () => {
  console.log(extractedJSONData.length);
  // console.log(extractedJSONData);
};

function parseCompleteData(rawData) {
  rawData = rawData.split("\n");

  function removeIndicesUsingSplice(arr, indicesToRemove) {
    // Sort the indices in descending order to avoid shifting issues
    indicesToRemove.sort((a, b) => b - a);

    // Remove elements at the specified indices
    for (let index of indicesToRemove) {
      if (index < arr.length) {
        arr.splice(index, 1);
      }
    }

    return arr;
  }

  let indicesToRemove = [0, 2, 4, 6, 9];

  rawData = removeIndicesUsingSplice(rawData, indicesToRemove);

  let studentInfo = extractStudentDetails(rawData[0]);
  let studentStatus = extractStudentStatus(rawData[1]);
  let studentTotal = extractStudentTotals(rawData[rawData.length - 1]);
  let courses = extractStudentsMarksForEachCourse([
    rawData[1],
    rawData[2],
    rawData[3],
  ]);

  return {
    ...studentInfo,
    status: studentStatus,
    totals: studentTotal,
    courses,
  };
}

function extractStudentDetails(rawLine) {
  rawLine = rawLine.trim();

  // console.log("\"" + rawLine + "\"");

  let seatNo = "";
  let name = "";
  let prn = "";
  let collCode = "";
  let collName = "";

  let index = 0;

  // Step 1: Extract Seat Number
  while (index < rawLine.length && /\d/.test(rawLine[index])) {
    seatNo += rawLine[index];
    index++;
  }

  // Step 2: Skip space and slash to start of Name
  index += 2; // Skip the space and slash

  // Step 3: Extract Name (until two consecutive spaces or end of line)
  while (
    index < rawLine.length &&
    !(rawLine[index] === " " && rawLine[index + 1] === " ")
  ) {
    name += rawLine[index];
    index++;
  }

  // Step 4: Skip the two spaces after the name
  index += 2;
  while (rawLine[index] == " ") {
    index++;
  }
  // Step 5: Extract PRN (16 characters long number)
  prn = rawLine.slice(index, index + 16).trim();
  index += 16;

  while (rawLine[index] == " ") {
    index++;
  }

  // Step 6: Extract College Code and Name
  if (rawLine.slice(index, index + 5) === "COLL ") {
    index += 5; // Skip "COLL "
    const collegeInfo = rawLine.slice(index).trim();
    const collegeParts = collegeInfo.split(":");
    collCode = collegeParts[0].trim();
    collName = collegeParts[1] ? collegeParts[1].trim() : "";
  }

  // Return the extracted details as a JSON object
  return {
    seat_no: seatNo,
    name: name,
    prn: prn,
    coll_code: collCode,
    coll_name: collName,
  };
}

function extractStudentStatus(rawLine) {
  rawLine = rawLine.trim();
  return rawLine[rawLine.length - 1];
}

function extractStudentTotals(rawLine) {
  rawLine = rawLine.trim();

  // Define a regular expression pattern to match the components
  const regex =
    /Total Marks obtained (\d+)\/(\d+)\s+(\d+)\s+(\d+)\s+([\d\.]+|--)/;
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
      total_marks: totalMarks,
      total_marks_obtain: totalMarksObtain,
      total_credits: totalCredits,
      total_cgp: totalCgp,
      gpi: gpi,
    };
  } else {
    // If the pattern doesn't match, return an empty object or handle the error
    return {};
  }
}

function extractStudentsMarksForEachCourse(rawRows) {
  // console.log(rawRows);

  let row1 = rawRows[0].trim();
  let row2 = rawRows[1].trim();
  let row3 = rawRows[2].trim();

  const processRow1_result = processRow1(row1);
  // console.log(processRow1_result);
  const processRow2_result = processRow2(row2);
  // console.log(processRow2_result);
  const processRow3_result = processRow3(row3);
  // console.log(processRow3_result);

  const course_1_2 = mappedArrayToJSONRow1(processRow1_result);
  // console.log(course_1_2);
  const course_3_4 = mappedArrayToJSONRow2(processRow2_result);
  const course_5_6_7 = mappedArrayToJSONRow3(processRow3_result);

  // console.log([...course_1_2, ...course_3_4, ...course_5_6_7]);
  return [...course_1_2, ...course_3_4, ...course_5_6_7];
}

function processRow1(rawInput) {
  // Remove leading/trailing whitespace and normalize spaces
  rawInput = rawInput.trim().replace(/\s{2,}/g, " ");

  // Regex to match entries with formats like '44 (D )', '31F(F )', or '--'
  const regex = /(\w+(?:\(\w\s?\))?)|(--)|\|/g;

  // Match all valid parts and clean up parentheses
  const matches = rawInput.match(regex).map((match) => {
    if (match.includes("(")) {
      // Remove parentheses and spaces inside them
      return [match.split("(")[0], match.match(/\((\w+)/)[1]];
    } else {
      return match === "--" || match === "|" ? match : match.trim();
    }
  });

  // Flatten the result and return
  return matches.flat();
}

function processRow2(rawInput) {
  // Regular expression to match elements based on the pattern
  const regex = /(\d+[A-Z]|\d+|\w|\-\-|\|)/g;

  // Regular expression to handle parenthesis (e.g., (F), (O))
  const parenthesesRegex = /\(([^)]+)\)/g;

  // Replace all parenthesis with their inner text
  const sanitizedInput = rawInput.replace(
    parenthesesRegex,
    (_, group) => ` ${group.trim()} `
  );

  // Match all elements using the regex
  const result = sanitizedInput.match(regex);

  // removing "RCC" or "ABS"
  if (result.length === 38) {
    result.pop();
    result.pop();
    result.pop();
  }
  // Return the array or an empty array if no matches are found
  return result || [];
}

function processRow3(rawInput) {
  // Regular expression to match patterns in the input
  const regex = /(\d+[A-Z]*|\w)\s*\(([A-Z])\)|(\d+[A-Z]*|[A-Z]+)|(--)|\|/g;

  const result = [];
  let match;

  // Iterate through the matches using the regex
  while ((match = regex.exec(rawInput)) !== null) {
    if (match[1] && match[2]) {
      // Match patterns like "48 (O)" or "47E(O)"
      result.push(match[1], match[2]);
    } else if (match[3]) {
      // Match standalone numbers or letters
      result.push(match[3]);
    } else if (match[4]) {
      // Match "--"
      result.push(match[4]);
    } else if (match[0] === "|") {
      // Match "|"
      result.push("|");
    }
  }

  return result;
}

function mappedArrayToJSONRow1(data) {
  // General template for the courses
  const template = [
    {
      course_name: "MATHEMATICAL FOUNDATION FOR COMPUTER SCI",
      course_code: "MCA11",
      section_1: {
        theory_marks: {
          total_marks: "80",
          passing_marks: "36",
          marks_obtain: "",
          grade: "",
        },
        internal_marks: {
          total_marks: "20",
          passing_marks: "9",
          marks_obtain: "",
          grade: "",
        },
        total_marks: "",
        C: "",
        G: "",
        GP: "",
        "C*GP": "",
      },
      section_2: {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: "",
        },
        C: "",
        G: "",
        GP: "",
        "C*GP": "",
      },
    },
    {
      course_name: "ADVANCED JAVA / LAB",
      course_code: "MCA12",
      section_1: {
        theory_marks: {
          total_marks: "80",
          passing_marks: "36",
          marks_obtain: "",
          grade: "",
        },
        internal_marks: {
          total_marks: "20",
          passing_marks: "9",
          marks_obtain: "",
          grade: "",
        },
        total_marks: "",
        C: "",
        G: "",
        GP: "",
        "C*GP": "",
      },
      section_2: {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: "",
          grade: "",
        },
        practical_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: "",
          grade: "",
        },
        total_marks: "",
        C: "",
        G: "",
        GP: "",
        "C*GP": "",
      },
    },
  ];

  // Map the data to the template
  let index = 0;

  // Populate data for the first course
  template[0].section_1.theory_marks.marks_obtain = data[index++];
  template[0].section_1.theory_marks.grade = data[index++];
  template[0].section_1.internal_marks.marks_obtain = data[index++];
  template[0].section_1.internal_marks.grade = data[index++];
  template[0].section_1.total_marks = data[index++];
  template[0].section_1.C = data[index++];
  template[0].section_1.G = data[index++];
  template[0].section_1.GP = data[index++];
  template[0].section_1["C*GP"] = data[index++];
  index++; // Skip the "|"

  template[0].section_2.assignment_marks.marks_obtain = data[index++];
  template[0].section_2.C = data[index++];
  template[0].section_2.G = data[index++];
  template[0].section_2.GP = data[index++];
  template[0].section_2["C*GP"] = data[index++];
  index++; // Skip the "|"

  // Populate data for the second course
  template[1].section_1.theory_marks.marks_obtain = data[index++];
  template[1].section_1.theory_marks.grade = data[index++];
  template[1].section_1.internal_marks.marks_obtain = data[index++];
  template[1].section_1.internal_marks.grade = data[index++];
  template[1].section_1.total_marks = data[index++];
  template[1].section_1.C = data[index++];
  template[1].section_1.G = data[index++];
  template[1].section_1.GP = data[index++];
  template[1].section_1["C*GP"] = data[index++];
  index++; // Skip the "|"

  template[1].section_2.assignment_marks.marks_obtain = data[index++];
  template[1].section_2.assignment_marks.grade = data[index++];
  template[1].section_2.practical_marks.marks_obtain = data[index++];
  template[1].section_2.practical_marks.grade = data[index++];
  template[1].section_2.total_marks = data[index++];
  template[1].section_2.C = data[index++];
  template[1].section_2.G = data[index++];
  template[1].section_2.GP = data[index++];
  template[1].section_2["C*GP"] = data[index++];

  return template;
}

function mappedArrayToJSONRow2(data) {
  return [
    {
      course_name: "ADVANCED DATABASE MANAGEMENT SYSTEM / LAB",
      course_code: "MCA13",
      section_1: {
        theory_marks: {
          total_marks: "80",
          passing_marks: "36",
          marks_obtain: data[0],
          grade: data[1],
        },
        internal_marks: {
          total_marks: "20",
          passing_marks: "11",
          marks_obtain: data[2],
          grade: data[3],
        },
        total_marks: data[4],
        C: data[5],
        G: data[6],
        GP: data[7],
        "C*GP": data[8],
      },
      section_2: {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: data[10],
          grade: data[11],
        },
        practical_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: data[12],
          grade: data[13],
        },
        total_marks: data[14],
        C: data[15],
        G: data[16],
        GP: data[17],
        "C*GP": data[18],
      },
    },
    {
      course_name: "SOFTWARE PROJECT MANAGEMENT",
      course_code: "MCA14",
      section_1: {
        theory_marks: {
          total_marks: "80",
          passing_marks: "36",
          marks_obtain: data[20],
          grade: data[21],
        },
        internal_marks: {
          total_marks: "20",
          passing_marks: "9",
          marks_obtain: data[22],
          grade: data[23],
        },
        total_marks: data[24],
        C: data[25],
        G: data[26],
        GP: data[27],
        "C*GP": data[28],
      },
      section_2: {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: data[30],
        },
        C: data[31],
        G: data[32],
        GP: data[33],
        "C*GP": data[34],
      },
    },
  ];
}

function mappedArrayToJSONRow3(data) {
  return [
    {
      course_name: "DATA STRUCTURE LAB USING C AND/ C++",
      course_code: "MCAL11",
      section_1: {
        term_work_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: data[0],
          grade: data[1],
        },
        internal_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: data[2],
          grade: data[3],
        },
        total_marks: data[4],
        C: data[5],
        G: data[6],
        GP: data[7],
        "C*GP": data[8],
      },
    },
    {
      course_name: "WEB TECHNOLOGIES",
      course_code: "MCAL14",
      section_1: {
        term_work_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: data[10],
          grade: data[11],
        },
        internal_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: data[12],
          grade: data[13],
        },
        total_marks: data[14],
        C: data[15],
        G: data[16],
        GP: data[17],
        "C*GP": data[18],
      },
    },
    {
      course_name: "MINI PROJECT-1A",
      course_code: "MCAP11",
      section_1: {
        total_marks: "50",
        passing_marks: "23",
        marks_obtain: data[20],
        grade: data[21],
        total_marks_obtain: data[22],
        C: data[23],
        G: data[24],
        GP: data[25],
        "C*GP": data[26],
      },
    },
  ];
}
