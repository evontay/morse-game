
//===== FUNCTION TO MAKE NEW QUESTIONS =====//
var createQuestion = function(prompt, correctAnswer) {
    this.prompt = prompt;
    this.correctAnswer = correctAnswer;
};


//===== CREATING NEW QUESTIONS FOR GAME A - DOT-DASH ====//
var question0a = new createQuestion ('-', 'T');
var question1a = new createQuestion ('---', 'O');
var question2a = new createQuestion ('---..', '8');
var question3a = new createQuestion ('--. ---', 'GO');
var question4a = new createQuestion ('-.-. .- -', 'CAT');
var question5a = new createQuestion ('.-. ..- -.', 'RUN');
var question6a = new createQuestion ('-.-. --- .-.. -..', 'COLD');
var question7a = new createQuestion ('.-.. --- ...- .', 'LOVE');
var question8a = new createQuestion ('-... --- - - --- --', 'BOTTOM');
var question9a = new createQuestion ('..-. .- -- .. .-.. -.--', 'FAMILY');

//===== AN OBJECT TO REPRESENT ALL GAME ELEMENTS TOGETHER =====/
var gameA = {
    currentQuestion: 0,
    questions: [question0a, question1a, question2a, question3a, question4a, question5a, question6a, question7a, question8a, question9a],
    isGameOver: false,
    playerScore: 0
};

//===== STARTER VARIABLES =====//
var playerScore;
var timeLeft = 60; //chart time countdown
console.log(timeLeft);

$(document).ready(function(){
    
console.log("App is running.");





//===== HIDE SHOW CHART =====//

    $('.hideshow').on('click', function(event){
        $('#testbox').toggleClass('bigbox');
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
    $('#qn h3').text(gameA.questions[gameA.currentQuestion].prompt);
    console.log(gameA.questions[gameA.currentQuestion]);
});

//====== UPDATES DISPLAY TEXT FOR QUESTIONS =======//
var updateDisplay = function(){
    $('#qn h3').html(gameA.questions[gameA.currentQuestion].prompt);
    console.log(gameA.questions[gameA.currentQuestion]);
};



//====== UPDATES DISPLAY TEXT FOR MESSAGES =======//
var displayMsg = function(input) {
    
    if (gameA.questions[gameA.currentQuestion].correctAnswer === input)
    {
        console.log("correct:" + gameA.questions[gameA.currentQuestion].correctAnswer);
        return 'Correct!';
    }
    else {
        console.log("Wrong:" + gameA.questions[gameA.currentQuestion].correctAnswer);
        return 'Wrong!';
    }
};

$('#status').text(displayMsg(gameA.questions[gameA.currentQuestion].prompt));


//===== CURRENT QUESTION =====//
var currentQuestion = function(){
    return gameA.currentQuestion;
};




//===== NO. OF QUESTIONS =====//
var numberOfQuestions = function (){
    return gameA.questions.length;
};



//===== FUNCTION TO CALL CORRECT ANSWER FROM THE GAME A OBJECT =====//
var correctAnswer = function(){
    return gameA.questions[gameA.currentQuestion].correctAnswer;
};


//===== IS GAME OVER should return a true or false =====//
var isGameOver = function(){
    return gameA.isGameOver;
};

//===== FUNCTION TO GET USER INPUT VALUE =====//
$('#enter').on('click', function(event) {
    console.log('clicked enter btn');
    var input = $('#playerinput').val();
    console.log("user input:" + input);
    console.log("player score:" + playerScore);
    
    
    playTurn(input);
    updateDisplay();
    
});


//===== PLAY TURN =====//
var playTurn = function(input){
    console.log(input);
    if (gameA.isGameOver === true) {return false;}
    var correct = false;
    if (input === gameA.questions[gameA.currentQuestion].correctAnswer) {
        correct = true;
        gameA.playerScore++;
        
        console.log("correct answer:" + gameA.questions[gameA.currentQuestion].correctAnswer);
        console.log("displayMsg:" + displayMsg(input));
        $("#status").html(displayMsg(input));
    }
    if (input !== gameA.questions[gameA.currentQuestion].correctAnswer) {
        correct = false;
        console.log("Wrong. Better luck for this next one.");
        // to update displayMsg to say 'Wrong. Please try again'
        //vibrating input field for 0.5s.
        //if currentQuestion is wrong for more than 3x, go to next qn.
    }
    ++ gameA.currentQuestion;
    if (gameA.currentQuestion === numberOfQuestions()) {gameA.isGameOver = true;}
    return correct;
};




//===== GAME RESTART =====//
var restart = function() {
    console.log('restarts game and timer.');
    timer = 60;
    gameA.currentQuestion = 0;
    gameA.isGameOver = false;
    gameA.playerScore = 0;
    updateMainDisplay();
};