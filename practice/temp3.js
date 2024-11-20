
// Test cases
const testCases = [
  { variation: 1, input: "48 (O )25 (E ) 73 2  B   8 16|38 (A)39 (A)  77 2  A   9 18 |33 (C)        33 1  C   7  7", expected: ["48", "O", "25", "E", "73", "2", "B", "8", "16", "|", "38", "A", "39", "A", "77", "2", "A", "9", "18", "|", "33", "C", "33", "1", "C", "7", "7"] },
  { variation: 2, input: "47E(O )44E(O ) 91 2  O  10 20|40E(O)41E(O)  81 2  O  10 20 |33E(C)        33 1  C   7  7", expected: ["47E", "O", "44E", "O", "91", "2", "O", "10", "20", "|", "40E", "O", "41E", "O", "81", "2", "O", "10", "20", "|", "33E", "C", "33", "1", "C", "7", "7"] },
  { variation: 3, input: "44E(O )23E(P ) 67 2  C   7 14|36E(B)37E(B)  73 2  B   8 16 |13F(F)       --  -- -- -- --", expected: ["44E", "O", "23E", "P", "67", "2", "C", "7", "14", "|", "36E", "B", "37E", "B", "73", "2", "B", "8", "16", "|", "13F", "F", "--", "--", "--", "--", "--"] },
  { variation: 4, input: "47E(O )10F(F )--  -- -- -- --|42E(O)35E(B)  77 2  A   9 18 |42E(O)        42 1  O  10 10", expected: ["47E", "O", "10F", "F", "--", "--", "--", "--", "--", "|", "42E", "O", "35E", "B", "77", "2", "A", "9", "18", "|", "42E", "O", "42", "1", "O", "10", "10"] },
  { variation: 5, input: "A  (F )A  (F )--  -- -- -- --|A  (F)A  (F) --  -- -- -- -- |A  (F)       --  -- -- -- --", expected: ["A", "F", "A", "F", "--", "--", "--", "--", "--", "|", "A", "F", "A", "F", "--", "--", "--", "--", "--", "|", "A", "F", "--", "--", "--", "--", "--"] }
];

// Running the test cases
testCases.forEach(testCase => {
  const result = convertToArray(testCase.input);
  console.log(`Variation ${testCase.variation}:`);
  console.log("Input: ", testCase.input);
  console.log("Expected Output: ", testCase.expected);
  console.log("Result: ", result);
  console.log("Test Passed: ", JSON.stringify(result) === JSON.stringify(testCase.expected));
  console.log("--------------------------------------------------");
});
