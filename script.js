/* LIST OF VARIABLES */	
	
	var questionState = 0;	//Keeps track of users place in quiz
	var quizActive = true;	//True until last question is answered
		
	var userStats =	[
						0,	//creator
						0, 	//pragmatist
						0, 	//rooky 
						0 	//responsible 
					];
	
	var tempStats = userStats; //Holds stat increases relating to user selection
	
	/* QUIZ BUILDING VARIABLES */
	
	//The following array contains all question text elements
	
	var questionText =	[															
							"If you see a new Dataset coming in for implementation, you would think:", 	//q1
							"Time to test your code, what do you say?", 					//q2
							"What do you think if you hear 'coding standards'?", 	//q3
							"How would you describe your skill range?", 				//q4
							"What do you listen while programming?", 			//q5
							"Who is your besty while coding" 			//q6
						];
	
	//The following array contains all answer text elements for each question
	
	var answerText =	[		//question 1 answers													
							[	"I have 1000 ideas what to do", 				
								"Checking the set thoroughly", 
								"Start watching tutorials",
                "Whatever the client wants"],							
								
								//question 2 answers
							[	"Finished this last night, should run",
								"Nah, let's skip testing only this time",
								"I'll tell'em it was technically impossible",
								"There's nothing new but unit-tests"],
								
								//question 3 answers
							[	"Something for later...",
								"Let's get this over with",
								"what standards?",
                "clear, simple, well tested, bug-free, refactored, documented, and performant"],
								
								//question 4 answers
							[	"I design solutions but also see how it interacts with other software.",
								"I have a plan for how to improve whatever the team's next project is.",
                "I can implement basic solutions.",
								"I have optimized my setup for debugging."],
								
								//question 5 answers
							[	"Spice Girls - Do it",
							 	"Penelope Scott - Rät", 
								"Rage Against the Machine - Take the Power Back",
								"Judas Priest - Electric Eye"],		

								//question 6 answers								
							[ "Stack Overflow",
                "Copy+Paste",
							  "Senior developers",
                "Me, Myself and the Terminal"]
						]
	
	//The following array contains all personality stat increments for each answer of every question
	
	var answerValues =	[		//question 1 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							],	
						
								//question 2 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							],	

								//question 3 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							],	
								
								//question 4 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							],
								
								//question 5 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							],
								
								//question 6 answer values
							[	[1,0,0,0], 		
								[0,1,0,0],		
								[0,0,1,0],
								[0,0,0,1],
							]
						]
	
	/* SHORTCUT VARIABLES */
	//so I don't have to keep typing

	var results = document.getElementById("results");
	var quiz = document.getElementById("quiz");
	var body = document.body.style;
	var printResult = document.getElementById("topScore");
	var buttonElement = document.getElementById("button");
	
	/* QUIZ FUNCTIONALITY */
	
	buttonElement.addEventListener("click", changeState);	//Add click event listener to main button
	
	/* This function progresses the user through the quiz */
	
	function changeState() {								
		
		updatePersonality(); 	//Adds the values of the tempStats to the userStats										
		
		if (quizActive) {	
			
			/*True while the user has not reached the end of the quiz */
			
			initText(questionState);	//sets up next question based on user's progress through quiz
			questionState++;			//advances progress through quiz
			
			buttonElement.disabled = true; //disables button until user chooses next answer
			buttonElement.innerHTML = "Please select an answer";			
			buttonElement.style.opacity = 0.7;
			
		} else {
			
			/*All questions answered*/
			
			setCustomPage(); //runs set up for result page
		}
	}
	
	/* This function determines the question and answer content based on user progress through the quiz */

	function initText(question) {							
		
		var answerSelection = ""; //text varialbe containting HTML code for the radio buttons' content
		
		/* Creates radio buttons based on user progress through the quiz - current 'id' generation is not w3c compliant*/
		
		for (i = 0; i < answerText[question].length; i++) {		
			
			answerSelection += "<li><input type='radio' name='question" +
			(question+1) + "' onClick='setAnswer("+i+")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
		}
		
		document.getElementById("questions").innerHTML = questionText[question];	//set question text
		document.getElementById("answers").innerHTML = answerSelection;				//set answer text
	}
	
	/* This function is called when a user selects an answer, NOT when answer is submitted */
	
	function setAnswer(input) {
				
		clearTempStats();									//clear tempStats in case user reselects their answer
		
		tempStats = answerValues[questionState-1][input];	//selects personality values based on user selection 
				
		if (questionState < questionText.length) {
			
			/*True while the user has not reached the end of the quiz */
			
			buttonElement.innerHTML = "Continue";
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
					
		} else {
			
			/*All questions answered - QUESTION TIME IS OVER!*/
			
			quizActive = false;
			buttonElement.innerHTML = "Display your developer type"
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
		}
	}
	
	/* This function sets tempStats to 0 */
	
	function clearTempStats() {
		
		tempStats = [0,0,0,0];	
	}
	
	/*This function adds the values of the tempStats to the userStats based on user selection */
	
	function updatePersonality() {
		
		for (i = 0; i < userStats.length ; i++) {
			userStats[i] += tempStats[i];
		}
	}
	
	/* This function determines the highest personality value */
	
	function setCustomPage() {
		
		var highestStatPosition = 0;	//highest stat defaults as 'cute'
		
		/* This statement loops through all personality stats and updates highestStatPosition based on a highest stat */
		
		for (i = 1 ; i < userStats.length; i++) {
			
			if (userStats[i] > userStats[highestStatPosition]) {
				highestStatPosition = i;
			}
		}
		
		displayCustomPage(highestStatPosition); //passes the index value of the highest stat discovered
		
		/* Hides the quiz content, shows results content */
		quiz.style.display = "none";		
	}
	
	/* BUILDS WEB PAGE AS PER RESULTS OF THE QUIZ */
	
	/* The following code manipulates the CSS based on the personality results */
			
	function displayCustomPage(personality) {
		switch (personality) {
			
			case 0:	//creator
				results.style.display = "inline-block";
				results.classList.add("creator");
				body.background = "none";
				body.cursor = "url(https://web.archive.org/web/20090830074921/http://www.geocities.com/anneli1970/hkanicursor.gif), auto";
				printResult.innerText = "creator";
				break;
				
			case 1:		//pragmatist
				results.style.display = "inline-block";
				results.classList.add("pragmatist");
				body.background = "none";
				body.cursor = "url(https://web.archive.org/web/20090820061156/http://geocities.com/Tokyo/Club/8802/pikacursor.gif), auto";
				printResult.innerText = "pragmatist";
				break;
				
			case 2:		//rooky
				results.style.display = "inline-block";
				results.classList.add("rooky");
				body.background = "none";
				body.cursor = "url(https://web.archive.org/web/20090820061156/http://geocities.com/Tokyo/Club/8802/pikacursor.gif), auto";
				printResult.innerText = "rooky";
				break;
				
			case 3:		//responsible
				results.style.display = "inline-block";
				results.classList.add("responsible");
				body.background = "none";
				body.cursor = "url(https://web.archive.org/web/20090830074921/http://www.geocities.com/anneli1970/hkanicursor.gif), auto";
				printResult.innerText = "responsible";
				break;
				
			case 4:		//responsible
				results.style.display = "inline-block";
				results.classList.add("responsible");
				body.background = "none";
				body.backgroundImage = "url('https://web.archive.org/web/20091026075928/http://geocities.com/MotorCity/Pit/2600/pic/rainbow.gif')";
				body.backgroundRepeat = "repeat";
				body.cursor = "url(https://web.archive.org/web/20090731114836/http://hk.geocities.com/godofcat/mcmug/cursor1p2.gif), auto";

		}
	}