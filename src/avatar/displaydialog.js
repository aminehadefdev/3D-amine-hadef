export function displaydialog(cb) {
    const dialog = document.getElementById('dialog')
    dialog.textContent = ""
    dialog.style.display = 'block'
    cb()
}

