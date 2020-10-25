document.getElementById("highscores").onload = function () { renderTable() };

function renderTable() {
    for (let i = 0; i < localStorage.length; i++) {
        let table = document.getElementById("highscores");

        let row = table.insertRow(0);

        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);

        col1.innerHTML = localStorage.key(i);
        col2.innerHTML = localStorage.getItem(localStorage.key(i));

        console.log(table);
        // console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        // let col1 = $("<td>");
        // let col2 = $("<td>");
        // let nRow = $("<tr>");
        // col1.text(localStorage.key(i));
        // col2.text(localStorage.getItem(localStorage.key(i)));
        // nRow.append(col1);
        // nRow.append(col2);
        // document.getElementById("highscores").append(nRow);
        // $("#highscores").append(nRow);
    }
}