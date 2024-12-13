// LOAD VARIABLES AND ASSETS -------

function loadJS() {
}

// DICTIONARIES USED: Infochimps Word List, Collins Official Scrabble Words 2019, Enhanced North American Benchmark Lexicon 1, Letterpress 1.1, Manually Inserted Words

document.body.style.backgroundColor = "#000022";

var start = false;

var rarePrompt = false;

var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = 560;
canvas.height = 560;

var gameScore = 0;

var sfxAlphaClear = new Audio("morphoAlphaClear.wav");
sfxAlphaClear.volume = 0.4;

var sfxAlphaLetter = new Audio("morphoAlphaLetter.wav");
sfxAlphaLetter.volume = 0.2;

var sfxCorrect = new Audio("morphoCorrect.wav");
sfxCorrect.volume = 0.2;

var sfxEnter = new Audio("morphoEnter.wav");
sfxEnter.volume = 0.3;

var sfxGameOver = new Audio("morphoGameOver.wav");
sfxGameOver.volume = 0.5;

var sfxPrompt = new Audio("morphoPrompt.wav");
sfxPrompt.volume = 0.4;

var sfxRare = new Audio("morphoRare.wav");
sfxRare.volume = 0.3;

var sfxType = new Audio("morphoType.wav");
sfxType.volume = 0.4;

var sfxType2 = new Audio("morphoType2.wav");
sfxType2.volume = 0.4;

var sfxType3 = new Audio("morphoType3.wav");
sfxType3.volume = 0.4;

var sfxType4 = new Audio("morphoType4.wav");
sfxType4.volume = 0.4;

var sfxType5 = new Audio("morphoType5.wav");
sfxType5.volume = 0.4;

var sfxWrong = new Audio("morphoWrong.wav");
sfxWrong.volume = 0.3;

// WORD PICKER, TEXT, AND SOLUTION COUNTER -------

var rpr = {};
var solutionCount;

function generateRPR() {
    rpr.filtered = ((dictionary.filter(pick => !takenWords.includes(pick)).filter(hyph => !hyph.includes("-")).filter(apos => !apos.includes("'"))));
	
	if ((rpr.filtered).length == 0) {
		prmpt.innerHTML = "[no more prompts]";
	}
	else {
		rpr.pickWord = rpr.filtered[Math.floor(Math.random()*(rpr.filtered).length)];
	};
	
	rpr.rdI = Math.floor(Math.random() * (rpr.pickWord).length);
	
	if (gameScore >= 0 && gameScore <= 14) {
		rpr.rl = Math.floor(Math.random() * 1 + 1.7);
	}
	
	if (gameScore >= 15 && gameScore <= 125) {
		rpr.rl = Math.floor(Math.random() * 1.4 + 1.8);
	}
	
	if (gameScore >= 125 && gameScore <= 249) {
		rpr.rl = Math.floor(Math.random() * 1.8 + 1.9);
	}
	
	if (gameScore >= 250 && gameScore <= 499) {
		rpr.rl = Math.floor(Math.random() * 1.5 + 2.4);
	}
	
	if (gameScore >= 500) {
		rpr.rl = Math.floor(Math.random() * 0.8 + 2.9);
	}
	
	
	if (rpr.rdI + rpr.rl > rpr.pickWord.length) {
		rpr.rdF = rpr.rdI - (rpr.rl - 1);
	}
	else {
		rpr.rdF = rpr.rdI;
	}
	rpr.prompt = (rpr.pickWord).substring((rpr.rdF), (rpr.rdF + rpr.rl));
	clearTimeout(dlyPromptSA);
	
	if ((rpr.filtered).length == 0) {
		prmpt.style['font-size'] = "25px";
	}
	else {
		prmpt.style['font-size'] = "75px";
		promptSizeAnimate();
	};
	
	dlyPrompt = 1;
	sfxPrompt.play();
	
	var solutionCount = 0;
	
	for (let i = 0; i < dictionary.length; i++) {
		if (dictionary[i].includes(rpr.prompt)) {
			solutionCount += 1;
		}
	}
	
	solcount.innerHTML = "Solutions: " + solutionCount;
	
	if (solutionCount < 100) {
		solcount.style.color = "#CC6644";
		rarePrompt = true;
	}
	else if (solutionCount >= 100) {
		solcount.style.color = "#444488";
		rarePrompt = false;
	};
	
	acguidetext.style['display'] = "none";
	
	spawnParticles(canvas.width / 2, 10, canvas.height * 0.4, 10, 20, 0, 10, 0, 10, 7, 3, 0.3, "rgba(100,100,200,0.5)", false, 0.9);
}

