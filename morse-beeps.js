console.log("App is running.");


//===== HIDE SHOW CHART =====//
$(document).ready(function(){
    $('.hideshow').on('click', function(event){
        $('#testbox').toggleClass('bigbox');
        console.log('test hideshow');
        // minus seconds off timer
        $('.count').html(timeLeft);
    });
});

//===== COUNTDOWN TIMER =====//
var interval = setInterval(function(){
    if (timeLeft === 0) {clearInterval(interval);}
    return timeLeft;
}, 1000);

//===== START BUTTON =====//
$('#bigbtn').on('click', function(event){
    $('.pregame').addClass('disappear');
    $('#score').removeClass('disappear');
    $('#time').removeClass('disappear');
    $('#testbox').removeClass('bigbox');
    $('#dotdashgame').removeClass('disappear');
    // call first question to appear
});

//PLAY AUDIO ON CLICK
$('#beepqn').on('click', function(event){
    audio0b.play();
});

//====== UPDATES DISPLAY TEXT FOR QUESTIONS =======//
// var displayQn;
$('#qn').text(gameA.currentQuestion);

//====== UPDATES DISPLAY TEXT FOR MESSAGES =======//
var displayMsg = function() {
    if (gameA.currentQuestion.correctAnswer === true){
        return 'Correct!';
    }
    if (gameA.currentQuestion.correctAnswer !== true){
        return 'Wrong! Try again.';
    }
};

$('#status').text(displayMsg);

//===== STARTER VARIABLES =====//
var playerScore;
var timeLeft = 60; //chart time countdown

var gameB = {
    currentQuestion: 0,
    questions: [question0b, question1b, question2b, question3b, question4b, question5b, question6b, question7b, question8b, question9b],
    isGameOver: false,
    playerScore: 0
};

var numberOfQuestions = function (){
    return gameA.questions.length;
};


//===== FUNCTION TO MAKE NEW QUESTIONS =====//
var createQuestion = function(prompt, correctAnswer) {
    this.prompt = prompt;
    this.correctAnswer = correctAnswer;
};


// CREATING NEW QUESTIONS FOR GAME B - BEEPS
var question0b = new createQuestion ('audio0b', 'E');
var question1b = new createQuestion ('audio1b', 'W');
var question2b = new createQuestion ('audio2b', '3');
var question3b = new createQuestion ('audio3b', 'SOS');
var question4b = new createQuestion ('audio4b', 'STOP');
var question5b = new createQuestion ('audio5b', 'OUT');
var question6b = new createQuestion ('audio6b', 'HOT');
var question7b = new createQuestion ('audio7b', 'GOOD');
var question8b = new createQuestion ('audio8b', 'HELLO');
var question9b = new createQuestion ('audio9b', 'GO BACK');

// FOR GAME B: TYING AUDIO FILES TO RESPECTIVE QUESTIONS
var audio0b = question0b.prompt;
var audio1b = question1b.prompt;
var audio2b = question2b.prompt;
var audio3b = question3b.prompt;
var audio4b = question4b.prompt;
var audio5b = question5b.prompt;
var audio6b = question6b.prompt;
var audio7b = question7b.prompt;
var audio8b = question8b.prompt;
var audio9b = question9b.prompt;

//===== IS GAME OVER should return a true or false =====//
var isGameOver = function(){
    return gameA.isGameOver;
};

//===== FUNCTION TO GET USER INPUT VALUE ON KEYBOARD =====//
var getInput = function (){
    
};


//===== PLAY TURN =====//
var playTurn = function(input){
    if (gameA.isGameOver === true) {return false;}
    if (input === quiz.currentQuestion.correctAnswer) {
        gameA.playerScore++;
        console.log('Correct!');
        //update displayMsg to say 'Correct' for 2 secs, then disappear.
    }
    if (input !== quiz.currentQuestion.correctAnswer) {
        console.log("Please try again.");
        //update displayMsg to say 'Wrong. Please try again'
        //vibrating input field for 0.5s.
        //if currentQuestion is wrong for more than 3x, go to next qn.
    }
    ++ gameA.currentQuestion;
};


//===== GAME RESTART =====//
var restart = function() {
    timer = 60;
    gameA.currentQuestion = 0;
    gameA.isGameOver = false;
    gameA.playerScore = 0;
    updateMainDisplay();
};