// (dimensiones, peso, y el código postal de origen/destino)
// (remitente, destinatario, dirección completa, teléfono, contacto, etc.)

const questionContainer = document.querySelector('#question')
const questionNumber = document.querySelector('#q-number')
const backBtn = document.querySelector('#back-btn')
const nextBtn = document.querySelector('#next-btn')

let currentIndex = 0

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
        // AQUI PODRIA HABER UN BOTON DE ENVIAR O PASAR A LA SIGUIENTE ETAPA.
    }
}

function goBack() {
    if(currentIndex>0) {
        currentIndex--
        console.log(`se resto: ${currentIndex}`)
    } else {
        console.log(`ya paso el limite: ${currentIndex}`)
    }
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
}

function goNext() {
    // validation
    if(currentIndex<currentQuestions.length+1){
        currentIndex++
        console.log(`se sumo: ${currentIndex}`)
        nextBtn.style.display = "flex"

        if(document.getElementsByClassName('input') != null){
            let i = 0
            let inputGroup = document.querySelectorAll('.class')

            while (i<0) {
                if (inputGroup[i].value != null && inputGroup[i].value != '') {
                    localStorage.setItem(`${currentIndex}`, inputGroup[i].value)
                }
                i++
            }
            console.log("alto ahi camarada")
        }
    } else {
        nextBtn.style.display = "none"
        console.log(`ya paso el limite: ${currentIndex}`)
    }
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
}

backBtn.addEventListener('click',goBack)
nextBtn.addEventListener('click',goNext)
window.addEventListener('load', () => {
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
})