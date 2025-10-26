export function displayBtnsQuestions(questions, cb) {
    const popup = document.getElementById('popup')
    for (let y = 0; y < questions.length; y++) {
        popup.innerHTML += "<div class='btn-question box-button' id='" + questions[y].id + "'><div class='button'><span>" + questions[y].question + "</span></div></div>"
    }
    cb()
}