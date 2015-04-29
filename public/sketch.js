// Karam Byun
// Voice to Twitter March 2015

// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Using chrome speech API
// http://shapeshed.com/html5-speech-recognition-api/

// A p5 sketch that tweets mic shouts.

var str ="";

var numchars;

function setup() {
  noCanvas();
  console.log(str);
  console.log('setup function');
}

// Update the div that says how many characters are in the tweet
function countChars() {
  numchars.html(postInput.value().length);
}

$(document).ready(function(){

 var i = 0;

 var str;
 var recognition = new webkitSpeechRecognition();
 //recognition.lang = "en-US";
 recognition.continuous = true;
 //recognition.interimResults = true;
 recognition.onresult = function(event){
    console.log(event.results);
    str = event.results[i][0].transcript;
    $('#voice').append("i tweeted: " + str);
    postTweet();
    i++;
  }
  recognition.start();
 
// Execute an API call to tweet!
// We tweeted!
function tweeted(data) {
  // Debugging what happened
  console.log(data);
  console.log('tweeted function???');
  // What came back?
  // Just show that in the window
  var p;
  if (data.message) {
    p = createP('Error! ' + data.message);
  } else if (data.text) {
    p = createP('Success I tweeted: ' + data.text);
  } else {
    p = createP('Unknown error! ');
  }
  p.style('background','#F660AB')
  p.style('padding','16px');
}

function postTweet() {
  // Note the use of encodeURIComponent()
  // We should probably be using this in all the examples from this week
  loadJSON('/tweet?status=' + encodeURIComponent(str+' #voicetwitter'), tweeted);
  console.log(str);
}


});
