(function () {
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */

    // let person = {
    //     firstName: "Jessica",
    //     lastName: "Rosier"
    // }
    //
    // console.log(person.firstName);
    // console.log(person.lastName);

    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */

    // person.sayHello = function () {
    //     return "Hello from " + this.firstName + " " + this.lastName + "!";
    // }
    // console.log(person.sayHello());

    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

        //discount = 12%
        // if shopper spends > 200
        //get discount == true
        //else false
        //console.log this information (nameOfPerson + amountBeforeDiscount + theDiscount(if applicable) + amountAfterDiscount.
        //objects for each person, stored in an array
        //Cameron - 180
        //Ryan - 250
        //George 320


    var shoppers = [
            {name: 'Cameron', amount: 180},
            {name: 'Ryan', amount: 250},
            {name: 'George', amount: 320}
        ];

    let theDiscount = 0.12;
    for (let i = 0; i < shoppers.length; i++) {
        let discountTrue = shoppers[i].amount > 200;
        let amountAfterDiscount = shoppers[i].amount * theDiscount;
        if (discountTrue) {
            console.log(`${shoppers[i].name} got a discount of ${theDiscount}%. Their total before the discount was $${shoppers[i].amount}. Their total after the discount was $${amountAfterDiscount}.`);
        } else {
            console.log(`${shoppers[i].name} did not get a discount. Their total before the discount was $${shoppers[i].amount}.`);
        }

    }


    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */
        //create 5 objects representing books
        //each objects should have 2 properties
        //property 1 = title, property 2 = object (firstName, lastName)
        //create an array with all 5 book objects

    let bookOne = {
            title: "The Catcher in the Rye",
            author: {
                firstName: "Jerome",
                lastName: "Salinger"
            }
        };

    let bookTwo = {
        title: "The Great Gatsby",
        author: {
            firstName: "Scott",
            lastName: "Fitzgerald"
        }
    }

    let bookThree = {
        title: "Moby Dick",
        author: {
            firstName: "Herman",
            lastName: "Melville"
        }
    }

    let bookFour = {
        title: "Hamlet",
        author: {
            firstName: "William",
            lastName: "Shakespeare"
        }
    }

    let bookFive = {
        title: "Pride and Prejudice",
        author: {
            firstName: "Jane",
            lastName: "Austen"
        }
    }

    let books =
        [bookOne, bookTwo, bookThree, bookFour, bookFive];


    console.log(books);


    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adams
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     */

    // for (let i = 0; i < books.length; i++) {
    //     console.log(`Book #${i + 1}`);
    //     console.log(`Title: ${books[i].title}`);
    //     console.log(`Author: ${books[i].author.firstName} ${books[i].author.lastName}`);
    // }

    //refactored loop using informationLog function!
    for (let i = 0; i < books.length; i++) {
        console.log(`Book #${i + 1}`);
        console.log(showBookInfo(books[i]));
    }


    /** TODO:
     * Bonus:
     *   Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function. */
    function createBook(title, firstname, lastname) {
        return {
            title: title,
            author: {
                firstName: firstname,
                lastName: lastname
            }
        }
    }

    books.push(createBook("The Perks of Being a Wallflower", "Stephen", "Chbosky"))

    console.log(books);




    /**TODO:
     *    Create a function named `showBookInfo` that accepts a book object and
     *    outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     */


    function showBookInfo(object) {
        return `Title: ${object.title} \nAuthor: ${object.author.firstName} ${object.author.lastName}`
    };
    //testing informationLog function
    //console.log(informationLog(bookOne));




})();