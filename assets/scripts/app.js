import questions from './questions'

//Reference HTML DOM elements
const questionsEl = document.getElementById("questions")
let timerEl = document.getElementById("time")
let choicesEl = document.getElementById("choices")
let submitBtn = document.getElementById("submit")
let startBtn = document.getElementById("start")
let initialsEl = document.getElementById("initials")
let feedbackEl = document.getElementById("feedback")
let reStartBtn = document.querySelector("#restart");

// starting state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;


function startQuiz() {
	timerId = setInterval(timeKeeper, 1000)
	timerEl.textContent = time
	let startingScreenEl = document.getElementById("start-screen")
	startingScreenEl.setAttribute("class", "hide")
	questionsEl.removeAttribute("class");
	getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
	let currentQuestion = questions[currentQuestionIndex]
	let promptElement = document.getElementById("question-title")
	promptElement.textContent = currentQuestion.prompt
	choicesEl.innerHTML = ""
    // render the options for each available answer
	currentQuestion.options.forEach(function (choice, i) {
		let choiceBtn =	document.createElement("button")
		choiceBtn.setAttribute("value", choice)
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick
	    choicesEl.appendChild(choiceBtn)
		}
	)
}

//end quiz by hiding the questions 
function endQuiz() {
	clearInterval(timerId)
	let endScreenEl = document.getElementById("quiz-end")
	endScreenEl.removeAttribute("class")
	let finalScoreEl = document.getElementById("score-final")
	finalScoreEl.textContent = time
	questionsEl.setAttribute("class", "hide")
}


// Check whether answers are correct, if not - decrease the time
function questionClick() {
    //if the choice picked is incorrect - deduct time and prompt the user they picked incorrect answer
	if (this.value !== questions[currentQuestionIndex].answer) {
		time -= 10;
        //prevent timer from going below 0
		if (time < 0) {
			time = 0
		}
		timerEl.textContent = time
		feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`
		feedbackEl.style.color = "red"
	} 
    else {
		feedbackEl.textContent = "Correct!"
		feedbackEl.style.color = "green"
	}

	feedbackEl.setAttribute("class", "feedback")
	setTimeout(function () {
		feedbackEl.setAttribute("class", "feedback hide");
	}, 2000);

    // move onto next question when the user has been indicated whether answer is correct or not 
	currentQuestionIndex++;
    
    // if we have finished/reached the last question - then endQuiz - otherwise move onto next question
	currentQuestionIndex === questions.length ? endQuiz() : getQuestion()
}


// End quiz if timer reaches 0
function timeKeeper() {
	time--;
	timerEl.textContent = time;
	if (time <= 0) {
		endQuiz();
	}
}



// save scores in local storage
function highScoresStorage() {
	let initials = initialsEl.value.trim()
	if (initials !== "") {
		let highscores = JSON.parse(window.localStorage.getItem("highscores")) || []
		let newScore = {
			score: time,
			initials: initials,
		}
		highscores.push(newScore)
		window.localStorage.setItem("highscores", JSON.stringify(highscores))
		alert("Your score has been added to highscores")
	}
}




// click event for starting quiz
startBtn.onclick = startQuiz

// click event for submitting highscores
submitBtn.onclick = highScoresStorage





