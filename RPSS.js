//hi I'm making a rock paper scissors game i wanna die

//let's select everything we need here:
const more = document.querySelector(".up");
const less = document.querySelector(".down");
const done = document.querySelector(".done");
const replayBtn = document.querySelector(".replay");
const stopBtn = document.querySelector(".stop");
const playerChoiceImg = document.querySelector(".playerChoiceImg");
const computerChoiceImg = document.querySelector(".computerChoiceImg");

const choices = {
  ".rock": 0,
  ".paper": 1,
  ".scissors": 2,
};

function colorAnimation(element, originalColor, newColor, n) {
  const tl = gsap.timeline({ duration: n });
  tl.fromTo(
    element,
    { background: originalColor },
    { background: newColor, ease: "power1.out" },
    "<"
  );
  tl.reverse(n);
}

function playround(
  playerSelection,
  computerSelection,
  n,
  result,
  playerCount,
  computerCount
) {
  if (playerSelection == computerSelection) {
    result = "round " + n + " is a tie";
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "rock")
  ) {
    result =
      "you've won round " +
      n +
      " ! " +
      playerSelection +
      " beats " +
      computerSelection;
    playerCount++;
  } else if (
    (computerSelection == "rock" && playerSelection == "scissors") ||
    (computerSelection == "scissors" && playerSelection == "paper") ||
    (computerSelection == "paper" && playerSelection == "rock")
  ) {
    result =
      "you've lost round " +
      n + ", "+
      computerSelection +
      " beats " +
      playerSelection;
    computerCount++;
  }
  return [result, playerCount, computerCount];
}

function getComputerChoice() {
  let random = Math.floor(Math.random() * 3);
  for (let [choice, index] of Object.entries(choices)) {
    if (random == index) {
      return choice;
    }
  }
}

function getPlayerChoice() {
  return new Promise((resolve) => {
    for (let [choice, index] of Object.entries(choices)) {
      const element = document.querySelector(choice);
      element.addEventListener("click", function () {
        resolve(choice);
      });
    }
  });
}

function removeDot(string) {
  return string.replace(/\./g, "");
}

function writeInContent(element, content) {
  const el = document.querySelector(element);
  el.textContent = content;
}

function getRoundNumber() {
  return new Promise((resolve) => {
    var i = 0;
    writeInContent(".rounds p", i);
    done.style.background = "rgb(174, 186, 197)";
    gsap.fromTo(
      ".rounds",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.4)" }
    );

    more.addEventListener("click", function () {
      i++;
      writeInContent(".rounds p", i);
      if (i <= 0) {
        done.style.background = "rgb(174, 186, 197)";
      } else {
        done.style.background = "rgb(209, 226, 242)";
      }
    });
    less.addEventListener("click", function () {
      if (i > 0) {
        i--;
      }
      writeInContent(".rounds p", i);
      if (i <= 0) {
        done.style.background = "rgb(174, 186, 197)";
      } else {
        done.style.background = "rgb(209, 226, 242)";
      }
    });

    done.addEventListener("click", function () {
      if (i > 0) {
        gsap.to(".rounds", { scale: 0, y: -10, duration: 0.2 });
        resolve(i);
      }
    });
  });
}

function finalResult(playerCount, computerCount, replay) {
  return new Promise((resolve) => {
    if (playerCount > computerCount) {
      writeInContent(
        ".finalResult p",
        "You've won the game!"
      );
    } else if (playerCount < computerCount) {
      writeInContent(
        ".finalResult p",
        "You've lost the game :("
      );
    } else {
      writeInContent(".finalResult p", "The game is a tie.");
    }
    gsap.fromTo(
      ".finalResult",
      { y: -10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }
    );
    stopBtn.addEventListener("click", function () {
      gsap.to(".finalResult", { opacity: 0, y: -10 });
      replay = false;
      const tl = gsap.timeline({defaults: {duration: 1}})
      tl.fromTo(
        ".endRectangle",
        { height: 0, scale: 1 },
        { height: "100%", scale: 1, duration: 1, ease: "bounce.out" }
      );
      tl.to(".gameOver", { opacity: 1, duration:0.5 });
      resolve(replay);
    });
    replayBtn.addEventListener("click", function () {
      gsap.to(".finalResult", { opacity: 0, y: -10, scale: 0, duration: 0.3 });
      replay = true;

      resolve(replay);
    });
  });
}

function updateChoice(choice, container) {
  if (choice == "rock") {
    container.textContent = "✊";
  } else if (choice == "paper") {
    container.textContent = "✋";
  } else if (choice == "scissors") {
    container.textContent = "✌️";
  }
}

function iconsAnimate(buttonName) {
  button = document.querySelector(buttonName);
  var icon = button.querySelector(".icon");
  button.addEventListener("mouseover", function () {
    gsap.to(icon, { duration: 1, ease: "elastic.out(1, 0.3)", y: -5 });
  });
  button.addEventListener("mouseout", function () {
    gsap.to(icon, { duration: 1, ease: "elastic.out(1, 0.3)", y: 0 });
  });
}

async function game() {
  var computerCounter,
    scoreText,
    roundNumber,
    playerCounter,
    result,
    replay = true;

  while (replay == true) {
    //initialize eveything
    computerCounter = 0;
    playerCounter = 0;
    computerChoiceImg.textContent = "❔";
    playerChoiceImg.textContent = "❔";
    writeInContent(
      ".score",
      "score: " + playerCounter + " - " + computerCounter
    );
    writeInContent(".result", "");

    //number of rounds for the loop
    roundNumber = await getRoundNumber();
    iconsAnimate(".rock");
    iconsAnimate(".paper");
    iconsAnimate(".scissors");
    for (var i = 1; i <= roundNumber; i++) {
      //get computer and player choices and put them in computerChoire/playerChoice
      var computerChoice = removeDot(getComputerChoice());
      var playerChoice = await getPlayerChoice();
      playerChoice = removeDot(playerChoice);

      //since js is shit and a function can only return one thing i made atable w 3 elements
      //tab[0] has the result text
      var tab = playround(
        playerChoice,
        computerChoice,
        i,
        result,
        playerCounter,
        computerCounter
      );
      updateChoice(computerChoice, computerChoiceImg);
      updateChoice(playerChoice, playerChoiceImg);
      writeInContent(".result", tab[0]);
      playerCounter = tab[1];
      computerCounter = tab[2];
      scoreText = "score: " + playerCounter + " - " + computerCounter;
      writeInContent(".score", scoreText);
    }
    //final result + asks for replay
    replay = await finalResult(playerCounter, computerCounter, replay);
  }
}

game();
