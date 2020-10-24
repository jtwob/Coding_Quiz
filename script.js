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

let highscores = [];

//QUIZ SETUP
let questionPointer = 0;
let questionEl = $("<h1>");
let choiceListEl = $("<ol>");
let choice1El = $("<li>");
let choice2El = $("<li>");
let choice3El = $("<li>");
let choice4El = $("<li>");
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

let scoreBlurb = $("<h4>");
let initialForm = $("<form>");
let input = $("<input>");
let submitButton = $("<input>");

scoreBlurb.text(`You achieved a score of: `);
submitButton.attr("type", "submit");
input.attr("id", "input-initials");
initialForm.append(scoreBlurb);
initialForm.append(input);
initialForm.append(submitButton);


//HIGHSCORE-PAGE LINK
let highscoreLink = $("<a>");

highscoreLink.attr("href", "./highscores.html");
highscoreLink.addClass("col-sm-6");
highscoreLink.text("View Highscores");

$("#headings").append(highscoreLink);

//TIMER LOGIC
let timerDiv = $("<header>");
let alottedTime = 100;

timerDiv.addClass("col-sm-6");
timerDiv.attr("id", "timer")
timerDiv.text(`Time: ${alottedTime}`);

$("#headings").append(timerDiv);

let score = alottedTime;

input.on("submit", function (e) {
    e.preventDefault();
    highscores.unshift({ initials: e.value, hs: score });
    highscoreUpdate();
    console.log(highscores[0]);
});

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
            let score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);


        }
    } else {
        alottedTime -= 10;
    }
});

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
            let score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

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
            let score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});

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
            let score = alottedTime;
            console.log(score);
            scoreBlurb.text(`You achieved a score of: ${score} \nSave your initials to the Highscore list?`);
            $("#quiz").append(initialForm);
        }
    } else {
        alottedTime -= 10;
    }
});


//QUIZ PROMPT
let promptQuiz = $("<div>");
let h1 = $("<h1>");
let h4 = $("<h4>");

promptQuiz.addClass("col-sm-12");

h1.attr("style", "height: 60px;");
h1.addClass("col-sm-12")
h1.attr("id", "prompt");
h1.text("Press START to begin the coding quiz.");

h4.addClass("col-sm-12");
h4.text("You will have 100 seconds to answer the questions correctly. For every wrong answer, 10 seconds will be deducted from the remaining time.");

promptQuiz.append(h1);
promptQuiz.append(h4);
$("#quiz").append(promptQuiz);

//TIMER FUNCTION
function startTimer() {
    $("#quiz").empty();
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

function setupQuestions() {
    $("#quiz").append(questionEl);
    $("#quiz").append(choiceListEl);
}


//QUIZ HANDLER
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

//START BUTTON LOGIC
let startDiv = $("<div>");
let filler = $("<div>");
let startButton = $("<button>");

startDiv.addClass("row");

filler.addClass("col-sm-4");
filler.attr("id", "filler");


startButton.addClass("col-sm-4");
startButton.attr("id", "start-button")
startButton.text("Start");
startButton.on("click", function () {
    startTimer();
    setupQuestions();
    startQuiz();
});
$("#quiz").append(filler);
$("#quiz").append(startButton);


function highscoreUpdate() {
    let newRow = $("<tr>");
    let col1 = $("<td>");
    let col2 = $("<td>");
    col1.text(highscores[0].initials);
    col2.text(highscores[0].hs);
    newRow.append(col1);
    newRow.append(col2);
    $("#highscores").append(newRow);
    console.log($("#highscores"));
}

// function startQuiz() {

//     let question = $("<h1>");
//     let choiceList = $("<ol>");
//     let filler = $("<div>");
//     filler.addClass("col-sm-1");
//     choiceList.addClass("col-sm-8");
//     question.addClass("col-sm-12");
//     question.text(questions[0]);
//     question.attr("style", "margin-top: 150px;")
//     $("#quiz").append(question);
//     for (let j = 0; j < choices[0].length; j++) {
//         let choice = $("<li>");
//         choice.text(choices[0][j]);
//         choice.addClass("col-md-4");
//         choice.addClass("choices-class")
//         choice.attr("value", j);
//         // choice.attr("style", "");
//         choice.attr("id", `choice${j}`);
//         // console.log("clickevent");
//         choiceList.append(choice);
//     }
//     $("#quiz").append(filler);
//     $("#quiz").append(choiceList);
// }
// $(".choices-class").on("click", function () {
//     console.log("listening to choices");
//     if (choiceBox.attr("value") === answerKey[0]) {
//         console.log(correct);
//     }
// });