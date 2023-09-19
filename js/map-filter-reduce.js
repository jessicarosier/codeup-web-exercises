const users = [
  {
    id: 1,
    name: "ryan",
    email: "ryan@codeup.com",
    languages: ["clojure", "javascript"],
    yearsOfExperience: 5,
  },
  {
    id: 2,
    name: "luis",
    email: "luis@codeup.com",
    languages: ["java", "scala", "php"],
    yearsOfExperience: 6,
  },
  {
    id: 3,
    name: "zach",
    email: "zach@codeup.com",
    languages: ["javascript", "bash"],
    yearsOfExperience: 7,
  },
  {
    id: 4,
    name: "fernando",
    email: "fernando@codeup.com",
    languages: ["java", "php", "sql"],
    yearsOfExperience: 8,
  },
  {
    id: 5,
    name: "justin",
    email: "justin@codeup.com",
    languages: ["html", "css", "javascript", "php"],
    yearsOfExperience: 9,
  },
];

// Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array.

let userLanguagesGreaterThanThree = users.filter(function (user) {
  return user.languages.length >= 3;
});

// console.log(userLanguagesGreaterThanThree);

// Use .map to create an array of strings where each element is a user's email address
let userEmails = users.map(function (user) {
  return user.email;
});

// console.log(userEmails);

// Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.

let totalYears = users.reduce(function (total, user) {
  return (total += user.yearsOfExperience);
}, 0);

// console.log(totalYears);

// Use .reduce to get the longest email from the list of users.

let longestEmail = users.reduce(function (total, user) {
  if (user.email.length > total.length) {
    total = user.email;
  }
  return total;
}, "");

// console.log(longestEmail);

// Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.

// let instructorNames = users.reduce(function (total, user) {
//   total += ` ${user.name}`;
//   return total + ",";
// }, `Your instructor names are: `);
//
// console.log(instructorNames);

// Use .reduce to get the unique list of languages from the list of users.

let listOfLang = users.reduce(function (total, user) {
  for (let i = 0; i < user.languages.length; i++) {
    if (!total.includes(user.languages[i])) {
      total.push(user.languages[i]);
    }
  }
  return total;
}, []);

// console.log(listOfLang);

let cityObjectsArray = [
  {
    name: "San Antonio, TX",
    county: "Bexar",
    population: 1_434_625,
  },
  {
    name: "Corpus Christi, TX",
    county: "Nueces",
    population: 317_863,
  },
  {
    name: "Laredo, TX",
    county: "Webb",
    population: 263_640,
  },
];

//TODO: What's the combined population of the three cities in our array and the average between them? Use .reduce() to get the combined sum of the populations first. Your console.log should be:`The total population of the three cities is: (numPop) with an average of (numAvg)`

let populationTotal = cityObjectsArray.reduce(function (total, cities) {
  total += cities.population;
  return total;
}, 0);

console.log(populationTotal);

//.reduce() with string
//TODO: With .reduce(), can you get me one string with all of the counties together like so: "Here's some counties from Texas: 1. Bexar 2. Nueces 3. Webb (hint: the optional index parameter could be useful. .)

let strOfCountires = cityObjectsArray.reduce(function (total, cities, index) {
  total += `${index + 1} ${cities.county} `;
  return total;
}, "Here are some counties from Texas: ");

console.log(strOfCountires);

//.reduce() with an object

let student = {
  name: "Jimi H.",
  grades: [88, 85, 100, 92, 78, 86],
  currentlyEnrolled: true,
};

//.filter()
let student2 = {
  name: "Aretha F.",
  grades: [92, 80, 55, 100, 78, 98],
  currentlyEnrolled: true,
};

let student3 = {
  name: "Fergie F.",
  grades: [68, 80, 75, 90, 92, 55],
  currentlyEnrolled: false,
};

let student4 = {
  name: "Lil' K.",
  grades: [92, 75, 55, 92, 78, 98],
  currentlyEnrolled: false,
};

let studentsArr = [student, student2, student3, student4];

//TODO: Jimi H. below has a grades property that is an array of grades. Can you use .reduce() to make a gradeObject with a number property of what number grade it is followed by a value of the grade?
//EX: { 1: 88, 2: 85, 3: 100, 4: 92, 5: 78, 6: 86 }

let jimiGrades = student.grades.reduce(function (total, student, index) {
  total += Object.assign(`${index + 1}:${student}, `);

  return total;
}, {});

console.log(jimiGrades);

//TODO: Use .filter() to make an array of students who are currently enrolled in studentsArr.

//TODO: Can you filter our students and give me back all students who averaged 80 and above regardless of enrollment status?

//.map()
//TODO: Can you use .map() to return an array from a student.grades that is an array of the letter grade?
//Example:
// [92, 75, 55, 92, 78, 98]
// [A, C, F, A, C, A]
