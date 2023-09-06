$(function () {
  alert("Document has loaded!");
  console.log($("p"));
});

//console.log the innerHTML of a p tag
console.log($("p").html());

//logs the innerHTML of the element with the #ice-cream-list id
console.log($("#ice-cream-list").html());

//logs the css value of a specific css attribute
console.log($("p").css("border"));

//these jQuery "gets" can be stored in a variable
let test = $("p").css("border");
console.log(test);

//you can also use these to set information by passing an argument into the parenthesis
let myNewParagraph =
  "One day I was in class at Codeup in San Antonio and this crazy thing happened....I learned about jQuery!";
$("p").html(myNewParagraph);

//Method chaining example
$("p")
  .css("color", "cornflowerblue")
  .css("border", "1px black dashed")
  .css("background", "purple");
