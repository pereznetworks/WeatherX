let currentTempF = 0;
let currentTempC = 0;
let locationTemps = [];
let locationBarDivs = [];

function handleTempClick(event){
  if (event.target.title ==  "Fahrenheit"){
    // highlight select tempType, change tempType font
    document.getElementById("tempFbutton").className = "wi wi-fahrenheit tempActive";
    document.getElementById("tempCbutton").className = "wi wi-celsius temp";
    // get selected temp for each locationBar
    var arrayOfLB = Array.from(document.getElementsByClassName("locationBar-div"));
    arrayOfLB.forEach(function(item, index){
     document.getElementById(`tempF${index}`).className = `currentTemp`;
     document.getElementById(`tempC${index}`).className = `hideTemp`;
    });
  } else {
    // highlight select tempType, change tempType font
    document.getElementById("tempFbutton").className = "wi wi-fahrenheit temp";
    document.getElementById("tempCbutton").className = "wi wi-celsius tempActive";
    // get selected temp for each locationBar
    var arrayOfLB = Array.from(document.getElementsByClassName("locationBar-div"));
    arrayOfLB.forEach(function(item, index){
     document.getElementById(`tempF${index}`).className = `hideTemp`;
     document.getElementById(`tempC${index}`).className = `currentTemp`;
    });
  }
}; // onclick eventhandler
