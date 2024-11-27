// (dimensiones, peso, y el código postal de origen/destino)
// (remitente, destinatario, dirección completa, teléfono, contacto, etc.)

const questionContainer = document.querySelector('#question')
const questionNumber = document.querySelector('#q-number')
const backBtn = document.querySelector('#back-btn')
const nextBtn = document.querySelector('#next-btn')
const navBtns = document.querySelector('.nav-btns')

let currentIndex = 0

const sendBtn = document.createElement('button')
sendBtn.classList.add('btn', 'btn-success')
sendBtn.textContent = "Enviar form"
sendBtn.style.display = "flex"

let sending_questions = [
    ["Ingresa las dimensiones de tu paquete:", [["number","Largo en cm (centímetros)"], ["number","Ancho en cm (centímetros)"]]],
    ["Ingresa el peso de tu paquete", [["number","Peso en kg (kilogramos)"]]],
    ["Ingresa el código postal de origen", [["number"]]],
    ["Ingresa el código postal de destino", [["number"]]]
]

let currentQuestions = sending_questions

function renderQuestions(questions,index) {
    questionContainer.innerHTML = ""

    let label = document.createElement("label")
    label.innerText = `${questions[index][0]}`

    questionContainer.appendChild(label)

    for(let i=0;i<questions[index][1].length;i++){
        if (questions[index][1][i][1] != null) {
            let info_label = document.createElement("label")
            info_label.innerText = `${questions[index][1][i][1]}`
            questionContainer.appendChild(info_label)
        }
        let input = document.createElement("input")
        input.setAttribute("type",`${questions[index][1][i][0]}`)
        input.setAttribute("class","input")

        let stored = localStorage.getItem(`q${index}-${i}`)
        if(stored !== null && stored !== ""){
            input.value = stored
        }

        questionContainer.appendChild(input)
    }
}

function showButtons() {
    if (currentIndex>0) {
        backBtn.style.display = "flex"
    } else {
        backBtn.style.display = "none"
    }

    if (currentIndex<currentQuestions.length-1){
        nextBtn.style.display = "flex"
    } else {
        nextBtn.style.display = "none"
        navBtns.appendChild(sendBtn)
        sendBtn.addEventListener('click',nextStage())
    }
}

function goBack() {
    if(currentIndex>1) {
        currentIndex--
        console.log(`se resto: ${currentIndex}`)
    } else {
        console.log(`ya paso el limite: ${currentIndex}`)
    }
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
}

function goNext() {
    let display_alert = false

    /*if(currentIndex+1==currentQuestions.length){
        console.log("ya a la verga")
        showButtons()
        sendBtn.addEventListener('click',nextStage())
    }*/

    if(currentIndex<currentQuestions.length){
        if(document.getElementsByClassName('input') != null){
            currentIndex++
            console.log(`se sumo: ${currentIndex}`)
            nextBtn.style.display = "flex"
            
            let i = 0
            let inputGroup = document.querySelectorAll('.input')

            while (i < inputGroup.length) {
                if (inputGroup[i].value != null && inputGroup[i].value != "") {
                    // se le resta uno porque se le suma el siguiente al inicio.
                    localStorage.setItem(`q${currentIndex-1}-${i}`, inputGroup[i].value)
                } else {
                    display_alert = true
                    currentIndex--
                    break
                }
                i++
            }
            if (display_alert) {
                alert("Introduce datos válidos.")
            }
        }
    } else {
        console.log(`ya paso el limite: ${currentIndex}`)
    }
    if (!display_alert) {
        renderQuestions(currentQuestions,currentIndex)
        showButtons()
    }
}

function nextStage() {
    
}

backBtn.addEventListener('click',goBack)
nextBtn.addEventListener('click',goNext)
window.addEventListener('load', () => {
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
})