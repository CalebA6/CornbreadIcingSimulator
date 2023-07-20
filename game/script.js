score = 0;

startX = [19, 73];
startY = 44;
endX = [9, 83];
endY = 70;

x = 0;
y = startY;

slideTime = 1000; // in milliseconds
steps = 500;

bread = document.getElementById('bread-div');
const resultsPanel = document.getElementById('outcome');

function getXStart() {
	return Math.floor(Math.random()*(startX[1]-startX[0]+1)) + startX[0];
}

waitForBread();

function waitForBread() {
	console.log('Waiting for the Bread');
	let waitTime = Math.floor(Math.random() * 2500) + 500;
	console.log(waitTime, 'ms');
	setTimeout(startBread, waitTime);
}

function startBread() {
	console.log('Starting the Bread');
	x = getXStart();
	xEnd = getXEnd(x);
	console.log(x, xEnd);
	calculateRiseAndRun(x, y, xEnd, endY);
	stepsLeft = steps;
	document.getElementById('bread').setAttribute('src', 'bread.png');
	bread.setAttribute('style', 'display: block; left: '+x.toString()+'vw; top: '+y.toString()+'vh;');
	bread.setAttribute('style', 'display: block;');
	//console.log(x);
	setTimeout(moveBread, slideTime/steps);
}

function getXEnd(xStart) {
	const midStartX = (startX[1] + startX[0]) / 2;
	const distanceFromMid = Math.abs(midStartX - xStart);
	const startXRange = startX[1] - startX[0];
	const proportionOfDistanceFromMid = distanceFromMid / startXRange;
	const midEndX = (endX[1] + endX[0]) / 2;
	const endXRange = endX[1] - endX[0];
	const distanceFromEndMid = proportionOfDistanceFromMid * endXRange;
	if(xStart < midStartX) {
		return midEndX - distanceFromEndMid;
	} else {
		return midEndX + distanceFromEndMid;
	}
}

// Bread starts between (19vw, 44vh) and (73vw, 44vh) and ends between (9vw, 70vh) and (83vw, 70vh)
function calculateRiseAndRun(x0, y0, x1, y1) {
	rise = y1 - y0;
	run = x1 - x0;
}

function moveBread() {
	console.log('Moving the Bread');
	if(stepsLeft > 0) {
		x += run / steps;
		y += rise / steps;
		
		//console.log(x);
		bread.setAttribute('style', 'display: block; left: '+x.toString()+'vw; top: '+y.toString()+'vh;');
		//bread.setAttribute('top', 'top: '+y.toString()+'vh');
		
		stepsLeft -= 1;
		setTimeout(moveBread, slideTime/steps);
	} else {
		iceQuestion();
	}
}

function iceQuestion() {
	const iceButtons = Array.from(document.getElementsByClassName('ice'));
	iceButtons.forEach(button => button.setAttribute('style', 'display: inline;'));
}

function ice(icing) {
	const iceButtons = Array.from(document.getElementsByClassName('ice'));
	iceButtons.forEach(button => button.removeAttribute('style'));
	
	console.log(icing);
	if(icing) {
		document.getElementById('bread').setAttribute('src', 'bread-iced.png');
	}
	
	const options = [
		{name: 'Cornbread', score: icing => {
			let score = Math.floor(Math.random() * 1000);
			if(icing) {
				
				return score * -1;
			} else {
				return 0;
			}
		}}, 
		{name: 'Cake', score: icing => {
			if(icing) {
				return Math.floor(Math.random() * 100);
			} else {
				return 0;
			}
		}}
	];
	const type = options[Math.floor(Math.random() * 2)];
	setTimeout(showResult, 200, type.name, type.score(icing));
}

function showResult(actual, score) {
	const result = document.getElementById('result');
	const scoreDisplays = Array.from(document.getElementsByClassName('score_change'));
	
	result.innerHTML = actual;
	
	let scoreString = score.toString();
	if((score == '0') && (actual == 'Cornbread')) {
		scoreString = '-' + scoreString;
	}
	if(scoreString[0] != '+' && scoreString[0] != '-') {
		scoreString = '+' + scoreString;
	}
	scoreDisplays.forEach(display => display.innerHTML = 'Score: ' + scoreString);
	updateScore(score);
	
	resultsPanel.setAttribute('style', 'display: block;');
}

function playAgain() {
	resultsPanel.removeAttribute('style');
	bread.removeAttribute('style');
	y = startY;
	waitForBread();
}

function updateScore(amount) {
	score += amount;
	console.log('New score', score);
	const scoreText = document.getElementById('score');
	scoreText.innerHTML = 'Score: ' + score;
}