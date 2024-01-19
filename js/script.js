//variables to target different elements of the Word Game page
const listOfGuessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "Magnolia"; //starting word to use for testing
const guessedLetters = []; //array to capture guessed letters

//DISPLAY WORD AS DOTS
//split word (a string) apart into individual characters
const wordArray = word.split("");
//function to replace each character with a dot
function replaceWithDot() {
  return "●";
}
const dotArray = wordArray.map(replaceWithDot); //map the wordArray to create an array of dots
const dotWord = dotArray.join(""); // Join the dotArray elements into a string
wordInProgress.innerText = dotWord; //Display dots for the wordInProgress on the page

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
    message.innerText = `Only A to Z. Use your brain, buddy.`;
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
  console.log(showWord);
  wordInProgress.innerText = showWord.join("");
  verifyWin();
};

//FUNCTION TO SEE IF PLAYER WON
const verifyWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};