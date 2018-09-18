var startButton = document.getElementById("startBttn");
var stopButton = document.getElementById("stopBttn");
var squareNR = document.getElementById("squareNR");
var time = document.querySelector("#time");
var container = document.getElementById("container");
var containerHolder = document.getElementById("containerHolder");
var pointsContainer = document.getElementById("points");
var parametresContainer = document.getElementById("parametresContainer");
var bttnHolder = document.getElementById("bttnHolder");
var parametres = document.getElementById("parametres");
var htmlElements = [];
var message = document.createElement("div");
message.id = "message";
var resultat = document.getElementById("resultat");
var resultContainer = document.getElementById("results");
resultContainer.classList.add("invisible");
var points = 0;
var startPoints = 0;
var pointsNeeded = 800;
var timer = document.querySelector("#timer");
var timerCount = 60;
var timerPart = 60;
var progressBar = document.getElementById("progressBar");
var scoreTotalInterval;
var timerInterval;
var intervalID;
stopButton.disabled = true;
function genSquare () {
    var randomIndex = Math.floor(Math.random()*squareNR.value);
    time.disabled = true;
    squareNR.disabled = true;
    container.innerHTML = "";
    for (var i = 0; i < squareNR.value; i++) {
        if (i === randomIndex) {
            htmlElements = document.createElement("div");
            htmlElements.classList.add("square");
            htmlElements.classList.add("red");
            htmlElements.classList.add("col-2");
            htmlElements.id = "goodSquare";
        } else {
            htmlElements = document.createElement("div");
            htmlElements.classList.add("square");
            htmlElements.classList.add("lightBlue");
            htmlElements.classList.add("badSquares");
            htmlElements.classList.add("col-2");
            htmlElements.addEventListener("click", badSquares);
        }
        container.appendChild(htmlElements);
    }
    document.getElementById("goodSquare").addEventListener("click", function() {
        clearInterval(intervalID);
        genSquare();
        points += 10;
      }, false);
      function badSquares() {
        clearInterval(intervalID);
        genSquare();
        if (points <= 0) {
            points = 0;
        } else {
            points -= 10;
        }
      }

    intervalID = setTimeout(genSquare, time.value * 1000);
    
}
function timerUpdater () {
    timerCount--;
    timer.innerHTML = "Time Left: " + timerCount.toString() + "s";
}

startButton.addEventListener("click", function () {
    if (time.value === "" || squareNR.value === "") {
        return;
    } else {
        parametresContainer.removeChild(parametres);
        parametres.classList.add("invisible");
        resultat.appendChild(pointsContainer);
        resultat.appendChild(progressBar);
        message.classList.remove("winner");
        message.classList.remove("looser");
        message.innerHTML = "";
        resultContainer.classList.remove("invisible");
        startButton.disabled = true;
        stopButton.disabled = false;
        genSquare();
        timerUpdater();
        timerInterval = setInterval(function () {
            timerUpdater();
        }, 1000);
        scoreTotalInterval = setInterval(function () {
            pointsContainer.innerHTML = "Vos points: " + points + "/" + pointsNeeded;
            progressBar.style.width = points / 100 * 12.5 + "%";
            if (timerCount === 0) {
                if (points > pointsNeeded) {
                    message.innerHTML = "Vous avez gagner";
                    message.classList.add("winner");
                } else {
                    message.innerHTML = "Vous avez perdu";
                    message.classList.add("looser");
                }
                container.innerHTML = "";
                stopButton.value = "Restart";
                clearInterval(scoreTotalInterval);
                clearInterval(timerInterval);
                clearInterval(intervalID);
                containerHolder.appendChild(message);
            }
            if (points === pointsNeeded) {
                clearInterval(scoreTotalInterval);
                clearInterval(timerInterval);
                clearInterval(intervalID);
                stopButton.value = "Restart";
                container.innerHTML = "";
                message.innerHTML = "Vous avez gagner";
                message.classList.add("winner");
                containerHolder.appendChild(message);
            }
        }, 0);
    }
});
stopButton.addEventListener('click', function () {
    parametresContainer.appendChild(parametres);
    parametresContainer.appendChild(bttnHolder);
    resultContainer.classList.add("invisible");
    parametres.classList.remove("invisible");
    message.classList.remove("winner");
    message.classList.remove("looser");
    message.innerHTML = "";
    startButton.disabled = false;
    stopButton.disabled = true;
    time.disabled = false;
    time.value = "";
    timer.innerHTML = "";
    squareNR.disabled = false;
    squareNR.value = "";
    stopButton.value = "Arréter";
    container.innerHTML = "";
    resultat.removeChild(pointsContainer);
    resultat.removeChild(progressBar);
    timerCount = timerPart;
    points = startPoints;
    clearInterval(scoreTotalInterval);
    clearInterval(timerInterval);
    clearInterval(intervalID);
})