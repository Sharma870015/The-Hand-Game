let userScore = 0;
let compScore = 0;
let round = 0; // Add round counter
const maxRounds = 10; // Maximum number of rounds

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const print1 = document.querySelector("#your-choice");
const print2 = document.querySelector("#comp-choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const startGameBtn = document.querySelector("#new-game-btn");
const resetGameBtn = document.querySelector("#reset-game-btn");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (round < maxRounds) {  // Only allow gameplay if rounds are less than max
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        }
    });
});

const drawngame = () => {
    console.log("Game was Draw!");
    msg.innerText = "It's a Draw. Play Again!";
    msg.style.backgroundColor = "";
};

const genCompChoice = () => {
    let options = ["rock", "paper", "scissor"];
    let randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const printChoices1 = (userChoice) => {
    print1.innerText = "You choose " + userChoice;
};

const printChoices2 = (compChoice) => {
    print2.innerText = "Comp. choose " + compChoice;
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You won! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }
};

const playGame = (userChoice) => {
    console.log(`User chose ${userChoice}`);
    const compChoice = genCompChoice();
    console.log(`Computer chose ${compChoice}`);
    
    printChoices1(userChoice);  // Display user's choice
    printChoices2(compChoice);  // Display computer's choice
    
    if (userChoice === compChoice) {
        drawngame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "scissor";
        } else if (userChoice === "paper") {
            userWin = compChoice === "rock";
        } else {
            userWin = compChoice === "paper";
        }
        showWinner(userWin, userChoice, compChoice);
    }
    
    round++;  // Increment the round counter after each round
    if (round === maxRounds) {  // Check if it's the last round
        showFinalResult();
    }
};

// Function to show the final result after 10 rounds
const showFinalResult = () => {
    let finalMsg = "";
    if (userScore > compScore) {
        finalMsg = `Game Over! You won with a score of ${userScore} to ${compScore}.`;
    } else if (userScore < compScore) {
        finalMsg = `Game Over! The computer won with a score of ${compScore} to ${userScore}.`;
    } else {
        finalMsg = `Game Over! It's a draw with a score of ${userScore} to ${compScore}.`;
    }
    
    msg.innerText = finalMsg;
    msg.style.backgroundColor = "blue";
    
    // Disable further gameplay by removing event listeners
    choices.forEach((choice) => {
        choice.removeEventListener("click", playGame);
    });
};

// Function to start a new game
const startNewGame = () => {
    round = 0;
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move!";
    msg.style.backgroundColor = "";

    // Re-add the event listeners to choices
    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            if (round < maxRounds) {  // Only allow gameplay if rounds are less than max
                const userChoice = choice.getAttribute("id");
                playGame(userChoice);
            }
        });
    });
};

// Function to reset the game (all scores and rounds)
const resetGame = () => {
    round = 0;
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move!";
    msg.style.backgroundColor = "";

    // Remove event listeners to stop the game temporarily
    choices.forEach((choice) => {
        choice.removeEventListener("click", playGame);
    });

    // Re-add the event listeners for a fresh start
    choices.forEach((choice) => {
        choice.addEventListener("click", () => {
            if (round < maxRounds) {  // Only allow gameplay if rounds are less than max
                const userChoice = choice.getAttribute("id");
                playGame(userChoice);
            }
        });
    });
};

// Event listeners for the New Game and Reset Game buttons
startGameBtn.addEventListener("click", startNewGame);
resetGameBtn.addEventListener("click", resetGame);
