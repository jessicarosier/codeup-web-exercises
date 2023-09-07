"use strict";

let textDisplay = $("#text-appear");
let secretCode = "";
let audio = "";
let html = "Begin typing...";

let passcodes = [
  {
    key: "cat",
    passcode: "77697987",
    img: "img/konami/cat.jpg",
    audio: "audio/meow.mp3",
  },
  {
    key: "dog",
    passcode: "66658275",
    img: "img/konami/dog.jpg",
    audio: "audio/bark.mp3",
  },
  {
    key: "bird",
    passcode: "6772738280",
    img: "img/konami/bird.jpg",
    audio: "audio/chirp.mp3",
  },
  {
    key: "konami",
    passcode: "3838404037393739666513",
    img: "img/konami/konami-code.jpeg",
    audio: "audio/konami.mp3",
  },
];

textDisplay.html(html);

function renderPasscode(passcode) {
  let html =
    '<div class="d-flex flex-column justify-content-center align-items-center">';
  html += `<p>You cracked the ${passcode.key}</p>`;
  html += `<img src=${passcode.img} class="h-auto w-25""/>`;
  html += `</div>`;
  return html;
}

$("body").on(`keyup`, (event) => {
  let code = event.keyCode;
  secretCode += code;
  textDisplay.html(secretCode);

  for (let i = 0; i < passcodes.length; i++) {
    if (passcodes[i].passcode == secretCode) {
      console.log(passcodes[i].passcode);
      html = "";
      html += renderPasscode(passcodes[i]);
      audio = new Audio(passcodes[i].audio);
    }
  }
  textDisplay.html(html);
  audio.play();
});
