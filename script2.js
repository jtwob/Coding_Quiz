//grabbing the highscores table and initializing a local array for all the localstorage data
let highscoreTable = document.getElementById("highscores");
let scoreArr = [];

/**
 * retrieveScores() loops through all localStorage data and puts each key value pair into 
 * the scoreArr array as an object.
 */
function retrieveScores() {
    for (let i = 0; i < localStorage.length; i++) {
        scoreArr.push({ initials: localStorage.key(i), score: localStorage.getItem(localStorage.key(i)) });
    }
}

/**
 * compare(a, b) is a helper function to sort the highscore array before producing the table.
 * @param {object} a the first object
 * @param {object} b the second object
 * @return a value indicating which object appears first.
 */
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (b.score > a.score) {
        return 1;
    }
    if (a.initials > b.initials) {
        return 1;
    }
    if (b.initials > a.initials) {
        return -1;
    }
    return 0;
}

/**
 * renderTable() calls retrieveScores() and sorts the scoreArr. It then loops through the 
 * array and creates necessary html tags to populate the table. Finally it appends the table
 * to the window.
 */
function renderTable() {
    retrieveScores();
    scoreArr.sort(compare);
    for (let i = 0; i < scoreArr.length; i++) {
        let tr = document.createElement('tr');

        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));

        tr.cells[0].appendChild(document.createTextNode(scoreArr[i].initials));
        tr.cells[1].appendChild(document.createTextNode(scoreArr[i].score));
        tr.setAttribute("class", "score");

        highscoreTable.appendChild(tr);
    }
}
renderTable();

//event listener that clears the highscores on click
$("#reset-table").on("click", function () {
    localStorage.clear();
    scoreArr = [];
    $(".score").empty()
});