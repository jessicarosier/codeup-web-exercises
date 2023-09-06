//declares variable to target all h1, p, and li elements
let header = $("h1");
let paragraphs = $("p");
let listItems = $("li");

$(function () {
  // alerts the content of the element with an id of #main-header
  alert($("#main-header").html());
});

//overrides the css properties of all elements with a class of .codeup and applies a specified border
$(".codeup").css("border", "1px solid red");

$("#red-item").css("color", "red");
$("#orange-item").css("color", "orange");
$("#yellow-item").css("color", "yellow");

//overrides the css properties of all list items and sets the font size to the specified value
listItems.css("font-size", "20px");

//overrides the css properties of all elements captured in each variable and sets the background-color to the specified value
header.css("background-color", "yellow");
header.css("text-transform", "uppercase");
paragraphs.css("background-color", "dogerblue");
listItems.css("background-color", "limegreen");
