var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    var randomNubmer = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNubmer];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    
    // button hide and show again
    $("#" + randomChosenColor).fadeOut().fadeIn();

    ++level;
    $("#level-title").text("Level " + level);
}

function playSound(soundName) {
    var sound_path = "sounds/" + soundName + ".mp3";
    var play_sound = new Audio(sound_path);
    play_sound.play();
}

function animatePress(currentCollor) {
    var currentButton = $("#" + currentCollor);
    currentButton.addClass("pressed");
    setTimeout(function() {
        currentButton.removeClass("pressed");
    }, 100);
}

function checkAnswer(indexOfLastAnswer) {
    if (gamePattern[indexOfLastAnswer] === userClickedPattern[indexOfLastAnswer]) {
        console.log("success=" + gamePattern[indexOfLastAnswer] + " " + userClickedPattern[indexOfLastAnswer]);
    
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        console.log("wrong=" + gamePattern[indexOfLastAnswer] + " " + userClickedPattern[indexOfLastAnswer]);
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

var isGameStarted = false;
$(document).keydown(function() {
    // need only one time at the start
    if (isGameStarted === false) {
        nextSequence();
        isGameStarted = true;
    }
});
