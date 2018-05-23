'use strict';

var timer = 0;
var score = 0;
var stars = 3;
var int = 0;
var counting = 0;
var moves = 0;
var timesPlayed = 999;
var lengthStor = 0;
var gameLength = 0;
var matched = 0;
var inRow = 0;
var cards = [];
var matches = [];
var targets = [];
var keyCode = void 0;

cardsArr();
startScreen();
highscoreScreen();
winningScreen();

/**

* @description Adds start screen into the DOM

*/
function startScreen() {
	var cont = document.querySelector('.container_2');
	document.querySelector('.score_tab').style.visibility = "hidden";

	var table = document.createElement('div');
	table.classList.add('start');
	cont.appendChild(table);
	table.style.display = "block";

	var text = document.createElement('p');
	text.classList.add('text');
	text.textContent = "Press 'START' to play the game";
	table.appendChild(text);

	var restar = document.createElement('div');
	restar.classList.add('buttonCont');
	table.appendChild(restar);

	var staButton = document.createElement('button');
	staButton.classList.add('staButton');
	staButton.innerHTML = "START";
	restar.appendChild(staButton);
	staButton.addEventListener('click', function () {
		hideStart();
		beginGame();
	});

	var highButtons = document.createElement('button');
	highButtons.classList.add('highButton');
	highButtons.innerHTML = "Highscores";
	restar.appendChild(highButtons);
	highButtons.addEventListener('click', function () {
		showHighSc();
	});
}

/**

* @description Adds winning screen in to the DOM

*/
function winningScreen() {
	var cont = document.querySelector('.container_2');
	document.querySelector('.score_tab').style.visibility = "hidden";

	var modal = document.createElement('div');
	modal.classList.add('modal');
	cont.appendChild(modal);
	modal.style.display = "none";

	var tableWin = document.createElement('div');
	tableWin.classList.add('winning');
	modal.appendChild(tableWin);

	var texts = document.createElement('span');
	texts.classList.add('text');
	texts.textContent = "Congratulations, you won the game";
	tableWin.appendChild(texts);

	var infoDiv = document.createElement('div');
	infoDiv.classList.add('infoDiv');
	tableWin.appendChild(infoDiv);

	var inputDiv = document.createElement('div');
	inputDiv.classList.add('inputDiv');
	tableWin.appendChild(inputDiv);

	var name = document.createElement('input');
	name.classList.add('name_style');
	name.placeholder = "Name";
	inputDiv.appendChild(name);
	name.addEventListener('keydown', function (e) {
		keyCode = e.keyCode;
		if (e.keyCode == 13 || e.which == 13) {
			submiting();
		}
	});

	var submit = document.createElement('button');
	submit.classList.add('submit');
	submit.textContent = "Submit";
	inputDiv.appendChild(submit);
	submit.addEventListener('click', function () {
		submiting();
	});

	var resta = document.createElement('div');
	resta.classList.add('buttonWin');
	tableWin.appendChild(resta);

	var highButton = document.createElement('button');
	highButton.className = 'hi highButton';
	highButton.innerHTML = "Highscores";
	resta.appendChild(highButton);
	highButton.addEventListener('click', showHighSc);

	var restart = document.createElement('i');
	restart.className = 'fa fa-repeat';
	resta.appendChild(restart);
	restart.addEventListener('click', function () {
		hideShowWinning();
		hideHighSc();
		beginGame();
	});
}

/**

* @description Adds highscore screen in to the DOM

*/
function highscoreScreen() {
	var cont = document.querySelector('.container_2');
	document.querySelector('.score_tab').style.visibility = "hidden";

	var divCont = document.createElement('div');
	divCont.classList.add('highCont');
	cont.appendChild(divCont);
	divCont.style.display = "none";

	var topCont = document.createElement('div');
	topCont.classList.add('topCont');
	divCont.appendChild(topCont);

	var backB = document.createElement('button');
	backB.classList.add('backB');
	backB.innerHTML = "Back";
	topCont.appendChild(backB);
	backB.addEventListener('click', function () {
		hideHighSc();
	});

	var paragraph = document.createElement('p');
	paragraph.classList.add('highText');
	paragraph.innerHTML = "Name - Score - Stars - Time";
	topCont.appendChild(paragraph);

	var uList = document.createElement('ul');
	uList.classList.add('leaderListUL');
	divCont.appendChild(uList);
}

/**

* @description Hiding the start screen

*/
function hideStart() {
	var start = document.querySelector('.start');
	start.style.display = "none";
}

/**

* @description Showing the start screen

*/
function showStart() {
	var start = document.querySelector('.start');
	start.style.display = "block";
	hideTab();
	resetStars();
}

