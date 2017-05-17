//Step one : test each individual function // document
//************************************************************************************
//NOTES
// ===VARIABLES===
// currentValueString 					used to display current number user is inputting
// periodAllowed						used to prevent multiple periods in an operand
// valueChain							array that holds values until evaluated
// operandAllowed						used to prevent multiple operators being called in succession 
// total 								holds total of evaluated array valueChain
// previousChainEvaluated				bool, tells if there was a chain evaluated previously
//											useful for keeping evaluation available to future inputs
// ===FUNCTIONS===
// updateCurrentValueString				concats numbers rather than add, ie: 5+5=55
//										updates var currentValueString, which is used to display current number
// periodHandler						will forward period to updateCurrentValueString if one hasn't been used
//											in the current operand.
// clearEntry							sets currentValueString to 0. Sets periodAllowed to true
// allClear 							reset / clears everything 
// operand 								pushes operator to array valueChain
// flushCurrentValueString				push currentValueString to array valueChain						
// isOperator							checks if argument is an operator (plus,-,X,/)
//											input: string value
//											output: bool
// evaluateChain 						evaulate all values in valueChain and currentValueString
//											sets var total to total of evaluations
// displayCurrentVal					displays value of currentValueString or operand called
//											displays total on call of evaluateChain
// previousChainHandler					used to handle keeping previous chain available.
//											clean up chain 

// ***** update comments with input output
//************************************************************************************
//************************************************************************************
//Functions tested are in this block
//variables
var currentValueString = "0";
var periodAllowed = true;
var valueChain = [];
var operandAllowed = true;
var total = 0;
var previousChainEvaluated = false;   //set this to false on all clear
// operation functions
function multiply(operand1,operand2)	{return operand1 * operand2};
function divide(operand1,operand2)		{return operand1 / operand2};
function minus(operand1,operand2)		{return operand1 - operand2};
function plus(operand1,operand2)		{return Number(operand1) + Number(operand2)};

function updateCurrentValueString(numberString){
	previousChainHandler();
	if(inputLengthAllowed()){
		if(currentValueString === "0") {
			if(numberString === "."){currentValueString = "0."}
			else {currentValueString = "" + numberString}
		}
		else {currentValueString = "" + currentValueString + numberString;}
		// console.log(currentValueString); console.log("inputLengthAllowed", inputLengthAllowed());
		operandAllowed = true;
		displayCurrentVal(currentValueString)
	}
};

function periodHandler(){
	if(periodAllowed === true){updateCurrentValueString("."); periodAllowed=false;}
};

function clearEntry(){
	if(previousChainEvaluated){allClear()}
	else {
		currentValueString = "0";
		periodAllowed = true;
		displayCurrentVal(currentValueString);	
	}
}

function allClear(){
	flushCurrentValueString();	
	valueChain = [];
	total = 0;
	previousChainEvaluated = false;
	displayCurrentVal(currentValueString);
	displayValueChain();
}

function operand(op){
	if(operandAllowed){
		previousChainEvaluated = false;
		flushCurrentValueString();
		valueChain.push(op);
		// console.log("valueChain :" + valueChain);
		displayCurrentVal(op)	
		displayValueChain()
	}			
}

function flushCurrentValueString(){
		valueChain.push(currentValueString);  //see operand for duplicate code
		currentValueString = "0";
		periodAllowed = true;
		operandAllowed = false;	
}

function isOperator(val){
	if( val === "plus"  || val === "-" || val === "X" || val === "/" ) 
		{return true}
	return false;	
}

function evaluateChain(){
	console.log("currentValueString", currentValueString);
	var evalTotal = null;
	flushCurrentValueString();
	valueChain.push("=");
	displayValueChain()
	while(valueChain.length > 0){
		// flushCurrentValueString();

		var shifted = valueChain.shift();
		if(evalTotal === null){evalTotal = shifted}
		else{
			var operatorValue = shifted;
			shifted = valueChain.shift();
			console.log("evalTotal,operatorValue, shifted" + evalTotal + " " +operatorValue + " "+  shifted);
			console.log("valueChain",valueChain)
			switch(operatorValue){
			  case "X": evalTotal=multiply(evalTotal,shifted); break;
		      case "/": evalTotal=divide(evalTotal,shifted); break;  
		      case "-": evalTotal=minus(evalTotal,shifted); break;  
		      case "plus": evalTotal=plus(evalTotal,shifted); break;
            }//switch}
            console.log("evalTotal is:", evalTotal)  	
	    }//e    
	}//w
	var total = evalTotal
	console.log("TOTAL: " + total)
	displayCurrentVal(total)
	currentValueString = total;
	previousChainEvaluated = true;
	operandAllowed = true;
}//fun

function displayCurrentVal(toDisplay){   //display current number or operation in h2 currentElm
  document.getElementById("currentElm").innerText = toDisplay;  
}

function displayValueChain(){  //display current chain in h4 currentChain
  var text = "";
  for(i=0;i<valueChain.length;i++){
    text += valueChain[i];
    text += " ";
  }  
  document.getElementById("currentChain").innerText = text;
}


function previousChainHandler(){
	if(previousChainEvaluated){
 		total=0;
 		currentValueString="0";
 		valueChain = [];
 		previousChainEvaluated = false;
 		displayValueChain()
	}
}
//88888888888if val empty   how to "block diplay"
//************************************************************************************
//************************************************************************************
function inputLengthAllowed(){
	// dont allow digit length to be greater than 8
	if(currentValueString.length<=8){return true}
	else return false;	
}


function evaluationAllowed(){
	
	// console.log("isOperator(currentValueString)",isOperator(currentValueString),currentValueString);
	if(valueChain.length>0)
		{evaluateChain()}	
}



displayCurrentVal(currentValueString);