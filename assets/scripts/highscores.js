// highScore.js

let scoresBtn = document.getElementById("view-high-scores")


function renderHighscores() {
	let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
	highscores.sort(function (a, b) {
		return b.score - a.score
	})
	highscores.forEach(function (score) {
		let liTag = document.createElement("li")
		liTag.textContent = score.initials + " - " + score.score
		let olEl = document.getElementById("highscores")
		olEl.appendChild(liTag)
	})
}

function clearHighscores() {
	window.localStorage.removeItem("highscores")
	window.location.reload()
}

document.getElementById("clear").onclick = clearHighscores;

renderHighscores();
