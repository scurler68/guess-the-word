
//variables to target different elements of the Word Game page
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".messages");
const playAgain = document.querySelector(".play-again");

//starting word to use for testing
const word = "Magnolia";

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
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const letterValue = letterInput.value;
    console.log(letterValue);
    letterInput.value = ""; //clear letter
});


