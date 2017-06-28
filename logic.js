//DATA

var questionsAndAnswers = [

	//Question 1
	{
		question: "Who is Ned Stark’s youngest child?",
		answers: [
		"-Sansa Stark",
		"-Rickon Stark",
		"-Bran Stark",
		"-Arya Stark"
		],
		correctAnswer: 1
	},

	//Question 2
	{
		question: "Who was responsible for King Joffrey’s murder?",
		answers: [
		"-Prince Oberyn Martell (The Red Viper)",
		"-Tyrion Lannister & Bronn the Sellsword",
		"-Olenna Tyrell and Petyr Baelish (Littlefinger)",
		"-Varys (The Spider)"
		],
		correctAnswer: 2
	},

	//Question 3
	{
		question: "What body of water separates Westeros from Essos?",
		answers: [
		"-The Arbor",
		"-The Sea of Dorne",
		"-The Shivering Sea",
		"-The Narrow Sea"
		],
		correctAnswer: 3
	},

	//Question 4
	{
		question: "During The Sack of Kings Landing, Mad King Aerys II gave Jamie Lannister strict orders to do what?",
		answers: [
		"-Surrender to Robert Baratheon and his army.",
		"-Find his grandson, Aegon and keep him safe at all costs.",
		"-Find Ned Stark and bring him to the throne room, alive.",
		"-Bring him Tywin Lannister’s head and burn the city to the ground."
		],
		correctAnswer: 3
	},

	//Question 5
	{
		question: "When Jon Snow arrives at The Wall in season one, what job is he originally given by Lord Commander Mormont?",
		answers: [
		"-Steward",
		"-Scout",
		"-Ranger",
		"-Builder"
		],
		correctAnswer: 0
	},

	//Question 6
	{
		question: "Where is The Red Priestess Melisandre from?",
		answers: [
		"-Valyria",
		"-Yi Ti",
		"-Asshai",
		"-Volantis"
		],
		correctAnswer: 2
	},

	//Question 7
	{
		question: "What is the name of the Night’s Watch brother who is beheaded by Ned Stark for Desertion, in the first episode of Game of Thrones?",
		answers: [
		"-Will",
		"-Waymar Royce",
		"-Gared",
		"-Raff the Sweetling"
		],
		correctAnswer: 0
	},

	//Question 8 
	{
		question: "Who was Stannis Baratheon’s first choice as his Hand of the King?",
		answers: [
		"-Renly Baratheon",
		"-Alester Florent",
		"-Davos Seaworth",
		"-Ned Stark"
		],
		correctAnswer: 1	
	},

	//Question 9
	{
		question: "Who casts the final vote to make Jon Snow the Lord Commander of the Night’s Watch?",
		answers: [
		"-Maester Aemon",
		"-Samwell Tarly",
		"-Olly",
		"-None of the above"
		],
		correctAnswer: 0
	},

	//Question 10
	{
		question: 'What is the name of the Septa who walked Cersei naked through King’s Landing to atone for her sins, repeatedly chanting “shame?”',
		answers: [
		"-Septa Mordane",
		"-Septa Eglantine",
		"-Septa Unella",
		"-Septa Allysa"
		],
		correctAnswer: 2
	},

	//Bonus Question
	{
		question: "BONUS QUESTION: As of season 6, what is Daenerys Targaryen’s full title?",
		answers: [
		"-Daenerys Stormborn of the House Targaryen, First of Her Name, Queen of the Rhoynar and the First Men, Mhysa, Mother of Dragons and Breaker of Chains.",
		"-Daenerys Stormborn of the House Targaryen, First of Her Name, the Unburnt, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains, and Mother of Dragons.",
		"-Daenerys Stormborn of the House Targaryen, Boaster of Titles, the Braggadocios, Queen of the Andals and the Eunuchs, Khaleesi of Those Shirtless Guys on Horses, Bane of the Slaveowners, and Mother of Dragons.",
		"-Daenerys Stormborn of the House Targaryen, First of Her Name, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Mhysa, and Mother of Dragons."
		],
		correctAnswer: 1
	}
	]; 

	var state = {
		currentQuestionIndex: 0,
		usersCurrentScore: 0,
		currentSelectedAnswer: -1,
		disabled:false
	};

	//VARS FOR CLASSES AND IDS

	var BEGIN_QUIZ_BUTTON = '#begin-button';
	var FIRST_SCROLL = '#first-scroll';
	var SECOND_SCROLL = '#second-scroll';
	var THIRD_SCROLL = '#third-scroll'
	var QUESTION_BOX = '#question';
	var ANSWER = '.answer';
	var SUBMIT = "#next-button";
	var SCORE = '#user-score';
	var CORRECT_ALERT_MESSAGE = '#correctAlert';
	var INCORRECT_ALERT_MESSAGE = '#incorrectAlert';
	var PLAY_AGAIN_BUTTON = '#play-again';
	var ANSWER_FEEDBACK = '.answer-feedback';
	var SUBMISSION_REQUEST = '#no-answer-alert';
	var REVIEW = '#user-review';
	var GIF_BOX = '#gif-box';

	//FUNCTIONS

	//Renders next question and corresponding answers
	function displayQuestion(index) {
		$(ANSWER).removeClass('correct incorrect selected');
		$(ANSWER_FEEDBACK).addClass('hidden');
		var currentQuestion = questionsAndAnswers[index].question;
		var questionPrefix = '';
		var answers = questionsAndAnswers[index].answers;
		if (index < 10) {
			questionPrefix = '(' + (index + 1) + "/10) "
		}
		$(QUESTION_BOX).text(questionPrefix+currentQuestion);
		for (i = 0; i < answers.length; i++) {
			$('#answer-' + i).text(answers[i]);
		}
	}

	//Determines the feedback given to the user at the end of the quiz, 
	//depending on their score.
	function renderResults() {
		$(SCORE).text(state.usersCurrentScore);
		if (state.usersCurrentScore < 4) {
			$(REVIEW).text('Yikes! You may need to go back and watch the show again...');
			$(GIF_BOX).prepend('<img class="gif" src="ygritte.gif">');
		} 
		else if (state.usersCurrentScore < 7) {
			$(REVIEW).text('Not bad, but in the game of thrones you either win, or you die…');
			$(GIF_BOX).prepend('<img class="gif" src="cersei.gif">');
		}
		else if (state.usersCurrentScore < 10) {
			$(REVIEW).text('Nice job! You certainly know your stuff. You win a nice pork sausage, courtesy of Theon Greyjoy…');
			$(GIF_BOX).prepend('<img class="gif" src="ramsay.gif">');
		}
		else if (state.usersCurrentScore >= 10) {
			$(REVIEW).text('HODOR! Perfect score! You must be some kind of warg with a score like that.');
			$(GIF_BOX).prepend('<img class="gif" src="bran.gif">');
		}
		turn.play();
	}

	//Let's the user know correct/incorrect
	//and increases their score if correct.
	function displayFeedback(){
		if (state.currentSelectedAnswer === questionsAndAnswers[state.currentQuestionIndex].correctAnswer) {
			$(CORRECT_ALERT_MESSAGE).removeClass('hidden');
			state.usersCurrentScore++;
		}
		else {
			$(INCORRECT_ALERT_MESSAGE).removeClass('hidden');
			$('#answer-' + state.currentSelectedAnswer).addClass('incorrect');
		}
		$('#answer-' + questionsAndAnswers[state.currentQuestionIndex].correctAnswer).addClass('correct');
	}


	//Manages state and calls displayQuestion
	function showNext() { 
		state.currentQuestionIndex++;
		state.currentSelectedAnswer = -1;
		$('#countdown-1').addClass('hidden');
		if (state.currentQuestionIndex === 11) {
			$(SECOND_SCROLL).addClass('hidden');
			$(THIRD_SCROLL).removeClass('hidden');
			renderResults();
		}
		state.disabled = false;
		displayQuestion(state.currentQuestionIndex);
		turn.play();
	}

	//Counts down so that the user knows when the next quesiton 
	//will be displayed.
	function handleFirstCountdown() {
		$('#countdown-3').removeClass('hidden');
	}

	function handleSecondCountdown() {
		$('#countdown-3').addClass('hidden');
		$('#countdown-2').removeClass('hidden');
	}

	function handleThirdCountdown() {
		$('#countdown-2').addClass('hidden');
		$('#countdown-1').removeClass('hidden');
	}

	// When the document is ready, the following events will occur.
	$(document).ready(function() {

		// EVENT LISTENERS

		// Clicking 'begin quiz'
		$(BEGIN_QUIZ_BUTTON).on('click', function(event) {
			$(this).parent().addClass("hidden");
			$(SECOND_SCROLL).removeClass('hidden');
			displayQuestion(state.currentQuestionIndex);
			turn.play();
		});

		// Clicking 'next question'
		$(SUBMIT).click(function(event) {
			if (state.currentSelectedAnswer < 0) {
				$(SUBMISSION_REQUEST).removeClass('hidden');
			} 
			else {
				if(!state.disabled) {
					state.disabled = true;
					displayFeedback();
					handleFirstCountdown();
					setTimeout(handleSecondCountdown, 1000);
					setTimeout(handleThirdCountdown, 2000);
					setTimeout(showNext, 3000);

				}
			}
		
		});

		// Clicking Answer
		$(ANSWER).click(function(event) {
			if (!state.disabled) {
				var selectedAnswerId= $(this).attr('id');
				$(SUBMISSION_REQUEST).addClass('hidden');
				state.currentSelectedAnswer = Number(selectedAnswerId.substr(selectedAnswerId.length - 1));
				$(ANSWER).removeClass('selected');
				$(event.currentTarget).addClass('selected');
			}
		});

		//Clicking 'play again'
		$(PLAY_AGAIN_BUTTON).click(function(event) {
			$(this).parent().addClass('hidden');
			$(FIRST_SCROLL).removeClass('hidden');
			state.usersCurrentScore = 0;
			state.currentQuestionIndex = 0;
			turn.play();
		});
	});

//Page turning sound effect
var turn = new Audio();
turn.src = "turn.mp3"


























