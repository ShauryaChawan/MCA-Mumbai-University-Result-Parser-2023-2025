const fs = require("fs");
const pdf = require("pdf-parse");

// let dataBuffer = fs.readFileSync(
//   "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1.pdf"
// );

let dataBuffer = fs.readFileSync(
  "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\passed-students\\1T00161 - Sem 1-518.pdf"
);

// Sem 1
{
  // let c1="<------------------- Course  I ------<CR-3+1>------------>"
  // let c2 = "<------------------- Course  II--------<CR-3+1>-------------->"
  // let c3 = "<------------------- Course III ------<CR-3+1>----------->"
  // let c4 = "<------------------- Course  IV--------<CR-3+1>-------------->"
  // let c5 = "<------ Course  V ----<CR-2>-->"
  // let c6 = "<---- Course  VI--<CR-2>->"
  // let c7 = "<---- Course  VII---<CR-1>------->"
  // console.log(c1.length)
  // console.log(c2.length)
  // console.log(c3.length)
  // console.log(c4.length)
  // console.log(c5.length)
  // console.log(c6.length)
  // console.log(c7.length)
}

// 🚩 Step 1: Read PDF

// ➡️ Process 1 page pdf

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

// 📝 Todo: ➡️ Process 1 page from entire pdf
{
  // pdf(dataBuffer)
  //   .then(function (data) {
  //     // Total number of pages in the PDF
  //     const totalPages = data.numpages;
  //     console.log(`Total Pages: ${totalPages}`);
  //     // Iterator for processing pages one by one
  //     const processPage = async (pageNumber) => {
  //       try {
  //         // Extract a specific page's content
  //         const pageContent = await data.getPage(pageNumber);
  //         console.log(`Processing Page ${pageNumber}...`);
  //         console.log(pageContent.text);
  //         // Process content here or call another function
  //         const extractedData = pageContent.text.split(
  //           "----------------------------------------------------------------------------------------------------------------------------------"
  //         );
  //         main(extractedData);
  //       } catch (error) {
  //         console.log(`Error processing page ${pageNumber}:`, error);
  //       }
  //     };
  //     // Loop through pages
  //     (async () => {
  //       // for (let page = 1; page <= totalPages; page++) {
  //       //   await processPage(page);
  //       // }
  //       await processPage(518);
  //     })();
  //   })
  //   .catch(function (error) {
  //     console.log(error + " Couldn't read the PDF!!");
  //   });
}

// 🚩 Step 2. Extract Course Structure & Courses List

function extractCoursesStructure() {}

// 📝 Todo: ➡️ Extract header and their max length and create an object.

// Etracted header
let extractedCoursesMaxLength = {
  MCA11: [58, "|"],
  MCA12: [62, "\n"],
  MCA13: [58, "|"],
  MCA14: [62,"\n"],
  MCAL11: [31,"|"],
  MCAL14: [26, "|"],
  MCAP11: [34, "\n"],
};

// 🚩 Step 3. Create a json general structure from it

// Based on the output of set 2, create the following json format

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

// 🚩 Step 4. Create and store the data of students on a single page in an array.

let extractedData = [];

// 🚩 Step 5. Process each student's raw data to json

function processAllStudentsData(extractedData) {
  const data = extractedData;

  data.splice(0, 3); // Removes the first 3 elements
  data.splice(-3, 3); // Removes the last 3 elements

  console.log(data);

  // for (let i of data[0]) {
  //   console.log(i);
  // }

  // if (data.length != 0) {
  //   console.log("Array length: " + data.length);

  //   for (let i of data) {
  //     rawDataToJSON(i);
  //   }
  // } else {
  //   console.log("Array is empty !!");
  // }
}

function rawDataToJSON(rawData) {
  console.log("Function called ----- \n\n ");
  // console.log(rawData);
  console.log("#" + rawData + "#");
}

// 🚩 Step 6. Append converted json data of each student to the json array of "StudentsData"
// 🚩 Step 7. Convert the json data in tabluar form