var takenWords = [];

let ttl1 = document.createElement("div")
ttl1.id = "title1"
ttl1.innerHTML = "Emanator's"
ttl1.style = "font-family: Lexend Bold; color: #222288; font-size: 20px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: -490px; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(ttl1);

let ttl2 = document.createElement("div")
ttl2.id = "title2"
ttl2.innerHTML = "Morphowhiz"
ttl2.style = "font-family: Lexend Bold; color: #4444AA; font-size: 35px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: -445px; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(ttl2);

let ttl3 = document.createElement("div")
ttl3.id = "title3"
ttl3.innerHTML = "(HTML/CSS/JS PROTOTYPE, v0.8)"
ttl3.style = "font-family: Lexend Bold; color: #4444AA; font-size: 10px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: -390px; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(ttl3);

let dlog = document.createElement("button")
dlog.id = "downloadLogButton"
dlog.type = "button"
dlog.innerHTML = "Download Log"
dlog.style = "display: none; background-color: #444488; border: 3px solid #111122; width: 20ch; font-family: Lexend Bold; color: #222244; font-size: 20px; position: absolute; top: 50%; transform: translateY(-50%); bottom: 0; left: 0; right: 0; max-width: 100%; max-height: 40px; margin: auto; margin-top: -162px; text-align: center; text-transform: uppercase; justify-content: center; align-items: center; z-index: 10;"
document.body.appendChild(dlog);

let msg = document.createElement("div")
msg.id = "message"
msg.innerHTML = "Type an English word that contains:"
msg.style = "font-family: Lexend Bold; color: #444488; font-size: 20px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: -250px; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(msg);

let prmpt = document.createElement("div")
prmpt.id = "prompt"
prmpt.innerHTML = "―――――";
prmpt.style = "font-family: Lexend Bold; color: #4444AA; font-size: 125px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: -110px; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(prmpt);

let solcount = document.createElement("div")
solcount.id = "solutionCount"
solcount.style = "font-family: Lexend Bold; color: #444488; font-size: 20px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: 20px; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(solcount);

let retrytext = document.createElement("div")
retrytext.id = "alphaClearText"
retrytext.innerHTML = "Refresh the page to try again"
retrytext.style = "font-family: Lexend Bold; color: #222266; font-size: 20px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: 218px; padding: 0; text-align: center; display: none; justify-content: center; align-items: center;"
document.body.appendChild(retrytext);

let acguidetext = document.createElement("div")
acguidetext.id = "alphaClearGuideText"
acguidetext.innerHTML = "Use all letters of the alphabet to get a bonus"
acguidetext.style = "font-family: Lexend Bold; color: #555577; font-size: 15px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin-top: 210px; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(acguidetext);

let rpstext = document.createElement("div")
rpstext.id = "rarePromptText"
rpstext.innerHTML = "RARE PROMPT SOLVE! (+10)"
rpstext.style = "font-family: Lexend Bold; color: #CC6644; font-size: 15px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin-top: 240px; margin-right: 300px; text-align: center; display: none; justify-content: center; align-items: center;"
document.body.appendChild(rpstext);

let actext = document.createElement("div")
actext.id = "alphaClearText"
actext.innerHTML = "ALPHA-CLEAR! (+52)"
actext.style = "font-family: Lexend Bold; color: #4488AA; font-size: 20px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin-top: 240px; margin-left: 300px; text-align: center; display: none; justify-content: center; align-items: center;"
document.body.appendChild(actext);

