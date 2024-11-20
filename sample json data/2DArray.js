const xlsx = require("xlsx");
const fs = require("fs");

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
  // Course 1: MFCS1
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
  // Course 2: ADVANCED JAVA / LAB
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
  // Course 3: ADVANCED DATABASE MANAGEMENT SYSTEM / LAB
  "C3 Name",
  "C3 Code",
  "C3 S1 The. Total Marks",
  "C3 S1 The. Passing Marks",
  "C3 S1 The. Marks Obtain",
  "C3 S1 The. Grade",
  "C3 S1 Int. Total Marks",
  "C3 S1 Int. Passing Marks",
  "C3 S1 Int. Marks Obtain",
  "C3 S1 Int. Grade",
  "C3 S1 Total Marks Obtain",
  "C3 S1 Credits(C)",
  "C3 S1 Grade (G)",
  "C3 S1 Grade Point (GP)",
  "C3 S1 CGP",
  "C3 S2 Assi. Total Marks",
  "C3 S2 Assi. Passing Marks",
  "C3 S2 Assi. Marks Obtain",
  "C3 S2 Assi. Grade",
  "C3 S2 Prac. Total Marks",
  "C3 S2 Prac. Passing Marks",
  "C3 S2 Prac. Marks Obtain",
  "C3 S2 Prac. Grade",
  "C3 S2 Total Marks Obtain",
  "C3 S2 Credits(C)",
  "C3 S2 Grade (G)",
  "C3 S2 Grade Point (GP)",
  "C3 S2 CGP",
  // Course 4: SOFTWARE PROJECT MANAGEMENT
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
  "C4 S2 C",
  "C4 S2 G",
  "C4 S2 GP",
  "C4 S2 CGP",
  // Course 5: DATA STRUCTURE LAB USING C AND/ C++
  "C5 Name",
  "C5 Code",
  "C5 S1 Term Work (TW) Total Marks",
  "C5 S1 T.W. Passing Marks",
  "C5 S1 T.W. Marks Obtain",
  "C5 S1 T.W. Grade",
  "C5 S1 Int. Total Marks",
  "C5 S1 Int. Passing Marks",
  "C5 S1 Int. Marks Obtain",
  "C5 S1 Int. Grade",
  "C5 S1 Total Marks Obtain",
  "C5 S1 Credits(C)",
  "C5 S1 Grade (G)",
  "C5 S1 Grade Point (GP)",
  "C5 S1 CGP",
  // Course 6: WEB TECHNOLOGIES
  "C6 Name",
  "C6 Code",
  "C6 S1 Term Work (TW) Total Marks",
  "C6 S1 T.W. Passing Marks",
  "C6 S1 T.W. Marks Obtain",
  "C6 S1 T.W. Grade",
  "C6 S1 Int. Total Marks",
  "C6 S1 Int. Passing Marks",
  "C6 S1 Int. Marks Obtain",
  "C6 S1 Int. Grade",
  "C6 S1 Total Marks Obtain",
  "C6 S1 Credits(C)",
  "C6 S1 Grade (G)",
  "C6 S1 Grade Point (GP)",
  "C6 S1 CGP",
  // <!-- Course 7: MINI PROJECT-1A -->
  "C7 Name",
  "C7 Code",
  "C7 Total Marks",
  "C7 Passing Marks",
  "C7 Marks Obtain",
  "C7 Grade",
  "C7 Total Marks Obtain",
  "C7 Credits(C)",
  "C7 Grade (G)",
  "C7 Grade Point (GP)",
  "C7 CGP",
];

let Array2D_Sem1 = [sem_1_headers];

