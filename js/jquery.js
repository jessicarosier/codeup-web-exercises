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
    img: "img/konami/pokemon.jpeg",
    audio: "audio/pokemon.mp3",
  },
  {
    key: "spongebob",
    passcode: "838079787169667966",
    img: "img/konami/spongebob.png",
    audio: "audio/spongebob.mp3",
  },
  {
    key: "mario",
    passcode: "7765827379",
    img: "img/konami/mario.jpg",
    audio: "audio/mario.mp3",
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
  textDisplay.css("color", "blue");
  let code = event.keyCode;
  secretCode += code;
  textDisplay.html(secretCode);
  console.log(secretCode);

  for (let i = 0; i < passcodes.length; i++) {
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

$("#konami-header")
  .on("mouseenter", function () {
    $(this).css("color", "red");
  })
  .on("mouseleave", function () {
    $(this).css("color", "white");
  });

hintButton.on(`click`, (event) => {
  secretCode = "";
  let hints = [
    "Who lives in a pineapple under the sea?",
    "Gotta catch em all!",
    "meow",
    "woof!",
    "chirp chirp",
    "NES 1986",
    "ITSA MEEEE",
  ];
  let hintHtml = `<p>${hints[Math.floor(Math.random() * hints.length)]}</p>`;
  textDisplay.html(hintHtml);
});

hintButton
  .on(`mouseenter`, function () {
    $(this).css("font-size", "50px").css("background-color", "blue");
  })
  .on(`mouseleave`, function () {
    $(this).css("font-size", "inherit").css("background-color", "red");
  });

//you can store css properties inside an object variable and pass the variable into the .css() method.
//Example below:
let h1StyleObj = {
  color: "grey",
};

$("h1").css(h1StyleObj);

//toggle
//will turn something on and off
//example: use on a button

// $("li").each(function (index) {
//   if (index % 2 === 0) {
//     $(this).html(` haha - hacked you`);
//   }
// });
//
// $("li").first().css("font-size", "60px");
//
// $("li").last().css("background-color", "blue");
