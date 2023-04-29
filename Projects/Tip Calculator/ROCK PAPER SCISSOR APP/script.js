
function getComputerChoice() {
 let choices = ["Rock", "Paper", "Scissor", "Lizard", "Spock"]
 let computerChoice = choices[Math.floor(Math.random() * 3)]
 return computerChoice;
}


function getResult(playerChoice, computerChoice) {

  let score;

  // All situations where player draws, set `score` to 0
    if(playerChoice === computerChoice){
        
        score = 0;

    }

  // All situations where player wins, set `score` to 1
    else if(playerChoice === 'Rock' && computerChoice === 'Lizard' || computerChoice === 'Scissor') {
        
        score= 1;

    } else if(playerChoice === 'Paper' && computerChoice === 'Rock' || computerChoice === 'Spock') {
        
        score = 1;

    } else if (playerChoice === 'Scissor' && computerChoice === 'Lizard' || computerChoice === 'Paper') {
        
        score = 1;
    } else if (playerChoice === 'Lizard' && computerChoice === 'Spock' || computerChoice === 'Paper') {

        score = 1;

    } else if (playerChoice === 'Spock' && computerChoice === 'Rock' || computerChoice === 'Scissor') {

        score = 1;

    }

  // Otherwise player loses (aka set score to -1)
  else{
    
    score = -1;

  }

  // return score
    return score;
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!
  let result = document.getElementById("result");
  if(score === 1) {
    result.innerText = "Yeah! Player Wins 😁"
  } else if (score === 0) {
    result.innerText = " Match Draw! 😑"
  } else {
    result.innerText = " Computer Wins ☹️"
  }

  let playerScore = document.getElementById("playerScore")
  let hands = document.getElementById("hands")
  playerScore.innerText = `${Number(playerScore.innerText) + score}`
  hands.innerText = `🧑🏽${playerChoice} vs 🤖${computerChoice}`
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
    const computerChoice = getComputerChoice()
    const score = getResult(playerChoice.value, computerChoice)
    showResult(score, playerChoice.value, computerChoice)
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  // use querySelector to select all RPS Buttons
    let rpsButtons = document.querySelectorAll('.rpsls')
  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
  
  // 1. loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument

    rpsButtons.forEach(rpsButtons => {
        rpsButtons.onclick = () => onClickRPS(rpsButtons)
    })

  // Add a click listener to the end game button that runs the endGame() function on click
    let endGameButton = document.getElementById('endgame')
    endGameButton.onclick = () => endGame()
}

// ** endGame function clears all the text on the DOM **
function endGame() {
  let playerScore = document.getElementById('playerScore')
  let hands = document.getElementById('hands')
  let result = document.getElementById('result')
  playerScore.innerText=''
  hands.innerText=''
  result.innerText=''
}

playGame()