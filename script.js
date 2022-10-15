/* ELEMENTY */

const memoryArray = [
  "🦒",
  "🦓",
  "🦏",
  "🐈",
  "🐫",
  "🦥",
  "🐘",
  "🦨",
  "🦔",
  "🐿️",
  "🐳",
  "🦞",
  "🦉",
  "🐧",
  "🦘",
];

const assignment = document.querySelector(".grid_assigned");
const attempt = document.querySelector(".grid_player");
const gameResult = document.querySelector(".grid_result");
const keyboard = document.querySelector(".keyboard");
const heading = document.querySelector("h1");
const countDown = document.querySelector(".countdown");

const startButton = document.querySelector(".button");
const resultButton = document.querySelector(".result_button");
const resetButton = document.querySelector(".reset");

const fields = document.querySelectorAll(".grid_assigned_field");
const inputs = document.querySelectorAll(".grid_player_field");
const buttons = document.querySelectorAll(".keyboard button");
const results = document.querySelectorAll(".grid_result_field");
const verdict = document.querySelector(".verdict");
const correct = document.querySelector(".correct");

/* LOADING ANIMALS */

function loadAnimals() {
  fields.forEach((field) => {
    field.innerHTML =
      memoryArray[Math.floor(Math.random() * memoryArray.length)];
  });
  const mediaQuery = window.matchMedia("(min-width: 700px)");
  if (mediaQuery.matches) {
    heading.style.fontSize = "3rem";
  } else {
    heading.style.fontSize = "2rem";
  }
}

/* ZAHAJENI HRY + CASOVY LIMIT NA ZAPAMATOVANI */

startButton.addEventListener("click", () => {
  heading.innerHTML = "You have 20 seconds <br> to remeber all the animals!";
  startButton.classList.add("hidden");
  setTimeout(() => {
    assignment.classList.add("hidden");
    attempt.classList.remove("hidden");
    resultButton.classList.remove("hidden");
    keyboard.classList.remove("hidden");
    countDown.classList.remove("hidden");

    const mediaQuery = window.matchMedia("(min-width: 700px)");
    if (mediaQuery.matches) {
      heading.style.fontSize = "2.5rem";
      countDown.style.fontSize = "2.5rem";
      heading.innerHTML = "Tap a box to add an animal before the time is up!";
    } else {
      heading.style.fontSize = "1.6rem";
      countDown.style.fontSize = "1.6rem";
      heading.innerHTML =
        "Tap a box to add an animal <br> before the time is up!";
    }

    /* COUNTDOWN */

    var timeleft = 59;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        countDown.innerHTML = "";
      } else {
        countDown.innerHTML = timeleft;
      }
      timeleft -= 1;
    }, 1000);
  }, 10000);

  /* CASOVY LIMIT NA VYPLNENI */

  setTimeout(check, 70000);
});

/* PREDCASNE ODEVZDANI KLIKNUTIM NA TLACITKO */

resultButton.addEventListener("click", check);

/* AKTIVNI POLE */

inputs.forEach((policko) => {
  policko.addEventListener("click", function (event) {
    inputs.forEach((policko) => {
      policko.classList.remove("activeField");
    });
    event.target.classList.add("activeField");
  });
});

/* VKLADANI HODNOT Z TLACITEK */

buttons.forEach(function (item) {
  item.addEventListener("click", (event) => {
    const activeField = document.querySelector(".activeField");
    activeField.innerHTML = event.target.innerHTML;
    activeField.classList.remove("activeField");
  });
});

/* KONTROLA VYSLEDKU */

function check() {
  attempt.classList.add("hidden");
  gameResult.classList.remove("hidden");
  resultButton.classList.add("hidden");
  resetButton.classList.remove("hidden");
  keyboard.classList.add("hidden");
  countDown.classList.add("hidden");

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].innerHTML === inputs[i].innerHTML) {
      results[i].innerHTML = inputs[i].innerHTML;
      results[i].classList.add("green");
    } else {
      results[i].innerHTML = fields[i].innerHTML;
      results[i].classList.add("gray");
      results[i].addEventListener("click", () => {
        if (results[i].innerHTML === fields[i].innerHTML) {
          results[i].innerHTML = inputs[i].innerHTML;
          results[i].classList.add("red");
          results[i].classList.remove("gray");
        } else {
          results[i].innerHTML = fields[i].innerHTML;
          results[i].classList.remove("red");
          results[i].classList.add("gray");
        }

        if (results[i].style.transform === "") {
          results[i].style.transform = "rotateY(360deg)";
        } else {
          results[i].style.transform = "";
        }
      });
    }
  }
  const greenResults = document.querySelectorAll(".green");

  let skillEvaluation = "";
  let seeCorrect = "";
  let resultColor = "";
  switch (greenResults.length) {
    case 0:
      skillEvaluation = "Loser!";
      seeCorrect =
        "Tap the boxes you got wrong to view your incorrect solution.";
      resultColor = "crimson";
      break;
    case 1:
    case 2:
    case 3:
      skillEvaluation = "Good effort!";
      seeCorrect =
        "Tap the boxes you got wrong to view your incorrect solution.";
      resultColor = "#FF731D";
      break;
    case 4:
    case 5:
    case 6:
      skillEvaluation = "Well done!";
      seeCorrect =
        "Tap the boxes you got wrong to view your incorrect solution.";
      resultColor = "#3D8361";
      break;
    case 7:
    case 8:
      skillEvaluation = "Nearly perfect!";
      seeCorrect =
        "Tap the boxes you got wrong to view your incorrect solution.";
      resultColor = "#874C62";
      break;
    case 9:
      skillEvaluation = "Unbelievable!";
      seeCorrect = "";
      resultColor = "goldenrod";
      break;
    default:
      skillEvaluation = "Something went wrong...";
  }

  heading.innerHTML = skillEvaluation;
  heading.style.color = resultColor;
  const mediaQuery = window.matchMedia("(min-width: 700px)");
  if (mediaQuery.matches) {
    heading.style.fontSize = "3.5rem";
  } else {
    heading.style.fontSize = "2.5rem";
  }

  verdict.innerHTML =
    "You got " + greenResults.length + " out of " + results.length + " right!";
  correct.innerHTML = seeCorrect;
}
