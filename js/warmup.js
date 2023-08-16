// Create an object literal with the following properties: a string property called “username” and a string property called “email” with string values representing the property name to them.
// Assign your object literal into a variable called “userObject”. Console.log the objects properties to verify your values are assigned into the object properly.
// console.log(userObject.username) // “ken2cool”
// console.log(userObject.email) // “ken2cool@yahoo.com”
// Bonus:
// I. Refactor your logUser function to use your userObject’s property of username vs. an hardcoded string literal argument - update the string return from logUser to also include the userObject.email property e.g.: “ken2cool with email ken2cool@yahoo.com has logged in for the day.”
// Ii. Refactor your userObject to have a userRoles property that is an array of strings listing the user’s roles - e.g “admin”, “moderator”, “buyer”, “seller” and other hypothetical roles a user could have on a website
// Iii. Refactor your user object to have a nested userProfile object property - this nested property should have a userProfileUrl property with a string value mocking a link to an image. The other property should be a userLocation property with a string value mocking a CityName, StateName location the user could be from. Finally, add a property called numLikes with a number value indicating the users received ‘likes’ in our hypothetical application.

let userObject = {
  username: "jessicarosier",
  email: "jessica.c.rosier1@gmail.com",
  userRoles: ["admin", "moderator"],
  // userProfile: {
  //   userProfileUrl: "https://www.linkedin.com/in/jessica-rosier/",
  //   userLocation: "Anaheim, CA",
  //   numLikes: 2,
  // },
};

console.log(userObject);
console.log(userObject.email);
console.log(userObject.userRoles[0]);

// Create a function called logUser. This function will accept a string argument and return a message that says “stringArgument has logged in for the day”. Console.log your results to verify the message.
// console.log(logUser(“ken2cool”)) // “ken2cool has logged in for the day.”
userObject.userProfile = {
  userProfileUrl: "https://www.linkedin.com/in/jessica-rosier/",
  userLocation: "Anaheim, CA",
  numLikes: 2,
};
function logUser(object) {
  if (typeof object.username !== "string" || !isNaN(object.username)) {
    return `Invalid username.`;
  } else {
    return `${object.username} with email ${
      object.email
    } has logged in for the day. User has the following roles assigned: ${object.userRoles.join(
      ",",
    )}`;
  }
}

console.log(logUser(userObject));