let scr = document.createElement("div")
scr.id = "score"
scr.innerHTML = gameScore;
scr.style = "font-family: Lexend Bold; color: #666699; font-size: 50px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: 295px; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(scr);

let inp = document.createElement("input")
inp.id = "inputBox"
inp.type = "text"
inp.maxLength = "50"
inp.placeholder = "[CLICK HERE TO START]"
inp.style = "background-color: #DDDDFF; border: 3px solid #222244; width: 23ch; font-family: Lexend Bold; color: #6666AA; font-size: 30px; position: absolute; top: 50%; transform: translateY(-50%); bottom: 0; left: 0; right: 0; max-width: 100%; max-height: 40px; margin: auto; margin-top: 200px; text-align: center; text-transform: uppercase; display: flex; justify-content: center; align-items: center; z-index: 9;"
document.body.appendChild(inp);

let la = document.createElement("div")
la.id = "lastAnswer"
la.innerHTML = "[last answer goes here]"
la.style = "font-family: Lexend Bold; color: #8888AA; font-size: 25px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; margin-top: 490px; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;"
document.body.appendChild(la);

// ALPHA CLEAR MECHANIC --------

const alphaClearNo = "font-family: Lexend Bold; color: #4466AA; font-size: 28px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;";
const alphaClearYes = "font-family: Lexend Regular; color: #8888AA; font-size: 24px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: block; padding: 0; text-align: center; display: flex; justify-content: center; align-items: center;";

var alphaLetter;

var letters = [];

function spawnAllLetters() {
	letters = [
		["A", -360, 80],
		["B", -300, 80],
		["C", -240, 80],
		["D", -180, 80],
		["E", -120, 80],
		["F", -60, 80],
		["G", 0, 80],
		["H", 60, 80],
		["I", 120, 80],
		["J", 180, 80],
		["K", 240, 80],
		["L", 300, 80],
		["M", 360, 80],
		["N", -360, 160],
		["O", -300, 160],
		["P", -240, 160],
		["Q", -180, 160],
		["R", -120, 160],
		["S", -60, 160],
		["T", 0, 160],
		["U", 60, 160],
		["V", 120, 160],
		["W", 180, 160],
		["X", 240, 160],
		["Y", 300, 160],
		["Z", 360, 160]
	];
	
	for (const letterData of letters) {
		new alphaLetter(...letterData);
	}
}

spawnAllLetters();

var alphaWord;

function alphaLetter(letter, posX, posY) {
	let acl = document.createElement("div");
	acl.innerHTML = letter;
	acl.id = letter;
	acl.style = alphaClearNo;
	acl.style['margin-left'] = posX + "px";
	acl.style['margin-top'] = posY + "px";
	acl.x = posX;
	acl.y = posY;
	
	document.body.appendChild(acl);
}

var letterTakenArray = new Array(26).fill(false);

function checkAlphaClear() {
	if (letterTakenArray.every(function(elem) { return elem == true })) {
			sfxAlphaClear.currentTime = 0;
			sfxAlphaClear.play();
			gameScore += 52;
			scr.innerHTML = gameScore;
			scr.style.color = "#5599BB",
			actext.style['display'] = "flex";
			
			letterTakenArray.fill(false);
			
			const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
			"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
			
			for (const letterId of letters) {
				document.getElementById(letterId).remove();
			}
			
			spawnAllLetters();
			
			spawnParticles(canvas.width / 2, canvas.width * 0.38, canvas.height * 0.6, 50, 100, 0, 3, -4, 3, 5, 3, 0.1, "rgba(80,150,180,1)", false, 0.97);
	}
}