/**

* @description Showing higscore screen

*/
function showHighSc() {
	var highSc = document.querySelector('.highCont');
	highSc.style.display = "block";
	var local = localStorage.TimesPlayedFirst;
	var localInt = parseInt(local);

	for (var i = localInt; i >= 1000; i--) {
		var list = document.createElement('li');
		list.classList.add('leaderList');
		list.textContent = localStorage[i];
		document.querySelector('.leaderListUL').appendChild(list);
	}
	hideTab();
}

/**

* @description Hiding highscore screen

*/
function hideHighSc() {
	var highSc = document.querySelector('.highCont');
	highSc.style.display = "none";
	var removeList = document.querySelectorAll('.leaderList');

	for (var i = 0; i < removeList.length; i++) {
		removeList[i].remove();
	}
}

/**

* @description Hiding or showing winning screen

*/
function hideShowWinning() {
	var win = document.querySelector('.modal');
	var infoDiv = document.querySelector('.infoDiv');
	if (win.style.display === "none") {
		finalScore();
		var info = document.createElement('span');
		info.classList.add("clockText");
		info.innerHTML = "Play time: " + timer + " sec. \<br\>" + "Your score is: " + score + "." + "\<br\>" + "Stars: " + stars + "." + "\<br\>" + "Total moves: " + moves + ".";
		infoDiv.appendChild(info);
		win.style.display = "block";
	} else if (win.style.display === "block") {
		win.style.display = "none";
		document.querySelector('.clockText').remove();
	}
}

/**

* @description Winning function

*/
function winning() {
	stopTimers();
	finalScore();
	resetStars();
	hideTab();
	hideShowWinning();
	var input = document.querySelector('.name_style');
	input.value = "";
	input.disabled = false;
	document.querySelector('.submit').style.visibility = "visible";
}

/**

* @description Adding cards into an array

*/
function cardsArr() {
	var deck = document.getElementsByClassName('card');
	for (var i = 0; i < deck.length; i++) {
		cards.push(deck[i]);
	}
}

/**

* @description Adds the clicked element and evaluates the choice

* @param {array} elem - The element of the clicked card

*/
function evaluate(elem) {
	var childr = elem.firstElementChild;
	targets.push(childr.firstElementChild.className); //pushing class name of the clicked element into the array
	matches.push(elem); //pushing the whole element into an array

	if (targets.length === 1) {
		matches[0].className += " flip";
	} else if (targets.length === 2) {
		//when targets array has a length of 2
		matches[1].className += " flip";
		moves += 1;
		if (targets[0] === targets[1]) {
			matches[0].style.visibility = "hidden";
			matches[1].style.visibility = "hidden";
			inRow += 1;
			matched += 1;
			scoring(); //adding the points
			addingStars(); //adding stars
		} else if (targets[0] != targets[1]) {
			inRow = 0;
			var first = matches[0];
			var second = matches[1];
			setTimeout(function () {
				first.classList.toggle("flip");
				second.classList.toggle("flip");
			}, 700);
		}
		countMoves(); //counting moves
		targets = [];
		matches = [];
	}
	gameLe(); //checking game length
}

/**

* @description Deal cards

*/
function dealCards() {
	var cont = document.querySelector('.container_2');
	var ulCont = document.createElement('ul');
	ulCont.classList.add('deck');
	cont.appendChild(ulCont);
	/**
 	* @description Pushes the cards elements into the card array
 	*/
	for (var i = 0; i <= 15; i++) {
		ulCont.appendChild(cards[i]);
	}
}

/**

* @description Reseting everything and calling various
	functions to begin the game

*/
function beginGame() {
	moves = 0;
	matched = 0;
	timer = 0;
	score = 0;
	stars = 3;
	matches = [];
	targets = [];
	document.querySelector('.timeDisp').innerHTML = "0";
	resetStars();
	removeCards();
	countMoves();
	shuffle();
	dealCards();
	showStars();
	showTab();
	timers();
	gameLe();
	click();
}

/**

* @description Making the card elements selectible

*/
function click() {
	var allDeck = document.querySelector('.deck');
	/**
 	* @description Adds the clicked element mouse event
 	* @param {object} event - The mouse event of the clicked card
 	*/
	allDeck.addEventListener('click', function (event) {
		if (event.target.className === "card") {
			evaluate(event.target);
		}
	});
	/**
 	* @description Making the restart button clickable
 	*/
	var restart = document.querySelector('.pa');
	restart.addEventListener('click', function () {
		for (var i = 0; i < cards.length; i++) {
			cards[i].style.visibility = "visible";
			cards[i].className = "card";
		}
		stopTimers();
		beginGame();
	});
	/**
 	* @description Making the menu button clickable
 	*/
	var menu = document.querySelector('.menu');
	menu.addEventListener('click', function () {
		stopTimers();
		showStart();
	});
}

/**

* @description Shuffle the cards, taken from http://stackoverflow.com/a/2450976

*/
function shuffle() {
	var currentIndex = cards.length,
	    temporaryValue = void 0,
	    randomIndex = void 0;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
	}
	return cards;
}

