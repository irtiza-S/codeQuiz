import questions from './questions'

//Reference HTML DOM elements

const questionsEl = document.getElementById("questions")
let timerEl = document.getElementById("time")
let choicesEl = document.getElementById("choices")
let submitBtn = document.getElementById("submit")
let startBtn = document.getElementById("start")
let nameEl = document.getElementById("initials")
let feedbackEl = document.getElementById("feedback")
let reStartBtn = document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function startQuiz() {
	timerId = setInterval(
		clockTick,
		1000
	);
	timerEl.textContent = time;
	let landingScreenEl =
		document.getElementById(
			"start-screen"
		);
	landingScreenEl.setAttribute(
		"class",
		"hide"
	);
	questionsEl.removeAttribute(
		"class"
	);
	getQuestion();
}