function checkAlphaLetter() {
	const lettersCheck = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
	"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	
	for (const letterId of lettersCheck) { 
		if (alphaWord.includes(document.getElementById(letterId).id)) {
			document.getElementById(letterId).style['color'] = "#8888AA";
			document.getElementById(letterId).style['font-size'] = "24px";
			document.getElementById(letterId).style['font-family'] = "Lexend Regular";
		
			const letterIndex = lettersCheck.indexOf(letterId);
			var letterTakenBefore = letterTakenArray[letterIndex];
			letterTakenArray[letterIndex] = true;
		
			if (letterTakenBefore == false && letterTakenArray[letterIndex] == true) {
				sfxAlphaLetter.play();
				for (let i = 0; i < letters.length; i++) {
				if (document.getElementById(letterId).id == letters[i][0]) {
						spawnParticles(canvas.width / 2 + (letters[i][1] / 2), 0, canvas.height / 2 + (letters[i][2] / 2), 0, 1, 0, 0, 0, 0, 15, 0, 0.5, "rgba(15,15,90,0.5)", false, 0);
					}
				}
			}
		}
	}
	checkAlphaClear();
}

// EVENT HANDLERS -------

window.onload = () => {
	const antiPaste = document.getElementById("inputBox");
	antiPaste.onpaste = e => e.preventDefault();
	
	const englishOnly = document.getElementById("inputBox");
	englishOnly.onkeydown = e => {
		if(!((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.code === 'Backspace' || e.key === 'Backspace' || e.code === 'Enter' || e.code === 'Quote' || e.code === 'Minus')) {
			e.preventDefault();
		}
		else {
				var picker = Math.floor(Math.random() * 5);
			if (picker == 0) {
				sfxType.currentTime = 0;
				sfxType.play();
			}
			else if (picker == 1) {
				sfxType2.currentTime = 0;
				sfxType2.play();
			}
			else if (picker == 2) {
				sfxType3.currentTime = 0;
				sfxType3.play();
			}
			else if (picker == 3) {
				sfxType4.currentTime = 0;
				sfxType4.play();
			}
			else if (picker == 4) {
				sfxType5.currentTime = 0;
				sfxType5.play();
			};
		}
	}
}


let inputUpdate = document.querySelector('input');
inputUpdate.addEventListener('input', () => {
	inp.placeholder = "";
	rpstext.style['display'] = "none";
	actext.style['display'] = "none";
	scr.style.color = "#666699";
});
inputUpdate.addEventListener('focus', () => {
	if (start == false) {
		generateRPR();
		start = true;
		prmpt.innerHTML = rpr.prompt;
	}
	else {};
})

var answerLength = 0;

// INVISIBLE SUBMIT BUTTON -------

let sub = document.createElement("button")
sub.id = "submitInput"
sub.type = "button"
sub.style = "display: none"
document.body.appendChild(sub);

// TEXT ANIMATIONS -------

var dlyPrompt = 1;
var dlyPromptSA = setTimeout(promptSizeAnimate, dlyPrompt);
function cdPrompt() {
	dlyPrompt *= 1.2;
}

function promptSizeAnimate() {
	if (parseInt(prmpt.style['font-size']) < 125) {
		prmpt.style['font-size'] = parseInt(prmpt.style['font-size']) + 2.5 + "px";
		cdPrompt();
		setTimeout(promptSizeAnimate, dlyPrompt);
	}
}

var dlyScore = 0.5;
var dlyScore = setTimeout(scoreSizeAnimate, dlyScore);
function cdScore() {
	dlyScore *= 1.2;
}

function scoreSizeAnimate() {
	if (parseInt(scr.style['font-size']) > 50) {
		scr.style['font-size'] = parseInt(scr.style['font-size']) - 1 + "px";
		cdScore();
		setTimeout(scoreSizeAnimate, dlyScore);
	}
}

var dlyLastAnswer = 0.5;
var dlyLastAnswerPA = setTimeout(laPosAnimate, dlyLastAnswer);
function cdLastAnswer() {
	dlyLastAnswer *= 1.1;
}

function laPosAnimate() {
	if (parseInt(la.style['margin-top']) < 490) {
		la.style['margin-top'] = parseInt(la.style['margin-top']) + 2 + "px";
		cdLastAnswer();
		setTimeout(laPosAnimate, dlyLastAnswer);
	}
}

var dlyInput = 0.5;
var dlyInputPAC = setTimeout(inputPosAnimateC, dlyInput);
var dlyInputPAW = setTimeout(inputPosAnimateW, dlyInput);
function cdInput() {
	dlyInput *= 1.3;
}

function inputPosAnimateC() {
	if (parseInt(inp.style['margin-top']) > 200) {
		inp.style['margin-top'] = parseInt(inp.style['margin-top']) - 1 + "px";
		cdInput();
		setTimeout(inputPosAnimateC, dlyInput);
	}
}

function inputPosAnimateW() {
	if (parseInt(inp.style['margin-top']) < 200) {
		inp.style['margin-top'] = parseInt(inp.style['margin-top']) + 1 + "px";
		cdInput();
		setTimeout(inputPosAnimateW, dlyInput);
	}
}

// VALIDATION CHECKER -------

var validMatch = false;
var duplicate = false;
var checked = false;
var submit = document.getElementById("inputBox");
submit.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		sfxEnter.currentTime = 0;
		sfxEnter.play();
		
		if (dictionary.indexOf((inp.value).toUpperCase()) !== -1) {
			validMatch = true;
			if (takenWords.indexOf((inp.value).toUpperCase()) !== -1) {
				duplicate = true;
				inp.style['margin-top'] = "190px";
				clearTimeout(dlyInputPAW);
				dlyInput = 1;
				inputPosAnimateW();
				sfxWrong.currentTime = 0;
				sfxWrong.play();
				checked = true;
			}
			else {
				inp.style['margin-top'] = "190px";
				clearTimeout(dlyInputPAW);
				dlyInput = 1;
				inputPosAnimateW();
				
				duplicate = false;
				checked = true;
			}
		}
		else {
			inp.style['margin-top'] = "190px";
			clearTimeout(dlyInputPAW);
			dlyInput = 1;
			inputPosAnimateW();
			sfxWrong.currentTime = 0;
			sfxWrong.play();
			checked = true;
		};
		
		if (checked == true) {
			if ((document.getElementById("inputBox").value.toUpperCase()).includes(rpr.prompt) && validMatch == true && duplicate == false) {
				event.preventDefault();
				document.getElementById("submitInput").click();
				la.innerHTML = document.getElementById("inputBox").value.toUpperCase();
				takenWords.push(document.getElementById("inputBox").value.toUpperCase());
				answerLength = document.getElementById("inputBox").value.length;
				
				gameScore += answerLength;
				if (rarePrompt == true) {
					gameScore += 10;
					scr.style.color = "#DD7755";
					rpstext.style['display'] = "flex";
					sfxRare.currentTime = 0;
					sfxRare.play();
				}
				
				scr.innerHTML = gameScore;
				
				alphaWord = document.getElementById("inputBox").value.toUpperCase();
				checkAlphaLetter();
				
				generateRPR();
				rectTimer = new rectangle();
				
				if ((rpr.filtered).length == 0) {}
				else {
					prmpt.innerHTML = rpr.prompt;
				}
				
				sfxCorrect.currentTime = 0;
				sfxCorrect.play();
				
				inp.style['margin-top'] = "215px";
				clearTimeout(dlyInputPAC);
				dlyInput = 1;
				
				scr.style['font-size'] = "60px";
				clearTimeout(dlyScore);
				dlyScore = 0.5;
				
				la.style['margin-top'] = "420px";
				clearTimeout(dlyLastAnswer);
				dlyLastAnswer = 0.5;
				
				scoreSizeAnimate();
				laPosAnimate();
				inputPosAnimateC();
				
				validMatch = false;
				duplicate = false;
				checked = false;
				
				inp.value = "";
			}
			else {
				inp.placeholder = document.getElementById("inputBox").value.toUpperCase();
				inp.value = "";
				
				clearTimeout(dlyInputPAW);
				dlyInput = 1;
				inputPosAnimateW();
				
				sfxWrong.currentTime = 0;
				sfxWrong.play();
				
				match = false;
				checked = false;
			}
		}
	}
})