let jsonObject = [
  {
    seat_no: "9303351",
    name: "BORHADE SIDDHI SANJAY SUVARNA",
    prn: "2020016400304377",
    coll_code: "456",
    coll_name: "SIES NERUL NAVI MUMBAI",
    status: "P",
    totals: {
      total_marks: "850",
      total_marks_obtain: "642",
      total_credits: "21",
      total_cgp: "184",
      gpi: "8.76",
    },
    courses: [
      {
        course_name: "MATHEMATICAL FOUNDATION FOR COMPUTER SCI",
        course_code: "MCA11",
        section_1: {
          theory_marks: {
            total_marks: "80",
            passing_marks: "36",
            marks_obtain: "44",
            grade: "D",
          },
          internal_marks: {
            total_marks: "20",
            passing_marks: "9",
            marks_obtain: "17",
            grade: "O",
          },
          total_marks: "61",
          C: "3",
          G: "C",
          GP: "7",
          "C*GP": "21",
        },
        section_2: {
          assignment_marks: {
            total_marks: "25",
            passing_marks: "11",
            marks_obtain: "20",
          },
          C: "1",
          G: "O",
          GP: "10",
          "C*GP": "10",
        },
      },
      {
        course_name: "ADVANCED JAVA / LAB",
        course_code: "MCA12",

        section_1: {
          theory_marks: {
            total_marks: "80",
            passing_marks: "36",
            marks_obtain: "64",
            grade: "O",
          },
          internal_marks: {
            total_marks: "20",
            passing_marks: "9",
            marks_obtain: "19",
            grade: "O",
          },
          total_marks: "83",
          C: "3",
          G: "O",
          GP: "10",
          "C*GP": "30",
        },
        section_2: {
          assignment_marks: {
            total_marks: "25",
            passing_marks: "11",
            marks_obtain: "23",
            grade: "O",
          },
          practical_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "42",
            grade: "O",
          },
          total_marks: "65",
          C: "1",
          G: "O",
          GP: "10",
          "C*GP": "10",
        },
      },
      {
        course_name: "ADVANCED DATABASE MANAGEMENT SYSTEM / LAB",
        course_code: "MCA13",

        section_1: {
          theory_marks: {
            total_marks: "80",
            passing_marks: "36",
            marks_obtain: "66",
            grade: "O",
          },
          internal_marks: {
            total_marks: "20",
            passing_marks: "11",
            marks_obtain: "17",
            grade: "O",
          },
          total_marks: "83",
          C: "3",
          G: "O",
          GP: "10",
          "C*GP": "30",
        },
        section_2: {
          assignment_marks: {
            total_marks: "25",
            passing_marks: "11",
            marks_obtain: "22",
            grade: "O",
          },
          practical_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "32",
            grade: "C",
          },
          total_marks: "54",
          C: "1",
          G: "B",
          GP: "8",
          "C*GP": "8",
        },
      },
      {
        course_name: "SOFTWARE PROJECT MANAGEMENT",
        course_code: "MCA14",
        section_1: {
          theory_marks: {
            total_marks: "80",
            passing_marks: "36",
            marks_obtain: "61",
            grade: "A",
          },
          internal_marks: {
            total_marks: "20",
            passing_marks: "9",
            marks_obtain: "16",
            grade: "O",
          },
          total_marks: "77",
          C: "3",
          G: "A",
          GP: "9",
          "C*GP": "27",
        },
        section_2: {
          assignment_marks: {
            total_marks: "25",
            passing_marks: "11",
            marks_obtain: "16",
          },
          C: "1",
          G: "C",
          GP: "7",
          "C*GP": "7",
        },
      },
      {
        course_name: "DATA STRUCTURE LAB USING C AND/ C++",
        course_code: "MCAL11",
        section_1: {
          term_work_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "48",
            grade: "O",
          },
          internal_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "23",
            grade: "E",
          },
          total_marks: "73",
          C: "2",
          G: "B",
          GP: "8",
          "C*GP": "16",
        },
      },
      {
        course_name: "WEB TECHNOLOGIES",
        course_code: "MCAL14",
        section_1: {
          term_work_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "38",
            grade: "A",
          },
          internal_marks: {
            total_marks: "50",
            passing_marks: "23",
            marks_obtain: "39",
            grade: "A",
          },
          total_marks: "77",
          C: "2",
          G: "A",
          GP: "9",
          "C*GP": "18",
        },
      },
      {
        course_name: "MINI PROJECT-1A",
        course_code: "MCAP11",
        section_1: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: "33",
          grade: "C",
          total_marks_obtain: "33",
          C: "1",
          G: "C",
          GP: "7",
          "C*GP": "7",
        },
      },
    ],
  },
];

function flatAllStudents(jsonObject) {
  // console.log(jsonObject);
  for (let i in jsonObject) {
    // console.log(jsonObject[i]);
    const result = flatStudent(jsonObject[i]);
    Array2D_Sem1.push(result);
  }
  // displayArr();
}

function displayArr() {
  console.log(Array2D_Sem1);
}

