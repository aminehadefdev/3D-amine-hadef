export function displayTextOnDialog(text, cb) {
    let dialog = document.getElementById('dialog')
    let i = 0;
    dialog.textContent = ""
    let interval = setInterval(() => {
        if (i < text.length) {
            dialog.textContent += text[i]
            i++
        } else {
            clearInterval(interval)
            cb()
        }
    }, 10)
}