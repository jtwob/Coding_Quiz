let highscoreTable = document.getElementById("highscores");
let scoreArr = [];

function retrieveScores() {
    for (let i = 0; i < localStorage.length; i++) {
        scoreArr.push({ initials: localStorage.key(i), score: localStorage.getItem(localStorage.key(i)) });
    }
}

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

$("#reset-table").on("click", function () {
    localStorage.clear();
    scoreArr = [];
    $(".score").empty()
});