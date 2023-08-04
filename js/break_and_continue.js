// Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.
//condition must stay true for it to keep looping

let userNumber = parseFloat(prompt("Enter an odd number between 1 and 50:"));

while (userNumber % 2 === 0 || userNumber <1 || userNumber > 50) {
    alert("Invalid input");
    userNumber = parseFloat(prompt("Enter an odd number between 1 and 50:"));
}




// // Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.
//
// let userInput = (parseInt(prompt("Enter a number:")))
// console.log(`The number to skip is: ${userInput}`)
// for (let n = 0; n <= 50; n++) {
//     if (n % 2 === 0) {
//         continue;
//     }
//     if (n === userInput) {
//         console.log(`Yikes! Skipping number: ${userInput}`)
//         continue;
//     }
//    console.log(n)
// }









