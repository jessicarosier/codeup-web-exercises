"use strict";
let textDisplay = $("#text-appear");
let refreshButton = $("#reset");
let hintButton = $("#get-hint");
let secretCode = "";
let audio = "";
let html = "";

let passcodes = [
  {
    key: "cat",
    passcode: "676584",
    img: "img/konami/cat.jpg",
    audio: "audio/meow.mp3",
  },
  {
    key: "dog",
    passcode: "687971",
    img: "img/konami/dog.jpg",
    audio: "audio/bark.mp3",
  },
  {
    key: "bird",
    passcode: "66738268",
    img: "img/konami/bird.jpg",
    audio: "audio/chirp.mp3",
  },
  {
    key: "konami",
    passcode: "3838404037393739666513",
    img: "img/konami/konami-code.jpeg",
    audio: "audio/konami.mp3",
  },
  {
    key: "pokemon",
    passcode: "80797569777978",
    img: "img/konami/pikachu.jpg",
    audio: "audio/pikachu.mp3",
  },
  {
    key: "spongebob",
    passcode: "838079787169667966",
    img: "img/konami/spongebob.jpg",
    audio: "audio/pikachu.mp3",
  },
];

function displayPasscode(passcode) {
  let html = "";
  html += `<p class="fs-3">You cracked the <span class="text-uppercase text-danger">${passcode.key}</span> code!</p>`;
  html += `<img src=${passcode.img} class="h-auto w-50""/>`;

  return html;
}

$("body").on(`keyup`, (event) => {
  event.preventDefault();
  $("#konami-header").css("color", "red");
  let code = event.keyCode;
  secretCode += code;
  textDisplay.html(secretCode);
  console.log(secretCode);

  for (let i = 0; i < passcodes.length; i++) {
    // textDisplay.html(secretCode);
    if (passcodes[i].passcode === secretCode) {
      console.log(passcodes[i].passcode);
      html = "";
      html += displayPasscode(passcodes[i]);
      audio = new Audio(passcodes[i].audio);
      console.log(audio);
      textDisplay.html(html);
      audio.play();
    }
  }
});

refreshButton.on(`click`, (event) => {
  location.reload();
});

hintButton.on(`click`, (event) => {
  let hints = [
    "Who lives in a pineapple under the sea?",
    "Gotta catch em all!",
    "meow",
    "woof!",
    "chirp chirp",
    "NES 1986",
  ];
  let hintHtml = `<p>${hints[Math.floor(Math.random() * hints.length)]}</p>`;
  textDisplay.html(hintHtml);
});
