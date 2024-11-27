// (dimensiones, peso, y el código postal de origen/destino)
// (remitente, destinatario, dirección completa, teléfono, contacto, etc.)

const questionContainer = document.querySelector('#question')
const backBtn = document.querySelector('#back-btn')
const nextBtn = document.querySelector('#next-btn')
const navBtns = document.querySelector('.nav-btns')

let currentIndex = 0

const sendBtn = document.createElement('button')
sendBtn.setAttribute('class','btn-dark')
sendBtn.textContent = "Enviar form"

let sending_questions = [
    ["Ingresa las dimensiones de tu paquete:", [["number","Largo en cm (centímetros)"], ["number","Ancho en cm (centímetros)"]]],
    ["Ingresa el peso de tu paquete", [["number","Peso en kg (kilogramos)"]]],
    ["Ingresa el código postal de origen", [["number"]]],
    ["Ingresa el código postal de destino", [["number"]]]
]

let user_questions = [
    ["Ingresa la informacion del remitente:", [["text","Nombre completo"],["text","Ciudad"],["text","País"],["number","Código Postal"],["tel","Teléfono"],["text","Correo Electrónico"]]],
    ["Ingresa la informacion del destinatario:", [["text","Nombre completo"],["text","Ciudad"],["text","País"],["number","Código Postal"],["tel","Teléfono"],["text","Correo Electrónico"]]]
]

let prefixQuestion = ["send", "user"]

let currentPrefix = 0

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
        input.style.display = "block"
        input.style.width = "90vw"

        let stored = localStorage.getItem(`q${prefixQuestion[currentPrefix]}-${index}-${i}`)
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

        if (currentPrefix == 0) {
            sendBtn.addEventListener('click',shipForm())
        } else {
            nextBtn.style.display = "flex"
            navBtns.appendChild(sendBtn)
        }
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
                    localStorage.setItem(`q${prefixQuestion[currentPrefix]}-${currentIndex-1}-${i}`, inputGroup[i].value)
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

function succesfulOrder() {
    questionContainer.innerHTML = ""
    navBtns.innerHTML = ""

    let title = document.createElement('h2')
    title.textContent = "Ha generado un envio de forma exitosa"

    let shipmentChoice = localStorage.getItem("shipment_choice")
    let senderName = localStorage.getItem("quser-0-0")
    let recipientName = localStorage.getItem("quser-1-0")

    let msg = document.createElement('p')
    msg.innerHTML = `
        Resumen de tu envío:<br>
        Remitente: ${senderName}<br>
        Destinatario: ${recipientName}<br>
        Opción de envío: ${shipmentChoice}<br>
        Gracias de parte de Maquetado Envios. `

            questionContainer.appendChild(title)
            questionContainer.appendChild(msg)
}

function userForm() {
    questionContainer.innerHTML = ""
    navBtns.innerHTML = ""

    currentIndex = 0

    currentQuestions = user_questions

    navBtns.appendChild(backBtn)
    navBtns.appendChild(nextBtn)

    currentPrefix = 1

    renderQuestions(currentQuestions, currentIndex)
    showButtons()

    sendBtn.addEventListener("click", () => {
        succesfulOrder()
    })
}

function shipForm() {
    let shipment_options = document.createElement('select')
    shipment_options.setAttribute('class', 'form-select')

    questionContainer.innerHTML = ""
    navBtns.innerHTML = ""

    let title = document.createElement('h2')
    title.textContent = "Selecciona la opción de envío más adecuada."

    shipment_options.innerHTML = `<option selected>Abre el menú de opciones</option>
    <option value="DHL">DHL - $200MXN - 1-3 días hábiles</option>
    <option value="Estafeta">Estafeta - $100MXN - 4-6 días hábiles</option>
    <option value="RedPack">RedPack - $80MXN - 3-5 días hábiles</option>
    <option value="Fedex">Fedex - $300MXN - 2-4 días hábiles</option>`

    const shipBtn = document.createElement('button')
    shipBtn.setAttribute('class','btn-dark')
    shipBtn.textContent = "Escoger opcion de envio"

    questionContainer.appendChild(title)
    questionContainer.appendChild(shipment_options)
    navBtns.appendChild(shipBtn)

    shipBtn.addEventListener('click', () => {
        localStorage.setItem("shipment_choice", shipment_options.value)
        userForm()
    })
}

backBtn.addEventListener('click',goBack)
nextBtn.addEventListener('click',goNext)
window.addEventListener('load', () => {
    renderQuestions(currentQuestions, currentIndex)
    showButtons()
})