// LOG DOWNLOAD --------

function downloadWordLog(filename, content) {
	var blob = new Blob([content], {type: "text/csv"});
	if(window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	}
	else {
		var element = window.document.createElement("a");
		element.href = window.URL.createObjectURL(blob);
		element.download = filename;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}

downloadLogButton.addEventListener("click", () => {
	const date = new Date();
	
	var filenameLog = "wordLog" + date.getTime() + ".txt";
	var contentLog = "SCORE: " + gameScore + ", WORDS: " + takenWords;
	downloadWordLog(filenameLog, contentLog);
});

// TIMER --------

var rectTimer;

rectTimer = new rectangle();

var overOnce = false;

function rectangle(x, y, width, height, color) {
	this.x = 0;
	this.y = 112;
	this.width = 560;
	this.height = 14;
	this.update = function() {
		ctx.fillStyle = color;
		color = "#222244";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	this.timeUpdate = function() {
		var drain;
		if (this.width > 0 && start == true) {
			drain = 0.6 + (gameScore / 400);
			this.width -= drain;
			this.x += drain / 2;
			spawnParticles(this.x + 5, 5, this.y + this.height / 2, this.height / 2, 1, -3, 1, -2, 4, 1.6, 0.8, 0.2, "rgba(34,34,68,0.5)", true, 1);
			spawnParticles(this.x + this.width - 5, 5, this.y + this.height / 2, this.height / 2, 1, 3, 1, -2, 4, 2, 1, 0.3, "rgba(34,34,68,0.5)", true, 1);
		}
		else if (this.width < 1 && overOnce == false && start == true) {
			inp.disabled = true;
			inp.value = "";
			inp.placeholder = "[GAME OVER]";
			solcount.style.color = "#444488";
			solcount.innerHTML = "GAME OVER!  |  Word Picked: " + rpr.pickWord;
			sfxGameOver.play();
			overOnce = true;
			
			rpstext.style['display'] = "none";
			actext.style['display'] = "none";
			retrytext.style['display'] = "flex";
			dlog.style['display'] = "flex";
		}
	};
}

// PARTICLES --------
var dots = [];
function dotCF(x, y, dx, dy, r, rDecay, color, gravity, slip) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.r = r;
	this.rDecay = rDecay;
	this.color = color;
	this.gravity = gravity;
	this.slip = slip;
}

function graphicsUpdate() {
	for (let i = 0; i < dots.length; i++) {
		dots[i].x += dots[i].dx;
		dots[i].y += dots[i].dy;
		
		if (dots[i].x > canvas.width) {
			dots[i].dx *= -1;
			dots[i].x = canvas.width;
		};
		if (dots[i].y > canvas.height) {
			dots[i].dy *= -1;
			dots[i].y = canvas.height;
		};
		if (dots[i].x < 0) {
			dots[i].dx *= -1;
			dots[i].x = 0;
		};
		if (dots[i].y < 0) {
			dots[i].dy *= -1;
			dots[i].y = 0;
		}
		
		ctx.beginPath();
		ctx.fillStyle = dots[i].color;
		ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 2 * Math.PI);
		ctx.fill();

		dots[i].r -= dots[i].rDecay;
		dots[i].dx *= dots[i].slip;
		dots[i].dy *= dots[i].slip;
		
		if (dots[i].gravity == true) {
			dots[i].dy += 0.1;
		}
		
		if (dots[i].r <= 0.01) {
			dots.splice(i, 1);
		}
	}
}

function spawnParticles(x, xVar, y, yVar, count, speedX, speedXVar, speedY, speedYVar, size, sizeVar, sizeDecay, color, gravity, slip) {
	for (let i = 0; i < count; i++) {
		var dot = new dotCF(x + ((Math.random() * xVar * 2) - xVar), y + ((Math.random() * yVar * 2) - yVar), speedX + ((Math.random() * (speedXVar * 2)) - speedXVar), speedY + ((Math.random() * (speedYVar * 2)) - speedYVar), (Math.random() * sizeVar) + size, sizeDecay, color, gravity, slip);
		dots.push(dot);
	}
}

// UPDATE SCREEN -------

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	rectTimer.update();
	graphicsUpdate();
}

function tick() {
	rectTimer.timeUpdate();
}

setInterval(tick, 15);

animate();