function parseCompleteData(rawData) {
  // Parse student details
  const studentData = parseBasicStudentDetails(rawData);

  // Parse course details
  const courseDetails = parseCourseDetails(rawData);

  // Combine student details and course details
  return {
    ...studentData,
    courses: courseDetails,
  };
}

function parseBasicStudentDetails(rawData) {
  // Trim any leading or trailing whitespace from raw data
  rawData = rawData.trim();

  // More flexible regex
  const regex =
    /^(\d{7})\s*\/?\s*([A-Z\s]+)\s+(\d{16})\s+COLL\s+(\d+):([A-Z\s]+)\s+.*?Total\s+Marks\s+obtained\s+(\d+)\/850\s+(\d+)\s+(\d+)\s+(\d+\.\d{2})/s;

  // Match the raw data using the regex
  const match = rawData.match(regex);

  if (!match) {
    throw new Error("Raw data did not match the expected format.");
  }

  // Extract the matched data into the required object format
  const studentData = {
    seat_no: match[1],
    name: match[2].trim(),
    prn: match[3],
    coll_code: match[4],
    coll_name: match[5].trim(),
    status: rawData.includes("(F)") ? "F" : "P",
    totals: {
      total_marks: "850",
      total_marks_obtain: match[6],
      total_credits: match[7],
      total_cgp: match[8],
      gpi: match[9],
    },
  };

  return studentData;
}

function parseCourseDetails(rawData) {
  // Remove the summary part at the end
  const courseSection = rawData.replace(/Total Marks obtained.*$/, "").trim();

  // Course details with predefined structure
  const courses = [
    {
      course_name: "MATHEMATICAL FOUNDATION FOR COMPUTER SCI",
      course_code: "MCA11",
      section_1: parseSection(courseSection, 0, "theory_internal"),
      section_2: parseSection(courseSection, 0, "assignment"),
    },
    {
      course_name: "ADVANCED JAVA / LAB",
      course_code: "MCA12",
      section_1: parseSection(courseSection, 1, "theory_internal"),
      section_2: parseSection(courseSection, 1, "assignment_practical"),
    },
    {
      course_name: "ADVANCED DATABASE MANAGEMENT SYSTEM / LAB",
      course_code: "MCA13",
      section_1: parseSection(courseSection, 2, "theory_internal"),
      section_2: parseSection(courseSection, 2, "assignment_practical"),
    },
    {
      course_name: "SOFTWARE PROJECT MANAGEMENT",
      course_code: "MCA14",
      section_1: parseSection(courseSection, 3, "theory_internal"),
      section_2: parseSection(courseSection, 3, "assignment"),
    },
    {
      course_name: "DATA STRUCTURE LAB USING C AND/ C++",
      course_code: "MCAL11",
      section_1: parseSection(courseSection, 4, "term_work_internal"),
    },
    {
      course_name: "WEB TECHNOLOGIES",
      course_code: "MCAL14",
      section_1: parseSection(courseSection, 5, "term_work_internal"),
    },
    {
      course_name: "MINI PROJECT-1A",
      course_code: "MCAP11",
      section_1: parseSection(courseSection, 6, "project"),
    },
  ];

  return courses;
}

function parseSection(rawData, index, sectionType) {
  // Modify the regex to be more flexible
  const sectionRegex =
    /(\d+)\s*\(([A-Z])\s*\)(\d+)\s*\(([A-Z])\s*\)\s*(\d+)\s+(\d)\s+([A-Z])\s+(\d)\s+(\d+)/g;
  let matches = Array.from(rawData.matchAll(sectionRegex));

  //   console.log(matches);

  // Ensure we have enough matches
  if (matches.length <= index) return null;

  const match = matches[index];

  //   console.log(match);

  switch (sectionType) {
    case "theory_internal":
      return {
        theory_marks: {
          total_marks: "80",
          passing_marks: "36",
          marks_obtain: match[1],
          grade: match[2],
        },
        internal_marks: {
          total_marks: "20",
          passing_marks: "9",
          marks_obtain: match[3],
          grade: match[4],
        },
        total_marks: match[5],
        C: match[6],
        G: match[7],
        GP: match[8],
        "C*GP": match[9],
      };

    case "assignment":
      return {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: match[1],
        },
        C: match[6],
        G: match[7],
        GP: match[8],
        "C*GP": match[9],
      };

    case "assignment_practical":
      return {
        assignment_marks: {
          total_marks: "25",
          passing_marks: "11",
          marks_obtain: match[1],
          grade: match[2],
        },
        practical_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: match[3],
          grade: match[4],
        },
        total_marks: match[5],
        C: match[6],
        G: match[7],
        GP: match[8],
        "C*GP": match[9],
      };

    case "term_work_internal":
      return {
        term_work_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: match[1],
          grade: match[2],
        },
        internal_marks: {
          total_marks: "50",
          passing_marks: "23",
          marks_obtain: match[3],
          grade: match[4],
        },
        total_marks: match[5],
        C: match[6],
        G: match[7],
        GP: match[8],
        "C*GP": match[9],
      };

    case "project":
      return {
        total_marks: "50",
        passing_marks: "23",
        marks_obtain: match[1],
        grade: match[2],
        total_marks_obtain: match[5],
        C: match[6],
        G: match[7],
        GP: match[8],
        "C*GP": match[9],
      };
  }
}

const rawData = `9303351 /BORHADE SIDDHI SANJAY SUVARNA                         2020016400304377    COLL 456:SIES NERUL NAVI MUMBAI   44 (D )17 (O ) 61 3  C   7 21|20               1  O  10 10|64 (O )19 (O ) 83 3  O  10 30|23 (O) 42 (O) 65   1  O  10 10       P     66 (O )17 (O ) 83 3  O  10 30|22 (O)32 (C)  54 1  B   8  8|61 (A )16 (O ) 77 3  A   9 27|16                 1  C   7  7   48 (O )25 (E ) 73 2  B   8 16|38 (A)39 (A)  77 2  A   9 18 |33 (C)        33 1  C   7  7                                                                       Total Marks obtained 642/850           21 184  8.76`;

try {
  const completeData = parseCompleteData(rawData);
  console.log(JSON.stringify(completeData, null, 2));
} catch (error) {
  console.error(error.message);
}
