const fs = require("fs");
const pdfParse = require("pdf-parse");

// const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1-515-520.pdf"; // Path to your PDF file
const pdfPath = "D:\\Projects\\PDF to Excel\\pdfs\\sem-1\\1T00161 - Sem 1.pdf";

// Function to read and extract text from each page
const readPDFText = async (pdfPath) => {
  // Read the PDF file into a buffer
  const pdfBuffer = fs.readFileSync(pdfPath);

  try {
    // Parse the PDF buffer
    const data = await pdfParse(pdfBuffer);

    // The text of the entire PDF (this is one large string)
    const fullText = data.text;

    // Split the text into an array of pages based on page breaks
    const pages = fullText.split("\n\n"); // Adjust this if needed based on your PDF format

    // Loop through each page and log the text
    // pages.forEach((pageText, index) => {
    //   console.log(`Page ${index + 1}:`);
    //   console.log(pageText);
    //   console.log("##############");
    // });

    for (let index = 1; index < pages.length; index++) {
      const pageText = pages[index];
      console.log(`Page ${index}:`);
      console.log(pageText);
      console.log("##############");
    }
  } catch (error) {
    console.error("Error reading PDF:", error);
  }
};

// Run the function to read and extract text from the PDF
readPDFText(pdfPath);
