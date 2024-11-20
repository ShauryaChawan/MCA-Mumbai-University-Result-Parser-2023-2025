const xlsx = require('xlsx');
const fs = require('fs');

// Example 2D array
const data = [
  ["Name", "Age", "City"],  // Header row
  ["Alice", 25, "New York"],
  ["Bob", 30, "Los Angeles"],
  ["Charlie", 28, "Chicago"]
];

// Convert the 2D array to a worksheet
const worksheet = xlsx.utils.aoa_to_sheet(data);

// Create a new workbook and append the worksheet
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Write the workbook to a file
const filePath = "output.xlsx";
xlsx.writeFile(workbook, filePath);

console.log(`Excel file generated: ${filePath}`);
