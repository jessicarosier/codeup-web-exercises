(function() {
    // Create a function named showMultiplicationTable that accepts a number and console.logs the multiplication table for that number (just multiply by the numbers 1 through 10)

    // 7 x 1 = 7
    // 7 x 2 = 14
    // 7 x 3 = 21
    // 7 x 4 = 28
    // 7 x 5 = 35
    // 7 x 6 = 42
    // 7 x 7 = 49
    // 7 x 8 = 56
    // 7 x 9 = 63
    // 7 x 10 = 70

// function showMultiplicationTable(number) {
//     for(let x=1; x <= 10; x++) {
//         console.log(number + " x " + x + " = " + (x * number));
//     }
// }
// showMultiplicationTable(7)


//2 - Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even.
//     123 is odd
//     80 is even
//     24 is even
//     199 is odd


// for(x = 1; x <=10; x++) {
//     let random = Math.floor((Math.random() * 200) + 20);
//     if (random % 2 === 0) {
//         console.log (random + " is even.");
//     } else {
//         console.log (random + " is odd.");
//     }
// }


//TODO: come back to this one later....brain hurts, this works but i dont completely understand it
//4 - Create a for loop that uses console.log to create the output shown below.
//     1
//     22
//     333
//     4444
//     55555
//     666666
//     7777777
//     88888888
//     999999999

// for(x = 1; x <= 9; x++) {
//     for(y = 1; y <= x; y++) {
//         console.log(x);
//     }
// }





//5 - Create a for loop that uses console.log to create the output shown below.
//     100
//     95
//     90
//     85
//     80
//     75
//     70
//     65
//     60
//     55
//     50
//     45
//     40
//     35
//     30
//     25
//     20
//     15
//     10
//     5

// for (let x = 100; x >= 5; x -=5 ) {
//   console.log(x)
// }





})();