
var userClickedPattern = [];
var gamePattern = [];
var buttonColors= ["red", "green", "yellow", "blue"];
var firstKeyPress = true;
var level = 0;

$(document).keydown(function(){
  if(firstKeyPress)
  {
    $("h1").text("Level 1")
    nextSequence();
    firstKeyPress = false;
  }
})


$(".btn").click(function(){
  var userChosenButton = this.id;
  userClickedPattern.push(userChosenButton);
  playSound(userChosenButton);
  animatePress(userChosenButton);
  checkAnswer((userClickedPattern.length)-1);
})

function nextSequence(){
  userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var number = Math.random();
    number = Math.round(number*3);
    console.log(number);
    var randomChosenColour = buttonColors[number];
    gamePattern.push(randomChosenColour);
    var clicked = "#" + randomChosenColour;
    $(clicked).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  firstKeyPress = true;
}
