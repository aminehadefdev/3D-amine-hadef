export function addEventbtnsQuestions(question){
    Array.from(document.getElementsByClassName('btn-question')).map((btn, index)=>{
        btn.addEventListener('click', question[index].actions)
    })
}