const secretWordDisplay = document.querySelector(".secret-word-display");
const playAgainButton = document.querySelector(".play-again-button");

let gameOver = false;
let secretWord = "hello";
let userGuesses = [];

function startGame() {
	gameOver = false;
	secretWord = getSecretWord(secretWordList);
	console.log(secretWord);
	userGuesses = resetUserGuesses(secretWord);
	resetWordDisplay(secretWord);
}

function endGame() {
	let youWin = document.createElement("h3");
	youWin.innerText = "YOU WIN!";
	youWin.classList = "animate__animated animate__jello"
	secretWordDisplay.appendChild(youWin);
	gameOver = true;
	playAgainButton.hidden = false;
}

function checkGuess(guess, secretWord) {
	if (!secretWord.includes(guess)) return;
	else {
		let indices = [];
		secretWord.forEach((char, idx) => {
			if (char === guess) 
				indices.push(idx);
		});

		indices.forEach(idx => userGuesses[idx] = guess);
	}
	console.log(userGuesses);
}

function checkForWin(guesses, secretWord) {
	for (let i = 0; i < guesses.length; i++) {
		if (guesses[i] != secretWord[i]) return false;
	}
	return true;
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
		blankSpaces += "_ "
	}
	secretWordDisplay.innerText = blankSpaces;
}

async function updateWordDisplay(guesses) {
	secretWordDisplay.innerText = "";
	await guesses.forEach(char => {
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
				endGame();
		}
	});
	playAgainButton.addEventListener("click", startGame);
});