const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync(
  "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\passed-students\\1T00161 - Sem 1-518.pdf"
);

pdf(dataBuffer)
  .then(function (data) {
    extractedData = data.text.split(
      "----------------------------------------------------------------------------------------------------------------------------------"
    );

    // console.log(extractedData);
    processAllStudentsData(extractedData);
  })
  .catch(function (error) {
    console.log(error + "Couldn't read the pdf !!");
  });

let extractedCoursesMaxLength = {
  // <subject code>: [<max length>, <delimiter>]
  MCA11: [58, "|"],
  MCA12: [62, "\n"],
  MCA13: [58, "|"],
  MCA14: [62, "\n"],
  MCAL11: [31, "|"],
  MCAL14: [26, "|"],
  MCAP11: [34, "\n"],
};

let students_data_sem_1_layout = [
  {
    seat_no: "",
    name: "",
    prn: "",
    coll_code: "",
    coll_name: "",
    status: "",
    totals: {
      total_marks: "850",
      total_marks_obtain: "",
      total_credits: "",
      total_cgp: "",
      gpi: "",
    },
    courses: [
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
          total_marks_obtain: "",
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
          total_marks_obtain: "",
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
          total_marks_obtain: "",
          C: "",
          G: "",
          GP: "",
          "C*GP": "",
        },
      },
      {
        course_name: "ADVANCED DATABASE MANAGEMENT SYSTEM / LAB",
        course_code: "MCA13",

        section_1: {
          theory_marks: {
            total_marks: "80",
            passing_marks: "36",
            marks_obtain: "",
            grade: "",
          },
          internal_marks: {
            total_marks: "20",
            passing_marks: "11",
            marks_obtain: "",
            grade: "",
          },
          total_marks_obtain: "",
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
          total_marks_obtain: "",
          C: "",
          G: "",
          GP: "",
          "C*GP": "",
        },
      },
      {
        course_name: "SOFTWARE PROJECT MANAGEMENT",
        course_code: "MCA14",
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
          total_marks_obtain: "",
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
        course_name: "DATA STRUCTURE LAB USING C AND/ C++",
        course_code: "MCAL11",
        section_1: {
          term_work_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "",
            grade: "",
          },
          internal_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "",
            grade: "",
          },
          total_marks_obtain: "",
          C: "",
          G: "",
          GP: "",
          "C*GP": "",
        },
      },
      {
        course_name: "WEB TECHNOLOGIES",
        course_code: "MCAL14",
        section_1: {
          term_work_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "",
            grade: "",
          },
          internal_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "",
            grade: "",
          },
          total_marks_obtain: "",
          C: "",
          G: "",
          GP: "",
          "C*GP": "",
        },
      },
      {
        course_name: "MINI PROJECT-1A",
        course_code: "MCAP11",
        section_1: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: "",
          grade: "",
          total_marks_obtain: "",
          C: "",
          G: "",
          GP: "",
          "C*GP": "",
        },
      },
    ],
  },
];

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
  } else {
    console.log("Array is empty !!");
  }
  // displayExtractedJSONData();
}

const displayExtractedJSONData = () => {
  console.log(extractedJSONData);
};

function parseCompleteData(rawData) {
  // console.log(rawData);

  rawData = rawData.split("\n");

  // console.log(rawData);

  // remove unwanted " ";
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

  // console.log(rawData.length); = 5
  // console.log(rawData);

  // [
  //   "  9303351 /BORHADE SIDDHI SANJAY SUVARNA                         2020016400304377    COLL 456:SIES NERUL NAVI MUMBAI ",
  //   " 44 (D )17 (O ) 61 3  C   7 21|20               1  O  10 10|64 (O )19 (O ) 83 3  O  10 30|23 (O) 42 (O) 65   1  O  10 10       P ",
  //   " 66 (O )17 (O ) 83 3  O  10 30|22 (O)32 (C)  54 1  B   8  8|61 (A )16 (O ) 77 3  A   9 27|16                 1  C   7  7 ",
  //   " 48 (O )25 (E ) 73 2  B   8 16|38 (A)39 (A)  77 2  A   9 18 |33 (C)        33 1  C   7  7 ",
  //   "                                                                      Total Marks obtained 642/850           21 184  8.76 ",
  // ];

  let studentInfo = extractStudentDetails(rawData[0]);
  let studentStatus = extractStudentStatus(rawData[1]);
  let studentTotal = extractStudentTotals(rawData[rawData.length - 1]);
  let courses = extractStudentsMarksForEachCourse([
    rawData[1],
    rawData[2],
    rawData[3],
  ]);
  // console.log(studentInfo);
  // console.log(studentStatus);
  // console.log(studentTotal);
  return { ...studentInfo, status: studentStatus, totals: studentTotal };
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
  console.log(processRow1_result);
  const processRow2_result = processRow2(row2);
  console.log(processRow2_result);
  const processRow3_result = processRow3(row3);
  console.log(processRow3_result);
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
  if(result.length === 38){
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
    if (match[1] && match[2]) { // Match patterns like "48 (O)" or "47E(O)"
      result.push(match[1], match[2]);
    } else if (match[3]) { // Match standalone numbers or letters
      result.push(match[3]);
    } else if (match[4]) { // Match "--"
      result.push(match[4]);
    } else if (match[0] === "|") { // Match "|"
      result.push("|");
    }
  }

  return result;
}
