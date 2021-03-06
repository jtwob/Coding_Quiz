
//All variable declarations here

let quiz = [
    {
        q: "Commonly used data types DO NOT include ______.",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: 2
    },
    {
        q: "The condition in an if / else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: 2
    },
    {
        q: "Arrays in JavaScript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    },
    {
        q: "String values must be enclosed within ______ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: 2
    },
    {
        q: "A very useful tool used during development and debugging for printing content to the debugger is ______.",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: 3
    }
]

let questionPointer = 0;

let questionEl = $("<h1>");
let choiceListEl = $("<ol>");
let choice1El = $("<li>");
let choice2El = $("<li>");
let choice3El = $("<li>");
let choice4El = $("<li>");
let highscoreLink = $("<a>");
let timerStopRef = null;
let timerDiv = $("<header>");
let alottedTime = 100;
let quizPrompt = $("<div>");
let h1 = $("<h1>");
let h4 = $("<h4>");
let startDiv = $("<div>");
let filler = $("<div>");
let startButton = $("<button>");
let scoreBlurb = $("<h4>");
let initialForm = $("<form>");
let input = $("<input>");
let submitButton = $("<input>");
let backLink = $("<a>");
let score = 0;

//setting attributes for the link to the highscores page
highscoreLink.attr("href", "./highscores.html");
highscoreLink.addClass("col-sm-6");
highscoreLink.text("View Highscores");

//setting attributes for the timer div
timerDiv.addClass("col-sm-6");
timerDiv.attr("id", "timer")
timerDiv.text(`Time: ${alottedTime}`);

//setting bootstrap class for the quizPrompt div
quizPrompt.addClass("col-sm-12");

//setting attributes for the h1 prompt text
h1.attr("style", "height: 60px;");
h1.addClass("col-sm-12")
h1.attr("id", "prompt");
h1.text("Press START to begin the coding quiz.");

//setting attributes for the h4 rules text
h4.addClass("col-sm-12");
h4.text("You will have 100 seconds to answer the questions correctly. For every wrong answer, 10 seconds will be deducted from the remaining time.");

//setting class for the start button div
startDiv.addClass("row");

//filler div to center button in roundabout way
filler.addClass("col-sm-4");
filler.attr("id", "filler");

//setting attributes for the start button
startButton.addClass("col-sm-4");
startButton.attr("id", "start-button")
startButton.text("Start");

//setting attributes for the info text with the score at the end of the quiz
scoreBlurb.text(`You achieved a score of: `);
scoreBlurb.attr("id", "score-blurb");

//setting attributes for the initials input text submit button
submitButton.attr("type", "submit");
submitButton.attr("id", "submit-button");

//setting attributes for the initials input text box
input.attr("type", "text");
input.attr("id", "input-initials");

//setting attributes for the link back to the start of the quiz
backLink.attr("href", "./index.html");
backLink.text("Take the Quiz Again");
backLink.attr("id", "back-link");

//all appends happen here, some to referenced id's, some to elements 
//not yet added to the HTML file
$("#headings").append(highscoreLink);
$("#headings").append(timerDiv);
quizPrompt.append(h1);
quizPrompt.append(h4);
$("#quiz").append(quizPrompt);
$("#quiz").append(filler);
$("#quiz").append(startButton);
initialForm.append(scoreBlurb);
initialForm.append(input);
initialForm.append(submitButton);
initialForm.append(backLink);

/**
 * startTimer() begins the timer count-down
 * @return timer; lets the timer be stopped from another function
 */
function startTimer() {
    let timer = setInterval(function () {
        timerDiv.text(`Time: ${alottedTime--}`);
        if (alottedTime <= 0) {
            timerDiv.text("Time: 0");
            clearInterval(timer);
        }
        $("#headings").append(timerDiv);
    }, 1000)
    return timer;
}

/**
 * addQuestionElements() clears the quiz div of the prompt html and populates it 
 * with new question oriented html
 */
function addQuestionElements() {
    $("#quiz").empty();
    questionEl.attr("id", "question");
    choice1El.attr("id", "choice-1");
    choice2El.attr("id", "choice-2");
    choice3El.attr("id", "choice-3");
    choice4El.attr("id", "choice-4");
    choice1El.attr("data-value", "0");
    choice2El.attr("data-value", "1");
    choice3El.attr("data-value", "2");
    choice4El.attr("data-value", "3");
    choiceListEl.append(choice1El);
    choiceListEl.append(choice2El);
    choiceListEl.append(choice3El);
    choiceListEl.append(choice4El);
    $("#quiz").append(questionEl);
    $("#quiz").append(choiceListEl);
}

/**
 * startQuiz() accesses the question choice id's and populates them with text from the quiz
 * nested structure used to store all the questions, choices, and solution.
 * Also uses an inner function to do this.
 */
function startQuiz() {
    let question = $("#question");
    let choice1 = $("#choice-1");
    let choice2 = $("#choice-2");
    let choice3 = $("#choice-3");
    let choice4 = $("#choice-4");

    function nextQuestion() {
        question.text(quiz[questionPointer].q);

        choice1.text(quiz[questionPointer].choices[0]);
        choice2.text(quiz[questionPointer].choices[1]);
        choice3.text(quiz[questionPointer].choices[2]);
        choice4.text(quiz[questionPointer].choices[3]);
    }
    nextQuestion();
}

//start button event listener, starts timer, adds question elements, and starts the quiz.
startButton.on("click", function () {
    timerStopRef = startTimer();
    addQuestionElements();
    startQuiz();
});

//event listener for the choices, 4 in total, with logic that prevents the question pointer
//from accessing data outside the structure. Also prompts the user for initials at the end
//of the quiz. 
choice1El.on("click", function () {
    if (parseInt(choice1El.attr("data-value")) === quiz[questionPointer].answer) {
        console.log("this is correct");
        questionPointer++;
        console.log(questionPointer);
        if (questionPointer < 5) {
            startQuiz();
        }
        if (questionPointer == 5) {
            $("#quiz").empty();
            clearInterval(timerStopRef);
            score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

//event listener for the choices, 4 in total, with logic that prevents the question pointer
//from accessing data outside the structure. Also prompts the user for initials at the end
//of the quiz. 
choice2El.on("click", function () {
    if (parseInt(choice2El.attr("data-value")) === quiz[questionPointer].answer) {
        console.log("this is correct");
        questionPointer++;
        console.log(questionPointer);
        if (questionPointer < 5) {
            startQuiz();
        }
        if (questionPointer == 5) {
            $("#quiz").empty();
            clearInterval(timerStopRef);
            score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

//event listener for the choices, 4 in total, with logic that prevents the question pointer
//from accessing data outside the structure. Also prompts the user for initials at the end
//of the quiz. 
choice3El.on("click", function () {
    if (parseInt(choice3El.attr("data-value")) === quiz[questionPointer].answer) {
        console.log("this is correct");
        questionPointer++;
        console.log(questionPointer);
        if (questionPointer < 5) {
            startQuiz();
        }
        if (questionPointer == 5) {
            $("#quiz").empty();
            clearInterval(timerStopRef);
            score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

//event listener for the choices, 4 in total, with logic that prevents the question pointer
//from accessing data outside the structure. Also prompts the user for initials at the end
//of the quiz. 
choice4El.on("click", function () {
    if (parseInt(choice4El.attr("data-value")) === quiz[questionPointer].answer) {
        console.log("this is correct");
        questionPointer++;
        console.log(questionPointer);
        if (questionPointer < 5) {
            startQuiz();
        }
        if (questionPointer == 5) {
            $("#quiz").empty();
            clearInterval(timerStopRef);
            score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

//event listener on the initials input submit button, stores initials and score in 
//local storage for access in the highscores table.
submitButton.on("click", function (e) {
    e.preventDefault();
    let initials = document.getElementById("input-initials").value;
    window.localStorage.setItem(initials, score);
});