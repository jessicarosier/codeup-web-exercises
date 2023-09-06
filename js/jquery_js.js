//declares variable to target all h1, p, and li elements
let header = $("h1");
let paragraphs = $("p");
let listItems = $("li");

$(function () {
  // alerts the content of the element with an id of #main-header
  // alert($("#main-header").html());
});

//overrides the css properties of all elements with a class of .codeup and applies a specified border
// $(".codeup").css("border", "1px solid red");
//
// $("#red-item").css("color", "red");
// $("#orange-item").css("color", "orange");
// $("#yellow-item").css("color", "yellow");

//overrides the css properties of all list items and sets the font size to the specified value
// listItems.css("font-size", "20px");

//overrides the css properties of all elements captured in each variable and sets the background-color to the specified value
// header.css("color", "yellow");
// header.css("text-transform", "uppercase");
// paragraphs.css("background-color", "dogerblue");
// listItems.css("background-color", "limegreen");

//This syntax is deprecated, new preferred syntax uses .on("event", function)
// $("#main-header").click(function () {
//   $(this).html("Hello Codeup");
// });

//Below is a new proper syntax
header.on("click", function () {
  $(this).css("background-color", "rebeccapurple");
  $(this).html("Hello Codeup!");
});

//calls an event listener on all elements captured in the listItems variable. The first function changes the background color when the mouse hover first "enters" the element, the second function changes the background color of the element when the mouse hover "exits" the element.
listItems
  .on("mouseenter", function () {
    $(this).css("color", "red");
    $(this).css("font-size", "40px");
  })
  .on("mouseleave", function () {
    $(this).css("color", "black");
    $(this).css("font-size", "20px");
  });

$("p").on("dblclick", function () {
  $(this).css("font-size", "18px");
});

//targets a button that exists in my HTML
$("#ogButton").on("click", displayNew);
//you can target an HTML element that does not permanently exist in the DOM (or ode not yet exist) by targeting its parent that DOES exist in the DOM and passing a middle argument to the event listener
//below targets a button that will ony exists after the displayNew function is ran
$("body").on("click", "#new-button", buttonCeption);
function displayNew() {
  let innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
<h1>Did this work</h1>
<button id="new-button">Now click me </button>
</div>`;
  $("#display-new").html(innerHTML);
}

function buttonCeption() {
  let innerHTML = `<div class="new-div d-flex flex-column justify-content-center align-items-center">
<h1>Yes it did!</h1>
</div>`;
  $("#display-new").html(innerHTML);
}