/**

* @description Removes cards from the screen

*/
function removeCards() {
	document.querySelector('.deck').remove();
	for (var i = 0; i < cards.length; i++) {
		cards[i].style.visibility = "visible";
		cards[i].className = "card";
	}
}

/**

* @description Determining game lenght

*/
function gameLe() {
	gameLength = cards.length / 2;
	if (gameLength === matched) {
		setTimeout(function () {
			winning();
		}, 1000);
	}
}

//Score counting and score tab functions.......

/**

* @description Adding points

*/
function scoring() {
	if (inRow === 3) {
		score += 30;
	} else if (inRow === 2) {
		score += 20;
	} else if (inRow === 1) {
		score += 10;
	}
}

/**

* @description Calculates the final score

*/
function finalScore() {
	var staCoun = document.querySelector(".starsDisp");
	for (var i = 0; i <= 2; i++) {
		if (staCoun.children[i].style.visibility === "visible") {
			score += 30;
		}
	}
	var bonusSc = 100 - moves;
	score += bonusSc;
	var bonusTim = 100 - timer;
	if (bonusTim <= 1) {
		score += 1;
	} else if (bonusTim >= 1) {
		score += bonusTim;
	}
	score += stars * 10;
}

/**

* @description Stars removing from the screen

*/
function starsSyst() {
	var staRem = document.querySelector(".starsDisp");

	if (moves === 10 || moves === 20 || moves === 30) {
		if (staRem.children[2].style.visibility === "hidden" && staRem.children[1].style.visibility === "visible") {
			staRem.children[1].style.visibility = "hidden";
			stars -= 1;
		} else if (staRem.children[2].style.visibility === "visible") {
			staRem.children[2].style.visibility = "hidden";
			stars -= 1;
		}
	}
}

/**

* @description Stars adding

*/
function addingStars() {
	var staAdd = document.querySelector(".starsDisp");
	if (inRow === 2) {
		if (stars === 3) {
			stars = 3;
		} else {
			stars += 1;
		}
		for (var i = 0; i <= 2; i++) {
			if (staAdd.children[i].style.visibility === "hidden") {
				staAdd.children[i].style.visibility = "visible";
				break;
			}
		}
	} else if (inRow === 3) {
		if (stars === 3) {
			stars = 3;
		} else {
			stars += 1;
		}
		for (var _i = 0; _i <= 2; _i++) {
			if (staAdd.children[_i].style.visibility === "hidden") {
				staAdd.children[_i].style.visibility = "visible";
			}
		}
	}
}

/**

* @description Submiting a name and scores etc... into localStorage.

*/
function submiting() {
	document.querySelector('.submit').style.visibility = "hidden";
	lengthStor = localStorage.TimesPlayedFirst;
	if (localStorage.TimesPlayedFirst === undefined) {
		timesPlayed += 1;
		localStorage.setItem("TimesPlayedFirst", timesPlayed);
	} else {
		timesPlayed = 999;
		timesPlayed += 1;
		var stringNum = localStorage.TimesPlayedFirst;
		int = parseInt(stringNum);
		timesPlayed += int;
		localStorage.setItem("TimesPlayed", timesPlayed);
	}
	var input = document.querySelector(".name_style").value;
	localStorage.setItem(timesPlayed, input + "-" + score + " points" + "-" + stars + " stars" + "-" + timer + " sec" + "-" + moves + " moves");
	document.querySelector(".name_style").disabled = true;
}

/**

* @description Start timer

*/
function timers() {
	counting = setInterval(function () {
		timer += 1;
		timeDisp();
	}, 1000);
}

/**

* @description Stop timer

*/
function stopTimers() {
	clearInterval(counting);
}

/**

* @description Counting moves

*/
function countMoves() {
	var mov = document.querySelector('.moves');
	mov.innerHTML = moves + (moves === 1 ? " move" : " moves");
	starsSyst();
}

/**

* @description Reseting stars

*/
function resetStars() {
	var staRem = document.querySelector(".starsDisp");
	for (var i = 0; i < staRem.children.length; i++) {
		staRem.children[i].style.visibility = "hidden";
	}
}

/**

* @description Showing stars

*/
function showStars() {
	var staRem = document.querySelector(".starsDisp");
	for (var i = 0; i < staRem.children.length; i++) {
		staRem.children[i].style.visibility = "visible";
	}
}

/**

* @description Hides the score tab

*/
function hideTab() {
	document.querySelector('.score_tab').style.visibility = "hidden";
}

/**

* @description Shows the score tab

*/
function showTab() {
	document.querySelector('.score_tab').style.visibility = "visible";
}

/**

* @description Displays timer

*/
function timeDisp() {
	var timeDisp = document.querySelector('.timeDisp');
	timeDisp.innerHTML = timer;
}