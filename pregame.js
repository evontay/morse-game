//===== PREGAME JS =====//

$(document).ready(function(){});
    
console.log("pregame is running.");


//TO CREATE NEW AUDIO TAGS
var aAudio = new Audio('audio/a-btn.wav');
var bAudio = new Audio('audio/b-btn.wav');
var cAudio = new Audio('audio/c-btn.wav');
var dAudio = new Audio('audio/d-btn.wav');
var eAudio = new Audio('audio/e-btn.wav');
var fAudio = new Audio('audio/f-btn.wav');
var gAudio = new Audio('audio/g-btn.wav');
var hAudio = new Audio('audio/h-btn.wav');
var iAudio = new Audio('audio/i-btn.wav');
var jAudio = new Audio('audio/j-btn.wav');
var kAudio = new Audio('audio/k-btn.wav');
var lAudio = new Audio('audio/l-btn.wav');
var mAudio = new Audio('audio/m-btn.wav');
var nAudio = new Audio('audio/n-btn.wav');

// var myAudioFunction = function(letter){
//     if (letter == 'a') { aAudio.play(); console.log("aAudio clicked");}
//     else if (letter == 'b') { bAudio.play(); console.log("bAudio clicked"); }
//     };

$('#a').on('click', function(event){
    $(document).play(aAudio);
    console.log('clicked A');
});



    
