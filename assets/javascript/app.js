// Trivia Game Pseudo Code
// Think about what data you will need and how you structure it
// Data - Questions array - each question to ask "expected answer", "choices"
// Grab the first question and display it on the screen
// Start your timer, if user does not answer question after set timer, go to next question
// After each question, update the score for each answer - right/wrong
// Calculate total score - right/wrong

// Create vars for current questions, correct answer, incorrect answer, answered, and unanswered
// Create a variable for seconds and time
// Create a user select variable
// Create a group of messages that respond to answers
// Create a click event for start & start over button


var triviaQuestions = [{
	question:"What is the name of the man who created the Marvel characters Spider-Man, Hulk, & The Avengers?",
	answerList:["Stan Lee", "Fabian Nicieza", "Jim Lee", "John Romita Sr"],
	answer: 0
},{
	question:"What triggered the 'Civil-War' storyline in the comic-book series?",
	answerList:["Tony Stark punches Captain America", "Captain America is shot", "Sokovia Accords", "An explosion destroys an elementary school"],
	answer: 3
},{
	question:"Captain America's was frozen in which war?",
	answerList:["World War I", "World War II", "Cold War", "Vietnam"],
	answer: 1
},{
	question:"Which character does NOT have the ability to regenerate limbs and organs?",
	answerList:["Deadpool", "Wolverine", "Mr. Fantastic", "Sabretooth"],
	answer: 2
},{
	question:"What character is often armored & displays a death's head/skull?",
	answerList:["Black Widow", "Frank Castle", "Deadshot", "Venom"],
	answer: 1
},{
	question:"Iron-Man convinces which character to reveal his secret identify in the Civil War comic series?",
	answerList: ["Captain America", "Black Widow", "Spider-Man", "The Black Panther"],
	answer: 2
},{
	question:"Which character is known as 'The Man Without Fear'?",
	answerList:["Daredevil", "Ghost Rider", "The Punisher", "Vision"],
	answer: 0
},{
	question:"Deadpool joined the Weapon X program because?",
	answerList:["He had incurable cancer", "He was forced to", "He wanted a face like Freddy Krueger", "He wanted to fight for justice"],
	answer: 0
},{
	question:"What character is NOT part of the Marvel Comics Universe?",
	answerList:["Rocket Racoon", "Krypto the Superdog", "Howard the Duck", "Groot"],
	answer: 1
},{
	question:"What did Dr. Pym discover that allowed him to change size?",
	answerList:["Gamma Rays", "Pym Particles", "Alpha Rays", "Omega Particles"],
	answer: 1
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages ={
	correct: "Correct!",
	incorrect: "Incorrect.",
	endTime: "Out of time!",
	finished: "Nuff Said!  Let's check the score."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$("#startOverBtn").hide()

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#unanswered').empty();
    $("#startOverBtn").hide();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	// sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    
    for(var i = 0; i < 4; i++){
		var choices = $('<div>'); 
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	// clicking an answer will pause time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	// sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); // Clears question page
    $('.question').empty();
    
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	var rightAnswerText = triviaQuestions[currentQuestion].answerList[rightAnswerIndex];
    
	// checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').show();
}