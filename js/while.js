// Create a while loop that uses console.log() to create the output shown below.
// 2
// 4
// 8
// 16
// 32
// 64
// 128
// 256
// 512
// 1024
// 2048
// 4096
// 8192
// 16384
// 32768
// 65536

// let x = 2;
// while (x <= 65536) {
//     console.log(x);
//      x = x * 2;
// }

// An ice cream seller can't go home until she sells all of her cones. First write enough code that generates a random number between 50 and 100 representing the amount of cones to sell before you start your loop. Inside of the loop your code should generate another random number between 1 and 5, simulating the amount of cones being bought by her clients. Use a do-while loop to log to the console the amount of cones sold to each person. The below code shows how to get the random numbers for this exercise.

//Output example:
// 5 cones sold...  // if there are enough cones
// Cannot sell you 6 cones I only have 3...  // If there are not enough cones
// Yay! I sold them all! // If there are no more cones
// 5 cones sold...  // if there are enough cones
// Cannot sell you 6 cones I only have 3...  // If there are not enough cones
// Yay! I sold them all! // If there are no more cones


let allCones = Math.floor(Math.random() * 50) + 50;
let conesSold = "";
let conesLeft = "";


console.log(`I started with ${allCones} cones.`);
do {
    conesSold = Math.floor(Math.random() * 5) + 1;
    if (conesSold > allCones) {
        console.log(`Cannot sell you ${conesSold} cones I only have ${allCones}`);
    }

    if (conesSold <= allCones) {
        conesLeft = allCones - conesSold;

    }
    allCones = conesLeft;


    if (conesLeft < conesSold) {
        console.log(`Cannot sell you ${conesSold} cones I only have ${conesLeft}`);
        break;
    } else if (conesLeft > conesSold) {
        console.log(`${conesSold} cones sold...`);
    } else {
        console.log("Yay! I sold them all!");
    }
    console.log(`I have ${conesLeft} cones left.`);
    allCones = conesLeft;
} while (allCones >= 0)



















