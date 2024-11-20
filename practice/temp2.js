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
  MCA11: 58,
  MCA12: 62,
  MCA13: 58,
  MCA14: 62,
  MCAL11: 31,
  MCAL14: 26,
  MCAP11: 34,
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
    console.log("Array length: " + data.length);

    for (let i of data) {
      // sending data of 1 student at a time
      const result = parseCompleteData(i);
      // console.log(result);
      extractedJSONData.push(result);
    }
  } else {
    console.log("Array is empty !!");
  }
  displayExtractedJSONData();
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

  // console.log(rawData);

  let studentInfo = extractStudentDetails(rawData[0]);
  let studentStatus = extractStudentStatus(rawData[1]);
  let studentTotal = extractStudentTotals(rawData[rawData.length - 1]);
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
