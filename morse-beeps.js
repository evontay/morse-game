
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

//===== AN OBJECT TO REPRESENT ALL GAME ELEMENTS TOGETHER =====/
var gameB = {
    currentQuestion: 0,
    questions: [question0b, question1b, question2b, question3b, question4b, question5b, question6b, question7b, question8b, question9b],
    isGameOver: false,
    playerScore: 0
};

//===== STARTER VARIABLES =====//
var playerScore;
var timeLeft = 60; //chart time countdown
var interval=0;
console.log(timeLeft);

$(document).ready(function(){
    
console.log("Beep App is running.");




//===== HIDE SHOW CHART =====//

    $('.hideshow').on('click', function(event){
        $('#testbox').toggleClass('bigbox');
   
        $('.count').html(timeLeft);
         console.log("interval:" + interval);
         if(interval===0 && timeLeft>0) {
            time();
         } else {
           clearInterval(interval);
           interval=0;
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
        //timeLeft --;
        console.log("in time function:" + timeLeft);
        if(timeLeft<=0) {
            timeLeft=0;
        } else {
            timeLeft--;
        }
        $('.count').html(timeLeft);
        if (timeLeft === 0) {
            //clearInterval(interval);
            $('#prompts').addClass('smaller').html("Oops. Ran out of chart time.");
            $('#testbox').hide();
            $('.hideshow').hide();
        }
     
    }, 1000);
       
}; 

//===== START BUTTON =====//
$('#bigbtn').on('click', function(event){
    $('#pre').hide();
    $('#learnchart').hide();
    $('#pretitle').hide();
    $('.pregame').addClass('disappear');
    $('#score').removeClass('disappear');
    $('#time').removeClass('disappear');
    $('#testbox').removeClass('bigbox');
    $('.hideshow').removeClass('disappear');
    $('#testbox').removeClass('disappear');
    $('#dotdashgame').removeClass('disappear');
    $('#qn h3').text(gameB.questions[gameB.currentQuestion].prompt);
    $('#prompts h3').text("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log(gameB.questions[gameB.currentQuestion]);
});

//====== UPDATES DISPLAY TEXT FOR QUESTIONS =======//
var updateDisplay = function(){
    if (gameB.isGameOver === true) {
        $('#qn h3').html("");
        $('#prompts h3').html("Game is over.");
        $('#status').hide();
    }
    else {
        $('#qn h3').html(gameB.questions[gameB.currentQuestion].prompt);
        $('#prompts h3').html("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
        console.log(gameB.questions[gameB.currentQuestion]);
    }
};




//====== UPDATES DISPLAY TEXT FOR MESSAGES =======//
var displayMsg = function(input) {
    if (gameB.isGameOver === true) {
     $('#status').text("");   
    }
    if (gameB.questions[gameB.currentQuestion].correctAnswer === input)
    {
        console.log("correct:" + gameB.questions[gameB.currentQuestion].correctAnswer);
        return 'That is correct!';
    }
    else {
        console.log("displayMsg: Wrong!: " + gameB.questions[gameB.currentQuestion].correctAnswer);
        return 'Wrong! Try this next one.';
    }
};


$('#status').text(displayMsg(gameB.questions[gameB.currentQuestion]));


//===== CURRENT QUESTION =====//
var currentQuestion = function(){
    return gameB.currentQuestion;
};




//===== NO. OF QUESTIONS =====//
var numberOfQuestions = function (){
    return gameB.questions.length;
};



//===== FUNCTION TO CALL CORRECT ANSWER FROM THE GAME A OBJECT =====//
var correctAnswer = function(){
    return gameB.questions[gameB.currentQuestion].correctAnswer;
};


//===== IS GAME OVER should return a true or false =====//
var isGameOver = function(){
    return gameB.isGameOver;    
};

//===== FUNCTION TO GET USER INPUT VALUE =====//


//get 'enter' key to submit answer!!!
$("input").keypress(function(event){
    if (event.which == 13) {
        $("form").submit(input);
    }
});

$('#enter').on('click', function(event) {
    var input = $('#playerinput').val().toUpperCase();
    console.log("user input:" + input);
    console.log("player score:" + playerScore);
    $('#status').removeClass('disappear');
    // $('#status').effect('shake');
    // reset form: $('#playerInput').reset();
    
    playTurn(input);
    updateDisplay();
       
});


//===== PLAY TURN =====//
var playTurn = function(input){
    console.log("user:" + input);
    if (gameB.isGameOver === true) {return false;}
    // var correct = false;
    if (input === gameB.questions[gameB.currentQuestion].correctAnswer) {
        correct = true;
        gameB.playerScore++ ;
        $('#score p').html(gameB.playerScore);
        console.log("playTurn + 1 playerScore:" + gameB.playerScore );
        console.log("correct answer:" + gameB.questions[gameB.currentQuestion].correctAnswer);
        console.log("displayMsg:" + displayMsg(input));
        $("#status").html(displayMsg(input));
    }
    if (input !== gameB.questions[gameB.currentQuestion].correctAnswer) {
        correct = false;
        console.log("playTurn no playerScore:" + gameB.playerScore);
        console.log("Playturn: Wrong. Better luck for this next one.");
        
        displayMsg(input);
        $("#status").html(displayMsg(input));
        // to update displayMsg to say 'Wrong. Please try again'
        //vibrating input field for 0.5s.
        //if currentQuestion is wrong for more than 3x, go to next qn.
    }
    ++ gameB.currentQuestion;
    if (gameB.currentQuestion === numberOfQuestions()) {
        gameB.isGameOver = true;
        
    }
    // return correct;
};




//===== GAME RESTART =====//
var restart = function() {
    console.log('restarts game and timer.');
    timer = 60;
    gameB.currentQuestion = 0;
    gameB.isGameOver = false;
    gameB.playerScore = 0;
    updateMainDisplay();
};