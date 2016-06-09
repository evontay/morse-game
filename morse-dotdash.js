
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
var interval=0;
console.log(timeLeft);

$(document).ready(function(){
    
console.log("App is running.");




//===== HIDE SHOW CHART =====//

    $('.hideshow').on('click', function(event){
        $('#testbox').toggleClass('bigbox');
   
        $('.count').html(timeLeft);
         
         if(interval!==0 && timeLeft!==0) {
             clearInterval(interval);
             return;
         } else {
         time();
         }
    });
});

//===== COUNTDOWN TIMER =====//
// var interval = setInterval(function(){
//     if (timeLeft === 0) {clearInterval(interval);}
//     return timeLeft;
// }, 1000);



var time = function (){
    
    interval = setInterval(function(){
        timeLeft --;
        $('.count').html(timeLeft);
        if (timeLeft === 0) {
            clearInterval(interval);
            $('#prompts').addClass('smaller').html("Ran out of chart viewing time. Good luck.");
            $('#testbox').hide();
            $('.hideshow').hide();
        }
     
    }, 1000);
       
}; 

//===== START BUTTON =====//
$('#bigbtn').on('click', function(event){
    $('.pregame').addClass('disappear');
    $('#score').removeClass('disappear');
    $('#time').removeClass('disappear');
    $('#testbox').removeClass('bigbox');
    $('#dotdashgame').removeClass('disappear');
    $('#qn h3').text(gameA.questions[gameA.currentQuestion].prompt);
    $('#prompts h3').text("Question " + (gameA.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log("Question " + (gameA.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log(gameA.questions[gameA.currentQuestion]);
});

//====== UPDATES DISPLAY TEXT FOR QUESTIONS =======//
var updateDisplay = function(){
    if (gameA.isGameOver === true) {
        $('#qn h3').html("");
        $('#prompts h3').html("Game is over.");
        $('#status').hide();
    }
    else {
        $('#qn h3').html(gameA.questions[gameA.currentQuestion].prompt);
        $('#prompts h3').html("Question " + (gameA.currentQuestion + 1) + " of " + numberOfQuestions());
        console.log(gameA.questions[gameA.currentQuestion]);
    }
};

//===== UPDATES QUESTION PROMPTS =====//



//====== UPDATES DISPLAY TEXT FOR MESSAGES =======//
var displayMsg = function(input) {
    if (gameA.isGameOver === true) {
     $('#status').text("");   
    }
    if (gameA.questions[gameA.currentQuestion].correctAnswer === input)
    {
        console.log("correct:" + gameA.questions[gameA.currentQuestion].correctAnswer);
        return 'Correct!';
    }
    else {
        console.log("displayMsg: Wrong!: " + gameA.questions[gameA.currentQuestion].correctAnswer);
        return 'Wrong! Better luck for this next one.';
    }
};


$('#status').text(displayMsg(gameA.questions[gameA.currentQuestion]));


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
$('#playerInput').keyup(function(){
    this.value = this.value.toUpperCase();
});

$('#enter').on('click', function(event) {
    var input = $('#playerinput').val();
    console.log("user input:" + input);
    console.log("player score:" + playerScore);
    $('#status').removeClass('disappear');
    // reset form: $('#playerInput').reset();
    
    playTurn(input);
    updateDisplay();
       
});


//===== PLAY TURN =====//
var playTurn = function(input){
    console.log("user:" + input);
    if (gameA.isGameOver === true) {return false;}
    // var correct = false;
    if (input === gameA.questions[gameA.currentQuestion].correctAnswer) {
        correct = true;
        gameA.playerScore++ ;
        $('#score p').html(gameA.playerScore);
        console.log("playTurn + 1 playerScore:" + gameA.playerScore );
        console.log("correct answer:" + gameA.questions[gameA.currentQuestion].correctAnswer);
        console.log("displayMsg:" + displayMsg(input));
        $("#status").html(displayMsg(input));
    }
    if (input !== gameA.questions[gameA.currentQuestion].correctAnswer) {
        correct = false;
        console.log("playTurn no playerScore:" + gameA.playerScore);
        console.log("Playturn: Wrong. Better luck for this next one.");
        displayMsg(input);
        $("#status").html(displayMsg(input));
        // to update displayMsg to say 'Wrong. Please try again'
        //vibrating input field for 0.5s.
        //if currentQuestion is wrong for more than 3x, go to next qn.
    }
    ++ gameA.currentQuestion;
    if (gameA.currentQuestion === numberOfQuestions()) {
        gameA.isGameOver = true;
        
    }
    // return correct;
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