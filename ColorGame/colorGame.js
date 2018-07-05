
var colors = [];
var numSquares = 6;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();


//Botão Novas Cores/Jogar Novamente
resetBtn.addEventListener("click", function(){
	reset();
});

//preencher os quadrados
function changeColors(color){
	//percorrer todos os quadrados
	for(var i = 0; i < squares.length; i++){
		//mudar a cor de cada quadrado
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//gerar o array de cores randomica
function generateRandomColors(num){
	//make an array
	var arr = []
	//add num randoms to array
	for(var i = 0; i < num; i++){
		//get Random Color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

//gerar um cor randomica
function randomColor(){
	//pick a "red" from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var blue = Math.floor(Math.random() * 256);

	return "rgb("+ red + ", " + green + ", " + blue + ")";
}

function reset(){
	//gerar novas cores
	colors = generateRandomColors(numSquares);
	//escolher uma nova cor para ser a certa
	pickedColor = pickColor();
	//mudar o título para combinar com a cor escolhida
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetBtn.textContent = "New Colors";
	//mudar as cores dos quadrados
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display="none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
}

function init(){
	setupModeButtons();
	setupSquares();
	reset();
	
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		//add click aos quadrados
		squares[i].addEventListener("click", function(){
		//pegar a cor do quadrado clicado
		var clickedColor = this.style.backgroundColor;
		//comparar essa cor com a cor escolhida
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct";
			resetBtn.textContent = "Play Again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
		});
	}
}