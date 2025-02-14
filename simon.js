const colors = ["red", "green", "orange", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;
let highScore = 0;

document.addEventListener("keydown", startGame);
document.getElementById("startGame").addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSequence = [];
        userSequence = [];
        document.querySelector(".score").textContent = "Level " + level;
        document.querySelector(".overlay").classList.add("hidden");
        nextSequence();
    }
}

function nextSequence() {
    userSequence = [];
    level++;
    document.querySelector(".score").textContent = "Level " + level;

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    setTimeout(() => {
        playFlash(randomColor);
    }, 500);
}

function playFlash(color) {
    let btn = document.getElementById(color);
    btn.classList.add("flash");
    playSound(color);
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let chosenColor = this.id;
        userSequence.push(chosenColor);
        playFlash(chosenColor);
        playSound(chosenColor);
        checkAnswer(userSequence.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 500);
        
        document.querySelector(".score").textContent = `Game Over! High Score: ${Math.max(level - 1, highScore)}. Press Any Key to Restart.`;
        document.querySelector(".overlay").classList.remove("hidden");
        
        highScore = Math.max(level - 1, highScore);
        document.querySelector(".high-score").textContent = "High Score: " + highScore;
        
        started = false;
    }
}