function flatStudent(student) {
  let i = 0;
  let tempArr = [];
  tempArr[i++] = student.seat_no;
  tempArr[i++] = student.name;
  tempArr[i++] = student.prn;
  tempArr[i++] = student.coll_code;
  tempArr[i++] = student.coll_name;
  tempArr[i++] = student.status;
  tempArr[i++] = student.totals.total_marks;
  tempArr[i++] = student.totals.total_marks_obtain;
  tempArr[i++] = student.totals.total_credits;
  tempArr[i++] = student.totals.total_cgp;
  tempArr[i++] = student.totals.gpi;
  {
    /* Course 1 */
  }
  tempArr[i++] = student.courses[0].course_name;
  tempArr[i++] = student.courses[0].course_code;
  tempArr[i++] = student.courses[0].section_1.theory_marks.total_marks;
  tempArr[i++] = student.courses[0].section_1.theory_marks.passing_marks;
  tempArr[i++] = student.courses[0].section_1.theory_marks.marks_obtain;
  tempArr[i++] = student.courses[0].section_1.theory_marks.grade;
  tempArr[i++] = student.courses[0].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[0].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[0].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[0].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[0].section_1.total_marks;
  tempArr[i++] = student.courses[0].section_1.C;
  tempArr[i++] = student.courses[0].section_1.G;
  tempArr[i++] = student.courses[0].section_1.GP;
  tempArr[i++] = student.courses[0].section_1["C*GP"];
  tempArr[i++] = student.courses[0].section_2.assignment_marks.total_marks;
  tempArr[i++] = student.courses[0].section_2.assignment_marks.passing_marks;
  tempArr[i++] = student.courses[0].section_2.assignment_marks.marks_obtain;
  tempArr[i++] = student.courses[0].section_2.C;
  tempArr[i++] = student.courses[0].section_2.G;
  tempArr[i++] = student.courses[0].section_2.GP;
  tempArr[i++] = student.courses[0].section_2["C*GP"];
  {
    /* Course 2 */
  }
  tempArr[i++] = student.courses[1].course_name;
  tempArr[i++] = student.courses[1].course_code;
  tempArr[i++] = student.courses[1].section_1.theory_marks.total_marks;
  tempArr[i++] = student.courses[1].section_1.theory_marks.passing_marks;
  tempArr[i++] = student.courses[1].section_1.theory_marks.marks_obtain;
  tempArr[i++] = student.courses[1].section_1.theory_marks.grade;
  tempArr[i++] = student.courses[1].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[1].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[1].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[1].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[1].section_1.total_marks;
  tempArr[i++] = student.courses[1].section_1.C;
  tempArr[i++] = student.courses[1].section_1.G;
  tempArr[i++] = student.courses[1].section_1.GP;
  tempArr[i++] = student.courses[1].section_1["C*GP"];
  tempArr[i++] = student.courses[1].section_2.assignment_marks.total_marks;
  tempArr[i++] = student.courses[1].section_2.assignment_marks.passing_marks;
  tempArr[i++] = student.courses[1].section_2.assignment_marks.marks_obtain;
  tempArr[i++] = student.courses[1].section_2.assignment_marks.grade;
  tempArr[i++] = student.courses[1].section_2.practical_marks.total_marks;
  tempArr[i++] = student.courses[1].section_2.practical_marks.passing_marks;
  tempArr[i++] = student.courses[1].section_2.practical_marks.marks_obtain;
  tempArr[i++] = student.courses[1].section_2.practical_marks.grade;
  tempArr[i++] = student.courses[1].section_2.total_marks;
  tempArr[i++] = student.courses[1].section_2.C;
  tempArr[i++] = student.courses[1].section_2.G;
  tempArr[i++] = student.courses[1].section_2.GP;
  tempArr[i++] = student.courses[1].section_2["C*GP"];
  {
    /* Course 3 */
  }
  tempArr[i++] = student.courses[2].course_name;
  tempArr[i++] = student.courses[2].course_code;
  tempArr[i++] = student.courses[2].section_1.theory_marks.total_marks;
  tempArr[i++] = student.courses[2].section_1.theory_marks.passing_marks;
  tempArr[i++] = student.courses[2].section_1.theory_marks.marks_obtain;
  tempArr[i++] = student.courses[2].section_1.theory_marks.grade;
  tempArr[i++] = student.courses[2].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[2].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[2].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[2].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[2].section_1.total_marks;
  tempArr[i++] = student.courses[2].section_1.C;
  tempArr[i++] = student.courses[2].section_1.G;
  tempArr[i++] = student.courses[2].section_1.GP;
  tempArr[i++] = student.courses[2].section_1["C*GP"];
  tempArr[i++] = student.courses[2].section_2.assignment_marks.total_marks;
  tempArr[i++] = student.courses[2].section_2.assignment_marks.passing_marks;
  tempArr[i++] = student.courses[2].section_2.assignment_marks.marks_obtain;
  tempArr[i++] = student.courses[2].section_2.assignment_marks.grade;
  tempArr[i++] = student.courses[2].section_2.practical_marks.total_marks;
  tempArr[i++] = student.courses[2].section_2.practical_marks.passing_marks;
  tempArr[i++] = student.courses[2].section_2.practical_marks.marks_obtain;
  tempArr[i++] = student.courses[2].section_2.practical_marks.grade;
  tempArr[i++] = student.courses[2].section_2.total_marks;
  tempArr[i++] = student.courses[2].section_2.C;
  tempArr[i++] = student.courses[2].section_2.G;
  tempArr[i++] = student.courses[2].section_2.GP;
  tempArr[i++] = student.courses[2].section_2["C*GP"];
  {
    /* Course 4 */
  }
  tempArr[i++] = student.courses[3].course_name;
  tempArr[i++] = student.courses[3].course_code;
  tempArr[i++] = student.courses[3].section_1.theory_marks.total_marks;
  tempArr[i++] = student.courses[3].section_1.theory_marks.passing_marks;
  tempArr[i++] = student.courses[3].section_1.theory_marks.marks_obtain;
  tempArr[i++] = student.courses[3].section_1.theory_marks.grade;
  tempArr[i++] = student.courses[3].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[3].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[3].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[3].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[3].section_1.total_marks;
  tempArr[i++] = student.courses[3].section_1.C;
  tempArr[i++] = student.courses[3].section_1.G;
  tempArr[i++] = student.courses[3].section_1.GP;
  tempArr[i++] = student.courses[3].section_1["C*GP"];
  tempArr[i++] = student.courses[3].section_2.assignment_marks.total_marks;
  tempArr[i++] = student.courses[3].section_2.assignment_marks.passing_marks;
  tempArr[i++] = student.courses[3].section_2.assignment_marks.marks_obtain;
  tempArr[i++] = student.courses[3].section_2.C;
  tempArr[i++] = student.courses[3].section_2.G;
  tempArr[i++] = student.courses[3].section_2.GP;
  tempArr[i++] = student.courses[3].section_2["C*GP"];
  {
    /* Course 5 */
  }
  tempArr[i++] = student.courses[4].course_name;
  tempArr[i++] = student.courses[4].course_code;
  tempArr[i++] = student.courses[4].section_1.term_work_marks.total_marks;
  tempArr[i++] = student.courses[4].section_1.term_work_marks.passing_marks;
  tempArr[i++] = student.courses[4].section_1.term_work_marks.marks_obtain;
  tempArr[i++] = student.courses[4].section_1.term_work_marks.grade;
  tempArr[i++] = student.courses[4].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[4].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[4].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[4].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[4].section_1.total_marks;
  tempArr[i++] = student.courses[4].section_1.C;
  tempArr[i++] = student.courses[4].section_1.G;
  tempArr[i++] = student.courses[4].section_1.GP;
  tempArr[i++] = student.courses[4].section_1["C*GP"];
  {
    /* Course 6 */
  }
  tempArr[i++] = student.courses[5].course_name;
  tempArr[i++] = student.courses[5].course_code;
  tempArr[i++] = student.courses[5].section_1.term_work_marks.total_marks;
  tempArr[i++] = student.courses[5].section_1.term_work_marks.passing_marks;
  tempArr[i++] = student.courses[5].section_1.term_work_marks.marks_obtain;
  tempArr[i++] = student.courses[5].section_1.term_work_marks.grade;
  tempArr[i++] = student.courses[5].section_1.internal_marks.total_marks;
  tempArr[i++] = student.courses[5].section_1.internal_marks.passing_marks;
  tempArr[i++] = student.courses[5].section_1.internal_marks.marks_obtain;
  tempArr[i++] = student.courses[5].section_1.internal_marks.grade;
  tempArr[i++] = student.courses[5].section_1.total_marks;
  tempArr[i++] = student.courses[5].section_1.C;
  tempArr[i++] = student.courses[5].section_1.G;
  tempArr[i++] = student.courses[5].section_1.GP;
  tempArr[i++] = student.courses[5].section_1["C*GP"];
  {
    /* Course 7 */
  }
  tempArr[i++] = student.courses[6].course_name;
  tempArr[i++] = student.courses[6].course_code;
  tempArr[i++] = student.courses[6].section_1.total_marks;
  tempArr[i++] = student.courses[6].section_1.passing_marks;
  tempArr[i++] = student.courses[6].section_1.marks_obtain;
  tempArr[i++] = student.courses[6].section_1.grade;
  tempArr[i++] = student.courses[6].section_1.total_marks_obtain;
  tempArr[i++] = student.courses[6].section_1.C;
  tempArr[i++] = student.courses[6].section_1.G;
  tempArr[i++] = student.courses[6].section_1.GP;
  tempArr[i++] = student.courses[6].section_1["C*GP"];

  return tempArr;
}

// function convert2DArrToExcel(data) {
//   // Convert the 2D array to a worksheet
//   const worksheet = xlsx.utils.aoa_to_sheet(data);

//   // Create a new workbook and append the worksheet
//   const workbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//   // Write the workbook to a file
//   const filePath = "output.xlsx";
//   xlsx.writeFile(workbook, filePath);

//   console.log(`Excel file generated: ${filePath}`);
// }

function main() {
  flatAllStudents(jsonObject);
  displayArr()
  // convert2DArrToExcel(Array2D_Sem1);
}

main();
