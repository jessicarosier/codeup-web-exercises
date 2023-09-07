"use strict";

let textDisplay = $("#text-appear");
let secretCode = "";
let meowAudio = new Audio("audio/meow.mp3");
let barkAudio = new Audio("audio/bark.mp3");
let chirpAudio = new Audio("audio/chirp.mp3");
let konamiAudio = new Audio("audio/konami.mp3");

let catPhrase = "77697987";
let dogPhrase = "66658275";
let birdPhrase = "6772738280";
let konamiCode = "3838404037393739666513";
let html = "";

function renderHtml() {
  html = `
<p>"YOU CRACKED THE CODE!"</p>
<img src="img/konami/bird.jpg" class="h-auto w-25">`;
  textDisplay.html(html);
}

$("body").on("keyup", function (event) {
  event.preventDefault();
  let code = event.keyCode;
  secretCode += code;
  textDisplay.html(secretCode);
  console.log(secretCode);
  if (secretCode === catPhrase) {
    html = `
<p>"YOU CRACKED THE CODE! MEOW"</p>
<img src="img/konami/cat.jpg" class="h-auto w-25">`;
    meowAudio.play();
    textDisplay.html(html);
  }

  if (secretCode === dogPhrase) {
    html = `
<p>"YOU CRACKED THE CODE! BARK"</p>
<img src="img/konami/dog.jpg" class="h-auto w-25">`;
    barkAudio.play();
    textDisplay.html(html);
  }

  if (secretCode === birdPhrase) {
    html = `
<p>"YOU CRACKED THE CODE! CHIRP"</p>
<img src="img/konami/bird.jpg" class="h-auto w-25">`;
    chirpAudio.play();
    textDisplay.html(html);
  }

  if (secretCode === konamiCode) {
    html = `
<p>"YOU CRACKED THE <span id="konami-span" class="fw-bolder fs-4">KONAMI</span> CODE!"</p>
<img src="img/konami/konami-code.jpeg" class="h-auto w-50">`;
    konamiAudio.play();
    textDisplay.html(html);
    alert("You have added 30 lives!");
  }
});
