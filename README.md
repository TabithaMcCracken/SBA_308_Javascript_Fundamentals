# Introduction to JavaScript Course Grade Calculator

This JavaScript program is designed to calculate grades for students enrolled in the course "Introduction to JavaScript". It takes into account assignment submissions and due dates to compute the grades. 
The program outputs an array of objects, each representing a student and their calculated grades. The structure of each object includes the student's ID and their average grade. Additional properties are added for each assignment, representing the grade percentage achieved by the student for that assignment. Below is a guide on how to use and understand the program.

## Table of Contents

- [Usage](#usage)
- [Functions](#functions)
  - [calculateGradePercentage](#calculategradepercentage)
  - [isDueDatePassed](#isduedatepassed)
  - [getLearnerData](#getlearnerdata)
- [Elements](#elements)
- [Contributing](#contributing)
- [License](#license)

## Usage

To use this program, follow these steps:

1. Ensure you have Node.js installed on your system.
2. Copy the provided code into a JavaScript file (e.g., `gradeCalculator.js`).
3. Run the JavaScript file using Node.js.
   ```bash
   node gradeCalculator.js
   ```
4. The program will output the calculated grades for each student.

## Functions
### calculateGradePercentage
This function calculates the percentage grade of a student based on the provided score, points possible, due date, and submission date. It also applies a penalty if the submission is late.

### isDueDatePassed
This function checks whether the due date for an assignment has passed.

### getLearnerData
This is the main function of the program. It takes three parameters: CourseInfo (course information), AssignmentGroup (assignment group information), and LearnerSubmissions (learner submission data). It calculates the grades for each student based on the provided data.

## Elements
This program shows use of the following: how to declare variables using let and const, uses operators to perform calculations, uses strings, numbers and Boolean values, uses if/else statements, uses the try/catch method, uses two different kinds of loops, uses a loop control keyword, creates and manipulates arrays and objects, demonstrates the retrieval, manipulation, and removal of items in an array and properties of an object, uses functions to handle repeat tasks, outputs processed data, runs without errors, was committed to github, and contains this lovely README file.

## Contributing
Contributions to enhance the Adventure Together web application are welcome. Please feel free to fork this repository, make improvements, and submit a pull request with your changes.

## License
This project is licensed under the MIT License.
