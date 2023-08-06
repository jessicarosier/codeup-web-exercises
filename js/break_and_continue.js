// Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.
//condition must stay true for it to keep looping
//TODO: come back to this, how can I use a break statement in this?!?!

let userInput = parseFloat(prompt("Enter an odd number between 1 and 50:"));

while (userInput % 2 === 0 || userInput < 1 || userInput > 50) {
    alert("Invalid input");
    userInput = parseFloat(prompt("Enter an odd number between 1 and 50:"));
}


// // Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.
//
// let userInput = (parseInt(prompt("Enter a number:")))
console.log(`The number to skip is: ${userInput}`)
for (let n = 0; n <= 50; n++) {
    if (n % 2 === 0) {
        continue;
    }
    if (n === userInput) {
        console.log(`Yikes! Skipping number: ${userInput}`)
        continue;
    }
    console.log(n)
}









