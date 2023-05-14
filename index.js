
var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern = [];
var level = 0;
var started = false;
var myTurn;

$(document).on("keypress", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {
    if (myTurn) {
        if (started) {
            var userChosenColor = $(this).attr("id");
            userClickedpattern.push(userChosenColor);

            playSound(userChosenColor);
            animatePress(userChosenColor);

            checkAnswer(userClickedpattern.length - 1);
        }
    }
});


async function nextSequence() {
    myTurn = false;
    userClickedpattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (var i = 0; i < gamePattern.length; i++) {
        // setTimeout(animateButton(gamePattern[i]), 1000);
        animateButton(gamePattern[i]);
        //await sleep(1000);
        await new Promise(r => setTimeout(r, 500));

    }
    myTurn = true;
}

function sleep(ms) {
    return new Promise(resolve => (setTimeout(resolve, ms)))
}

function animateButton(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedpattern[currentLevel]) {
        if (gamePattern.length === userClickedpattern.length) {
            setTimeout(nextSequence, 1000)
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);

}


function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}


