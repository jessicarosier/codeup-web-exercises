"use strict";

console.log("Hello from external JavaScript.");
alert("Welcome to my Website!");

let userFavoriteColor = prompt("What is your favorite color?");
alert("Great, " + userFavoriteColor + " is my favorite color too!");

// You have rented some movies for your kids: The little mermaid (for 3 days), Brother Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're going to like it). If price for a movie per day is $3, how much will you have to pay?

let littleMermaidDays = 3,
    brotherBearDays = 5,
    herculesDays = prompt("How many days did you keep Hercules?"),
    pricePerDay = 3,
    totalRentalPrice = (littleMermaidDays * pricePerDay) + ((Number(brotherBearDays)) * pricePerDay) + (herculesDays * pricePerDay);
alert("You owe $" + totalRentalPrice + " for your movie rentals!");


// Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook, they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350. How much will you receive in payment for this week? You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon.

let googlePayRate = 400,
    amazonPayRate = 380,
    facebookPayRate = 350,
    googleHoursWorked = 6,
    amazonHoursWorked = 4,
    facebookHoursWorked = 10,
    totalWeeklyPay = (googlePayRate * googleHoursWorked) + (amazonPayRate * amazonHoursWorked) + (facebookPayRate * facebookHoursWorked);
alert("Your total weekly pay this week is $" + totalWeeklyPay);

// A student can be enrolled in a class only if the class is not full and the class schedule does not conflict with her current schedule.

let classSize = prompt("How many students are enrolled in the class?"),
    classNotFull = Number(classSize) <= 50,
    noScheduleConflict = confirm("Click OK if you do not have a schedule conflict, otherwise click Cancel."),
    canEnrollInClass = classNotFull && noScheduleConflict;

alert("It is " + canEnrollInClass + " that you can enroll in this class.");


// A product offer can be applied only if a person buys more than 2 items, and the offer has not expired. Premium members do not need to buy a specific amount of products.


let itemsPurchased = prompt("How many items did you purchase?"),
    isPremiumMember = confirm("Click OK if your are a premium member, otherwise click Cancel."),
    offerNotExpired = confirm("Click OK is the offer is NOT expired, otherwise click Cancel."),
    productOfferIsApplied = ((Number(itemsPurchased)) > 2 || isPremiumMember) && offerNotExpired;
alert("It is " + productOfferIsApplied + " that the offer can be applied.");


















