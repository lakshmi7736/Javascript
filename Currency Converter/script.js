const BASE_URL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_bYsSd6t3GNw6P40sNnEIKXcZQhAu3xWWDH5qYwmK&currencies=";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg= document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name ==="from" && currCode === "USD"){
            newOption.selected= "selected";
        }
        else if(select.name ==="to" && currCode === "INR"){
            newOption.selected= "selected";
        }
        select.append(newOption);
    }
    // to update flag on change with countrty 
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
    
}


const updateExchangeRate= async()=>{
    let amount= document.querySelector(".amount input");
let amountVal=amount.value;
if(amountVal ==="" || amountVal <1){
    amountVal =1;
    amount.value ="1";
}

// convert URL with selected currencies
const URL =`${BASE_URL}${fromCurr.value}%2C${toCurr.value}`;
let response =await fetch(URL);
let data= await response.json();
const exchangeRates = data.data; // Accessing the nested data object
const rate = exchangeRates[toCurr.value]; // Accessing the specific exchange rate
let finalAmount= amountVal*rate;
msg.innerText= `${amountVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`;
}



// update flag function
const updateFlag=(element)=>{
    let currCode=element.value;
    let countrtyCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countrtyCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click",  (evt)=>{
evt.preventDefault();
updateExchangeRate();
});


window.addEventListener("load",()=>{
    updateExchangeRate();
});

