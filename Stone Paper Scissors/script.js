//----- change mode -----//
let btn1=document.createElement("button");
btn1.innerText="Turn to Dark Mode";
const body= document.querySelector("body");
body.prepend(btn1);
body.classList.add("lightMode");

let currentMode="light";

btn1.addEventListener("click",()=>{
    if(currentMode === "light"){
        currentMode="dark";
        btn1.innerText = "Turn to Light Mode";
        body.classList.remove("lightMode");
        body.classList.add("darkMode");
    }else{
        currentMode="light";
        btn1.innerText = "Turn to Dark Mode";
        body.classList.remove("darkMode");
        body.classList.add("lightMode");
    }
});
//----- End of changing mode -----//



let userScore= 0;
let compScore= 0;
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");
const msg=document.querySelector("#msg");   

const choices=document.querySelectorAll(".choice");

const generateComputerChoice=()=>{
    const options=["rock","paper",'scissors'];
    //randomly generate rock,paper,scissors
    const randIndx=Math.floor(Math.random(options)*3);
    return options[randIndx];    
}
const drawGame=()=>{
    msg.innerText="Game was draw. Play again!";
    msg.style.backgroundColor="#081b31"; 
}

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        msg.style.backgroundColor="green"; 
        msg.innerText=`You won! Your ${userChoice} beats ${compChoice}`;
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.style.backgroundColor="red"; 
        msg.innerText=`You loose! ${compChoice} beats Your ${userChoice}`;
    }
}
const playGame=(userChoice)=>{
    // Generate computer choice
    const compChoice= generateComputerChoice();

    if(userChoice === compChoice){
        // Draw game
        drawGame();
    }else{
        let userWin=true;
        if(userChoice === "rock"){
            // must be paper or scissors. win only when it is paper
            userWin = compChoice === "paper"? false:true;
        }else if(userChoice === "paper"){
            // must be rock or scissors. win only when it is scissors

            userWin = compChoice === "scissors"? false:true;
        }else{
            // must be rock or paper. win only when it is rock
            userWin = compChoice === "rock"? false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});