//Step one : test each individual function // document
//************************************************************************************
//NOTES
// ===VARIABLES===
// currentValueString 					used to display current number user is inputting
// periodAllowed						used to prevent multiple periods in an operand

// ===FUNCTIONS===
// updateCurrentValueString				concats numbers rather than add, ie: 5+5=55
//										updates var currentValueString, which is used to display current number
// periodHandler						will forward period to updateCurrentValueString if one hasn't been used
//											in the current operand.
// clearEntry							sets currentValueString to 0. Sets periodAllowed to true 
//************************************************************************************
//************************************************************************************
//Functions tested are in this block
//variables
var currentValueString = "0";
var periodAllowed = true;

// operation functions
function multiply(operand1,operand2)	{return operand1 * operand2};
function divide(operand1,operand2)		{return operand1 / operand2};
function minus(operand1,operand2)		{return operand1 - operand2};
function plus(operand1,operand2)		{return operand1 + operand2};

function updateCurrentValueString(numberString){
	if(currentValueString === "0") {currentValueString = "" + numberString}
	else {currentValueString = "" + currentValueString + numberString;}
	console.log(currentValueString);
};

function periodHandler(){
	if(periodAllowed === true){updateCurrentValueString("."); periodAllowed=false;}
};

function clearEntry(){
	currentValueString = "0";
	periodAllowed = true;
}
//************************************************************************************
//************************************************************************************
// var currentChain = [];

// function operand(op){
	
// }



//************************************************************************************
//************************************************************************************

var currentElm="0";
// var currentChain = ["0"]; //[['3'],['X'],['42'],['+'],['55']];

// ****************************************************


function equalsEvaluator(chain){   //when equal is pressed it then asssits in  the evaulation of the input
  //alert("This is currentChain that was passed:"+chain);  
  
  while(chain.length>1){
    var operand1 = chain[0];
    var operator = chain[1];
    var operand2 = chain[2];
    var evaluation = "";
    chain.splice(0,3);
    //alert("operand1:" + operand1 + " operator:" + operator + " operand2:" + operand2);
    //alert("chain after splice: " + chain)
    switch(operator){
      case "X": evaluation=multiply(operand1,operand2); break;
      case "/": evaluation=divide(operand1,operand2); break;  
      case "-": evaluation=minus(operand1,operand2); break;  
      case "+": evaluation=plus(operand1,operand2); break;  
                   }//switch
    //alert("evaluation:"+evaluation)
    chain.unshift(evaluation)
    //alert("chain after unshift::"+ chain)
  }
  currentElm="0";
  currentChain=["0"];
  document.getElementById("answer").innerText=chain[0];
  document.getElementById("answer").style.visibility="visible";
  document.getElementById("currentElm").style.visibility="hidden";
} //equalsEvaluator

function operate(operator){
  if(currentChain[0]!== "0") {currentChain.push(currentElm);}
  else {currentChain[0] = currentElm;}
  currentElm = operator;
}

// ****************************************************
// Main function
/*
function update(value){
  
  document.getElementById("currentElm").style.visibility="visible";
  document.getElementById("answer").style.visibility="hidden";
  if(value=='AC') {currentElm = "0"; currentChain=["0"];}
  if(value=='CE') {currentElm = "0";}
  if(value >=0 && value <=9) 
    { 
      if( currentElm == "X" ||  currentElm == "/" ||  currentElm == "+"  ||  currentElm == "-" ){
        currentChain.push(currentElm); currentElm="";
      }
      if (currentElm == "0" && currentElm != "0.") { currentElm = value.toString()}  //if currentElm was 0
              //checkCurrentLength, will allow continue if less that 8 digits.
      else { if(checkCurrentElmLength()) {  currentElm += value.toString();} }    // else add the number to end of currentElm
              
    }
  if(value=='.') 
    {
      if(currentElm.indexOf('.')>= 0) {} //do nothing
      else if(currentElm == 'X' || currentElm == '/' || currentElm == '-' || currentElm == '+')  {operate(value)}//{currentChain.push(currentElm);currentElm += '.';} 
      else {currentElm += '.';}
    }
  if(value == 'X' || value == '/' || value == '-' || value == '+'){
    if(Number(currentElm) == 0 || currentElm == "0." || currentElm == 'X' || currentElm == '/' || currentElm == '-' || currentElm == '+') {} //do nothing
    else { //alert(currentElm); 
           operate(value);
         }  // *** DO SOME KIND OF UPDATE
    } // value is operator except =
  if(value == "=") 
    { if(currentElm == 'X' || currentElm == '/' || currentElm == '-' || currentElm == '+') {} //do nothing
      else{
        //alert("CONTINUE HERE , see what equals will do");
        currentChain.push(currentElm);
        equalsEvaluator(currentChain);
      } //else      
    }//if value == "="
  
  displayCurrentElm(currentElm);
  displayCurrentChain(currentChain);
}
*/
// ****************************************************


// *****************************************************
// DISPLAY FUNCTIONS
function displayCurrentElm(toDisplay){   //display current number or operation in h2 currentElm
  document.getElementById("currentElm").innerText = toDisplay;  
}

function displayCurrentChain(toDisplayChain){  //display current chain in h4 currentChain
  var text = "";
  for(i=0;i<toDisplayChain.length;i++){
    text += toDisplayChain[i]
  }  
  document.getElementById("currentChain").innerText = text;
}
// END DISPLAY ********************************************

// ********************************************************
// CHECK FUNTIONS
function checkCurrentElmLength(){     //returns true if length < 8 else returns false
  var tempString = currentElm.replace(/\./g,'');
  //alert(tempString);
  if (tempString.length >8) {alert("ERROR MORE THAN 8 DIGITS, CANNOT CONTINUE")}
  return tempString.length <=8;
}

// END CHECK **********************************************

// ********************************************************
// START PROGRAM ******************************************

displayCurrentElm(currentElm);
displayCurrentChain(currentChain);