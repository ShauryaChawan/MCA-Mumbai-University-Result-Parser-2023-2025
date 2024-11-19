const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync(
  "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\passed-students\\1T00161 - Sem 1-518.pdf"
);


// Sem 1

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

let extractedHeader = {
  "course_1": 58,
  "course_2": 62,
  "course_3": 58,
  "course_4": 62,
  "course_5": 31,
  "course_6": 26,
  "course_7": 34,
}

let extractedData;

pdf(dataBuffer)
  .then(function (data) {
    extractedData = data.text.split(
      "----------------------------------------------------------------------------------------------------------------------------------"
    );

    // console.log(extractedData);
    main(extractedData);
  })
  .catch(function (error) {
    console.log(error + "Couldn't read the pdf !!");
  });



// Main execution
function main(extractedData) {
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

