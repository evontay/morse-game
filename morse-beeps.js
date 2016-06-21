
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
   
        $('.count').html(timeLeft); //to update display
         console.log("interval:" + interval);
         if(interval===0 && timeLeft>0) { //if there is no timer & there is time left
            time(); // run timer
         } else {
           clearInterval(interval); //else pause timer
           interval=0; // delete timer
         }
    });
});

//===== COUNTDOWN TIMER =====//
// var interval = setInterval(function(){
//     if (timeLeft === 0) {clearInterval(interval);}
//     return timeLeft;
// }, 1000);



var time = function (){ //timer is a function
    
    interval = setInterval(function(){ //set the timer
        
        console.log("in time function:" + timeLeft); 
        if(timeLeft<=0) { // if no more time left
            {clearInterval(interval);} //pause timer
            timeLeft="0"; //forces timeLeft to stay at 0
        } else {
            timeLeft--; //else minus seconds off timeleft
        }
        $('.count').html(timeLeft); //updates display
        
        if (timeLeft === 10) {
            $('.count').css("color", "red");
            $('.count').css("font-size", "2em");
        }
        
        if (timeLeft === 0) { // when timeleft reaches 0, do the following...
            //clearInterval(interval);
            $('#prompts').addClass('smaller').html("No more chart time, but do go on!");
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
    $('#beepqn').html("<source src='./audio/" + gameB.questions[gameB.currentQuestion].prompt + ".wav' type='audio/wav'/>");
    $('#prompts h3').text("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
    console.log(gameB.questions[gameB.currentQuestion]);
});

//====== UPDATES DISPLAY TEXT FOR QUESTIONS =======//
var updateDisplay = function(){
    if (gameB.isGameOver === true) {
        $('#prompts h3').html("Game is over.");
        $('#status').hide();
        $('form').hide();
        $('#playbtn').hide();
        $('#enter h3').text('Restart?');
        $('#enter').on('click', function(event){
            window.location = "./index.html";
        });
        
    }
    else {
        $('#beepqn').html("<source src='./audio/" + gameB.questions[gameB.currentQuestion].prompt + ".wav' type='audio/wav'/>");
        console.log("updateDisplay1: <source src='./audio/" + gameB.questions[gameB.currentQuestion].prompt + ".wav' type='audio/wav'/>");
        
        $('#prompts h3').html("Question " + (gameB.currentQuestion + 1) + " of " + numberOfQuestions());
        console.log("updateDisplay2: " + gameB.questions[gameB.currentQuestion].prompt);
    }
};

//==== PLAY AUDIO QUESTION BUTTON ====//
var play = function(){
    console.log("CurrentQn " + gameB.currentQuestion);
    document.getElementById('audio' + gameB.currentQuestion + 'b').play();
    console.log("play button: " + 'audio' + gameB.currentQuestion + 'b');
    
};


//====== UPDATES DISPLAY TEXT FOR MESSAGES =======//
var displayMsg = function(input) {
    if (gameB.isGameOver === true) {
     $('#status').text("");   
    }
    if (gameB.questions[gameB.currentQuestion].correctAnswer === input)
    {
        console.log("correct:" + gameB.questions[gameB.currentQuestion].correctAnswer);
        return "Awesome! That's correct!";
    }
    else {
        console.log("displayMsg: Wrong! Ans: " + gameB.questions[gameB.currentQuestion].correctAnswer);
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



//===== FUNCTION TO CALL CORRECT ANSWER FROM THE GAME B OBJECT =====//
var correctAnswer = function(){
    return gameB.questions[gameB.currentQuestion].correctAnswer;
};


//===== IS GAME OVER should return a true or false =====//
var isGameOver = function(){
    return gameB.isGameOver;    
};



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
    $('#beepqn').html("");
    if (gameB.currentQuestion === numberOfQuestions()) {
        gameB.isGameOver = true;
        
    }
    
};

//===== FUNCTION TO GET USER INPUT VALUE =====//


//get 'enter' key to submit answer!!!
// $(document).keypress(function(e) {
//     if(e.which == 13) {
//         event.preventDefault();
//         alert('You pressed enter!');
        
//     }
// });
$("form :input").attr("autocomplete", "off");


$("input").keypress(function(event){
    if (event.which === 13) {
        event.preventDefault();
        // alert('You pressed enter!');
        // $("form").submit(input);
        var input = $('#playerinput').val().toUpperCase();
        console.log("user input:" + input);
        console.log("player score:" + playerScore);
        $('#status').removeClass('disappear');
        $("#playerinput").val('');
        
        playTurn(input);
        updateDisplay();
    }
});

$('#enter').on('click', function(event) {
    var input = $('#playerinput').val().toUpperCase();
    console.log("user input:" + input);
    console.log("player score:" + playerScore);
    $('#status').removeClass('disappear');
    $("#playerinput").val('');
    // $('#status').effect('shake');
    // reset form: $('#playerInput').reset();

    playTurn(input);
    updateDisplay();
       
});


//===== GAME RESTART =====//
var restart = function() {
    console.log('restarts game and timer.');
    timeLeft = 60;
    gameB.currentQuestion = 0;
    gameB.isGameOver = false;
    gameB.playerScore = 0;
    // updateMainDisplay();
};