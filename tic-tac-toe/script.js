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
    console.log(currentMode);
});
//----- End of changing mode -----//

let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnO=true;
//------ winning chances --------//
 let winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText ="O";
            box.style.color = "beige";
            turnO=false;
        }else{
            box.innerText ="X";
            box.style.color = "rgb(172, 170, 170) ";

            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
 });

 const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
 }
 const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetbtn.classList.add("hide");
 }

 const checkWinner=()=>{
    for(let pattern of winPatterns){
            let postionVal1=  boxes[pattern[0]].innerText;
            let postionVal2=  boxes[pattern[1]].innerText;
            let postionVal3=  boxes[pattern[2]].innerText;

            if(postionVal1 !="" && postionVal2 != "" && postionVal3 != ""){
                if(postionVal1 === postionVal2 && postionVal2=== postionVal3){
                    console.log("winner ",postionVal1);
                    showWinner(postionVal1 );
                }
            }
            
    }
 }
// ------- End of a Game -----------//


// -------- reset Game -------------//
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
 }

 const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetbtn.classList.remove("hide");
 }
 resetbtn.addEventListener("click", resetGame);

// -------- End ofreset Game -------------//

// -------- New Game -------------//

 newGameBtn.addEventListener("click", resetGame);

 // -------- End of new Game -------------//
