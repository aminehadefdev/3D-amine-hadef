export function displayPopUpQuestions(position = 'left',cb) {
    let popup = document.getElementById('popup')
    popup.style.display = 'block'
    if (position === 'right') {
        popup.style.right = "2%"
    }
    cb()
}