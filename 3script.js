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

  function calculateGradePercentage(
    studentGrade,
    pointsPossible,
    dueDate,
    submissionDate, 
    submission
  ) {
    let studentPercentage;
    try {
      if (studentGrade >= 0 && studentGrade <= pointsPossible) {
        const submissionDateTime = new Date(submissionDate);
        const dueDateTime = new Date(dueDate);
        if (submissionDateTime > dueDateTime) {
          const penalty = pointsPossible * 0.1;
          studentGrade -= penalty;
        }
        studentPercentage = ((studentGrade / pointsPossible)*100).toFixed(2); //Removed *100
      } else {
        throw new Error(`The assignment ${submission.assignment_id} for the student with id ${submission.learner_id} is is not a valid grade and won't be included in the grade totals.`);
      }
    } catch (error) {
      console.log(error.message);
    }
    return parseInt(studentPercentage);
  }
  
  function isDueDatePassed(dueDate) {
    // make them date objects
    dueDate = new Date(dueDate);
    let currentDate = new Date();
    return dueDate < currentDate;
  }

// Main function to run program
function getLearnerData(course, ag, submissions) {

    // Check if the assignment group belongs to the provided course
    if (ag.course_id !== course.id) {
      throw new Error("Invalid input: the course id does not match.");
    }
    const studentData = [];
  
    // Loop through each assignment submission
    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
      const learnerId = Number(submission.learner_id);
      const assignmentId = parseInt(submission.assignment_id);
      const score = parseInt(submission.submission.score);
      const pointsPossible = ag.assignments.find((a) => a.id === assignmentId).points_possible; // Find assignment object with matching ID, then access points_possible
      
      const dueDate = ag.assignments.find((a) => a.id === assignmentId).due_at; // Finds assignment with matching id
      const submissionDate = submission.submission.submitted_at;
  
      // Calculate grade percentage using the calculateGradePercentage function
      let gradePercentage;
      if (score === 0){
        gradePercentage = 0;
      } else {
        gradePercentage = parseFloat(calculateGradePercentage(
        score,
        pointsPossible,
        dueDate,
        submissionDate,
        submission
      ));
        }
    
      // Check if the due date is passed and grade percentage is valid
      if (isDueDatePassed(dueDate) && !isNaN(gradePercentage) && gradePercentage !== undefined) {
        // Check if the student's ID already exists in the studentData, if not will return -1
        let existingStudentIndex = studentData.findIndex(
          (learner) => learner.id === learnerId
        );
  
        // If the student doesn't exist, add it to the studentData
        if (existingStudentIndex === -1) {
          studentData.push({
            id: learnerId,
            totalGrade: 0,
            totalPointsPossible: 0,
            validAssignmentCount: 0,
          });
          existingStudentIndex = studentData.length - 1; // The index, can't be -1 going forward, so we reassign it to the last added item
        }
  
        // Update totalGrade and totalPointsPossible
        studentData[existingStudentIndex].totalGrade += gradePercentage * pointsPossible;
        studentData[existingStudentIndex].totalPointsPossible += pointsPossible;
  
        // Add the assignment data to the studentData object
        const gradePercentageNumber = parseInt(gradePercentage);
        studentData[existingStudentIndex][assignmentId] = parseInt(gradePercentageNumber.toFixed(2));
        studentData[existingStudentIndex].validAssignmentCount++;
      } else {
        continue;
      }
    
    };

    // Calculate average for each student
    studentData.forEach((student, index) => {
      if (student.validAssignmentCount >= 1) {
        const avg = Math.round((student.totalGrade / student.totalPointsPossible));
        student.avg = parseInt(avg);
      } else {
        student.avg = "N/A There are no valid assignments for this student.";
      }

      // Delete unnecessary properties
      delete student.totalGrade;
      delete student.totalPointsPossible;
      delete student.validAssignmentCount;
  
      // Reorder things
      const reorderedStudent = {
        id: student.id,
        avg: parseInt(student.avg),
        ...student
      };
  
      studentData[index] = reorderedStudent;
    });
   
    return studentData;
  }
  
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);