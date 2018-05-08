
var choices = 6;
var options = new Array(6);
var answerSet;
var answer;

var modes = document.querySelectorAll(".mode"); 
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var question1 = document.querySelector("#question1");
var question2 = document.querySelector("#question2");
var reset = document.getElementById("reset");

//initialize game (difficulty: hard)

init();

function init(){
	createOptions(choices);
	createGame(choices);
	setupModeButtons();
	setupSquares();
}
//sets up reset button 
reset.addEventListener("click", function(){
	createGame(choices);
});
// sets up all easy + hard buttons
function setupModeButtons() {
	for (var i = 0; i < modes.length; i++){
		modes[i].addEventListener("click", function(){
			modes[0].classList.remove("selected");
			modes[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "easy"){
				choices = 3;
				for (var i = 3; i < squares.length; i++){
					squares[i].style.display = "none";
				}
			}
			else if (this.textContent === "hard"){
				choices = 6;
				for (var i = 3; i < squares.length; i++){
					squares[i].style.display = "block";
				}
			}
			createGame(choices);
		});
	}
}
//adding the answer options to the display squares
function setupSquares(){
	for (var i 	= 0; i < options.length; i++){
		squares[i].textContent = options[i][2];
		squares[i].addEventListener("click", function(){
			var clickedNumber = this.textContent;
			if (clickedNumber == answer){
				messageDisplay.textContent = "Correct!";
				reset.textContent = "Play Again?";
				changeBackground();
			}
			else {
				if (messageDisplay.textContent != "Correct!")
				{messageDisplay.textContent = "Try Again";}
				this.classList.add("bigShaq");
			}
		});
	}
}
//creates a game depending on easy or hard mode (3 or 6 choices)
function createGame(choices){
	messageDisplay.textContent = "";
	createOptions(choices);
	answerSet = generateRandomSet(choices);
	answer = options[answerSet][2];
	question1.textContent = options[answerSet][0];
	question2.textContent = options[answerSet][1];

	for (var i 	= 0; i < choices; i++){
		squares[i].textContent = options[i][2];
		squares[i].classList.remove("bigShaq");
		squares[i].classList.remove("happyBigShaq");
		reset.textContent = "New Numbers";
	} 
}
// this creates an array of 6 sets of 3 numbers (the 1st number being the first add part
	// of the addition equation, 2nd number = 2nd part of addition, the 3rd number being
	// the total of the first 2 numbers)
function createOptions(number){
	for (var i = 0; i < number; i++){
		options[i] = new Array(3);
		for (var x = 0; x < options[i].length; x++){
			// first 2 items of array is the 1st part and 2nd part of question, generates
			//random numbers
			if (x != 2){
				options[i][x] = generateRandomNumbers();
			}
			// last item of array is the total of the first 2 items
			else {
				options[i][x] = options[i][0] + options[i][1];
				
			}
		}
	}
}
// picks a random set from the options above
function generateRandomSet(number){
	var random = Math.floor(Math.random() * number);
	return random;
}
//generates random numbers to 200
function generateRandomNumbers(){
	var random = Math.floor(Math.random() * 200);
	return random;
}

//changes all background of choices when correct answer is picked
function changeBackground(){
	for (var i = 0; i < choices; i++){
		squares[i].classList.add("happyBigShaq");
	}
}
