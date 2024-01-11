//variables to target different elements of the Word Game page
const listOfGuesses = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

//starting word to use for testing
const word = "Magnolia";

//array to capture guessed letters
const guessedLetters = [];

//DISPLAY WORD AS DOTS
//split word (a string) apart into individual characters
const wordArray = word.split("");

//function to replace each character with a dot
function replaceWithDot() {
  return "●";
}

//map the wordArray to create an array of dots
const dotArray = wordArray.map(replaceWithDot);

// Join the dotArray elements into a string
const dotWord = dotArray.join("");

//Display dots for the wordInProgress on the page
wordInProgress.innerText = dotWord;

//EVENT LISTENER FOR THE BUTTON
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const userInput = letterInput.value; //Capture user's input
  const validatedInput = validateInput(userInput); //Call validateInput function and pass to user's input value
  makeGuess(validatedInput);
  console.log(guessedLetters);
});

//FUNCTION TO CHECK THE USER'S INPUT
const validateInput = function (inputValue) {
  const acceptedLetter = /[a-zA-Z]/; //regular expression to ensure the user inputs a letter
  const matches = inputValue.match(acceptedLetter); //match input to accepted letters provided in regular expression
  if (inputValue.length === 0) {
    message.innerText = `You didn't type anything, silly!`;
  } else if (inputValue.length > 1) {
    message.innerText = `You may only enter 1 letter at a time.`;
  } else if (matches === null) {
    message.innerText = `Only letters from A-Z, bub.`;
  } else letterInput.value = ""; //clear letter
  return inputValue;
};

//FUNCTION TO TAKE VALIDATED GUESS, CONVERT TO UPPER CASE, AND PUSH TO ARRAY
const makeGuess = function (inputValue) {
  if (guessedLetters.includes(inputValue.toUpperCase())) {
    message.innerText = `You already used that letter.`;
  } else {
    guessedLetters.push(inputValue.toUpperCase());
  }
};