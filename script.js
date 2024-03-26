// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function calculateGradePercentage(studentGrade, pointsPossible) {
  let studentPercentage;
  if (studentGrade >= 0 && studentGrade <= pointsPossible) {
    studentPercentage = (studentGrade / pointsPossible).toFixed(2);
    console.log(`The grade percentage is: ${studentPercentage}`);
  } else {
    console.log("This is not a valid grade.");
  }

  return studentPercentage;
}

function isDueDatePassed(dueDate) {
  // make them date objects
  dueDate = new Date(dueDate);
  let currentDate = new Date();

  return dueDate < currentDate;
}

function getDueDateOfAnAssignment() {
  const assignmentInfo = {};
  ag.assignments.forEach((assignment) => {
    assignmentInfo[assignment.name] = assignment.due_at;
    return assignmentInfo;
  });
  console.log();
}
function getLearnerData(course, ag, submissions) {
  //course info, assignment group, learner submissions
  const studentData = [];

  //loop through each assignment submission
  submissions.forEach((submission) => {
    const learnerId = Number(submission.learner_id);
    const assignmentId = parseInt(submission.assignment_id);
    const score = submission.submission.score;
    const pointsPossible = ag.assignments.find((a) => a.id === assignmentId).points_possible; //Find assignment object with matching ID, then access points_possible
    const dueDate = ag.assignments.find((a) => a.id === assignmentId).due_at; //Finds assignment with matching id
    console.log(typeof(assignmentId))
    //  Check to see if due date is passed
    if (isDueDatePassed(dueDate)) {
      // Check if the students ID already exists in the studentData, if not will return -1
      let existingStudentIndex = studentData.findIndex(
        (learner) => learner.id === learnerId
      );

      // If the student doesn't exist, add it to the studentData
      if (existingStudentIndex === -1) {
        studentData.push({ id: learnerId });
        existingStudentIndex = studentData.length - 1; // The index, can't be -1 going forward, so we reassign it to the last added item
      }

        //Calculate percentage of points correct
        const percentageCorrect = calculateGradePercentage(score,pointsPossible);

        // Add the assignment data to the studentData object
        studentData[existingStudentIndex][assignmentId] = parseFloat(percentageCorrect); //Can't use push method because we are modifying an existing object

    }
  });

  return studentData;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// here, we would process this data to achieve the desired result.
//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0, // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833, // late: (140 - 15) / 150
//     },
//   ];

// for (i=0; i<result.length; i++){
// console.log(`Student ID: ${result[i].id}`);
// console.log(`Assignment 1: ${result[i][1]}`);
// console.log(`Assignment 2: ${result[i][2]}`);
// console.log(`Average: ${result[1].avg}`);
// }
