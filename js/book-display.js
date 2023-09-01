// TODO: Reference your past code or write fresh code to make a book object. This object should have properties to store the book's title, the book's author, and (optionally) the genre or another property that would make sense for the object to have.

let book = {
  title: "To Kill a Mockingbird",
  author: { firstName: "Harper", lastName: "Lee" },
  genre: "Fiction",
};

//TODO: Uncomment the following variable - fill in the string interpolation expressions to access the properties of your book to finish the following card.

let myCard = `<div class="bookCard f-flex flex-column justify-content-center align-items-center">
    <div>Book Title: ${book.title}.</div>
    <div>Book Author: ${book.author.firstName}.</div>
    <div>Book Genre: ${book.genre}.</div>
</div>`;

//TODO: Using JavaScript, add your finished HTML card to the DOM so our users will be able to see it on page load. We want target the innerHTML of #container.

// document.getElementById("container").innerHTML = myCard;

//TODO: From prior work or fresh in this file, let's make an array of book objects (at least three).
let arrayOfBooks = [];

function createBook(title, firstname, lastname, genre) {
  return {
    title: title,
    author: {
      firstName: firstname,
      lastName: lastname,
    },
    genre: genre,
  };
}

arrayOfBooks.push(
  createBook(
    "The Perks of Being a Wallflower",
    "Stephen",
    "Chbosky",
    "Fiction",
  ),
);

arrayOfBooks.push(
  createBook("Moby Dick", "Herman", "Melville", "Adventure fiction"),
);

arrayOfBooks.push(
  createBook(
    "Brown Bear, Brown Bear, What Do You See?",
    "Bill",
    "Martin",
    "Children's Literature",
  ),
);

arrayOfBooks.push(
  createBook("Cant Hurt Me", "David", "Goggins", "Motivational"),
);

arrayOfBooks.push(createBook("Start With Why", "Simon", "Sinek", "Self-help"));

//TODO: Refactor your above code - our HTML needs to build three HTML cards with the information from the objects. Hint: We would want to iterate through the array and add each fresh bit of HTML into the variable of allCards set up below.

let allCards = [];

for (let i = 0; i < arrayOfBooks.length; i++) {
  allCards.push(`<div class="bookCard d-flex flex-column justify-content-center align-items-start" style="min-width: 600px;">
    <div><span class="fw-bold">Book Title:</span> ${arrayOfBooks[i].title}.</div>
     <div><span class="fw-bold">Book Author:</span> ${arrayOfBooks[i].author.firstName} ${arrayOfBooks[i].author.lastName}.</div>
     <div><span class="fw-bold">Book Genre:</span> ${arrayOfBooks[i].genre}.</div>
 </div>`);
}

// console.log(allCards);
//
// document.getElementById("container").innerHTML = allCards;

let container = document.getElementById("container");
let openBookButton = document.getElementById("open-books");
let closeBookButton = document.getElementById("close-books");

openBookButtonListener = (e) => {
  container.innerHTML = allCards.join("");
  // openBookButton.innerHTML = hideOpenButton;
  openBookButton.classList.add("d-none");
  closeBookButton.classList.remove("d-none");
};

openBookButton.addEventListener(`click`, openBookButtonListener);

closeBookButtonListener = (e) => {
  container.innerHTML = "";
  openBookButton.classList.remove("d-none");
  closeBookButton.classList.add("d-none");
};

closeBookButton.addEventListener(`click`, closeBookButtonListener);
