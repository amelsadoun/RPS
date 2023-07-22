//hi I'm making a rock paper scissors game i wanna die

const prompt = require("prompt-sync")();
const choices={
    'rock':0,
    'paper':1,
    'scissors':2
}

function playround (playerSelection, computerSelection, n, result, playerCount, computerCount) {
    if (playerSelection == computerSelection) {
        result='round '+n+' is a tie';
    }
    else if ((playerSelection == 'rock' && computerSelection=='scissors') || (playerSelection == 'scissors' && computerSelection=='paper') || (playerSelection == 'paper' && computerSelection=='rock')){
        result="you've won round "+n+' ! '+playerSelection+' beats '+computerSelection;
        playerCount++;
    }
    else if ((computerSelection == 'rock' && playerSelection=='scissors') || (computerSelection == 'scissors' && playerSelection=='paper') || (computerSelection == 'paper' && playerSelection=='rock')){
        result="you've lost round "+n+' dumb bitch, '+computerSelection+' beats '+playerSelection;
        computerCount++;
    }
    return [result, playerCount, computerCount];
}

function getComputerChoice(){
    let random = Math.floor(Math.random()*3);
    for (let [choice, index] of Object.entries(choices)){
        if (random==index){
            return choice;
        }
    }
}

function game(){
    var playerChoice, computerChoice, computerCounter=0, playerCounter=0, result;
   
    var round = parseFloat(prompt("Enter the number of rounds to play : "));
    for (let i=1; i <= round; i++){
        console.log("Round " + i + " :");
        computerChoice=getComputerChoice();
        while (true){
        playerChoice=prompt("Enter your choice : ");
        playerChoice= playerChoice.toLowerCase();
        playerChoice= playerChoice.trim();
        if (playerChoice=='rock' || playerChoice=='paper' || playerChoice=='scissors'){
            break;
        }
        else {console.log("7mar nta mat3rfch tektob? try again");}
        }
        var tab=playround(playerChoice, computerChoice, i, result, playerCounter, computerCounter);
        console.log(tab[0]);
        playerCounter=tab[1];
        computerCounter=tab[2];
        console.log('score: ',playerCounter, ' - ',computerCounter); 
    }
    if (playerCounter>computerCounter) {console.log("YOU'VE WON THE GAME, Zhar brk ghir matfr7ch.");}
    else if (playerCounter < computerCounter) {console.log("You've lost the game LOSERRRRR PSK PAVILLON L AHAHAHAHA.");} else {
        console.log("The game is a tie, khir m walo.");}
}

game();