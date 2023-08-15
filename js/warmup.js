// Create a function called logUser. This function will accept a string argument and return a message that says “stringArgument has logged in for the day”. Console.log your results to verify the message.
// console.log(logUser(“ken2cool”)) // “ken2cool has logged in for the day.”

function logUser(username) {
  if (typeof username !== "string" || !isNaN(username)) {
    return `Invalid input.`;
  } else {
    return `${username} has logged in for the day.`;
  }
}

console.log(logUser("6"));
console.log(logUser("Jessica"));
console.log(logUser(23));
console.log(logUser(["Jessica"]));
console.log(logUser("Jessica 1991"));
