const secretWordDisplay = document.querySelector(".secret-word-display");
const playAgainButton = document.querySelector(".play-again-button");

let gameOver = false;
let secretWord = "hello";
let userGuesses = [];

function startGame() {
	gameOver = false;
	playAgainButton.hidden = true;
	secretWord = getSecretWord(secretWordList);
	userGuesses = resetUserGuesses(secretWord);
	resetWordDisplay(secretWord);
	console.log(secretWord);
}

function winGame() {
	let winSound = new Audio("win-8.wav");
	let youWin = document.createElement("h3");
	youWin.innerText = "YOU WIN!";
	youWin.classList = "animate__animated animate__jello";
	secretWordDisplay.appendChild(youWin);
	winSound.play();
	gameOver = true;
	playAgainButton.hidden = false;
}

function checkForWin(guesses, secretWord) {
	for (let i = 0; i < guesses.length; i++) {
		if (guesses[i] != secretWord[i]) return false;
	}
	return true;
}

function checkGuess(guess, secretWord) {
	if (!secretWord.includes(guess)) return;
	else {
		let indices = [];
		secretWord.forEach((char, idx) => {
			if (char === guess) indices.push(idx);
		});
		indices.forEach(idx => userGuesses[idx] = guess);
	}
	console.log(userGuesses);
}

function getSecretWord(wordList) {
	let max = Math.ceil(wordList.length);
	let random = Math.floor(Math.random() * max);
	return wordList[random].split('');
}

function resetUserGuesses(secretWord) {
	let guessArray = [];
	for (let i = 0; i < secretWord.length; i++) {
		guessArray.push("_");
	}
	return guessArray;
}

function resetWordDisplay(word) {
	let blankSpaces = "";
	for (let i = 0; i < word.length; i++) {
		blankSpaces += "_ ";
	}
	secretWordDisplay.innerText = blankSpaces;
}

function updateWordDisplay(guesses) {
	secretWordDisplay.innerText = "";
	guesses.forEach(char => {
		secretWordDisplay.innerText += char + "\xa0";
	});
}

document.addEventListener("DOMContentLoaded", () => {
	startGame();
	document.addEventListener("keyup", e => {
		if (!gameOver) {
			checkGuess(e.key, secretWord);
			updateWordDisplay(userGuesses);
			if (checkForWin(userGuesses, secretWord)) 
				winGame();
		}
	});
	playAgainButton.addEventListener("click", startGame);
});