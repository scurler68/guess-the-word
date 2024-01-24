//variables to target different elements of the Word Game page
const listOfGuessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesContainer = document.querySelector(".remaining");
let remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia"; //starting word to use for testing
let guessedLetters = []; //array to capture guessed letters
let remainingGuesses = 8;

//FUNCTION TO GET A LIST OF WORDS
const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n"); //change the words into an array
  const randomIndex = Math.floor(Math.random() * wordArray.length); //pull random index for a word
  word = wordArray[randomIndex].trim(); //trim out white space
  placeholder(word);
};

//BEGINNING OF GAME
getWord();

//DISPLAY WORD AS DOTS AS PLACEHOLDERS
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

//EVENT LISTENER FOR THE BUTTON
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = ""; //clear message paragraph
  const guess = letterInput.value; //capture user's input
  const validGuess = validateInput(guess); //Call validateInput function and pass to user's input value

  if (validGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//FUNCTION TO CHECK THE USER'S INPUT
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/; //regular expression to ensure the user inputs a letter
  if (input.length === 0) {
    message.innerText = `You didn't type anything, silly!`;
  } else if (input.length > 1) {
    message.innerText = `You may only enter 1 letter at a time.`;
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Only A to Z, please.`;
  } else {
    return input;
  }
};

//FUNCTION TO CONVERT LETTER TO UPPER CASE, ENSURE ONLY 1 LETTER ENTERED, AND PUSH TO ARRAY
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already tried that letter.";
  } else {
    guessedLetters.push(guess);
    countGuesses(guess);
    viewGuesses();
    updateWordInProgress();
  }
};

//FUNCTION TO DISPLAY GUESSED LETTERS
function viewGuesses(letter) {
  listOfGuessedLetters.innerHTML = ""; //clear list of guessed letters
  let listItems = ""; //empty string to accumulate HTML content for each guessed letter

  //concatenate each list item as they are created
  guessedLetters.forEach(function (guessedLetters) {
    listItems += `<li>${guessedLetters}</li>`;
  });
  //then display the list
  listOfGuessedLetters.innerHTML = listItems;
}

//FUNCTION TO UPDATE THE WORD IN PROGRESS
const updateWordInProgress = function () {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("●");
    }
  }
  //console.log(showWord);
  wordInProgress.innerText = showWord.join("");
  verifyWin();
};

//FUNCTION TO UPDATE REMAINING GUESSES
const countGuesses = function (guess) {
  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess)) {
    message.innerText = "Sorry, that letter isn't in the word.";
    remainingGuesses -= 1;
  } else {
    message.innerText = "Great guess!";
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over.  The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//FUNCTION TO SEE IF PLAYER WON
const verifyWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    startOver();
  }
};

//FUNCTION TO START OVER
const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesContainer.classList.add("hide");
  listOfGuessedLetters.classList.add("hide");
  playAgain.classList.remove("hide");
};

//FUNCTION TO MAKE PLAY AGAIN BUTTON WORK
playAgain.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  listOfGuessedLetters.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessButton.classList.remove("hide");
  remainingGuessesContainer.classList.remove("hide");
  listOfGuessedLetters.classList.remove("hide");
  playAgain.classList.add("hide");
  getWord();
});
