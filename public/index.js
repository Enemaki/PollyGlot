const instruction1 = document.getElementById("instruction1")
const languages = document.getElementById("instruction2")
const translateBtn = document.getElementById("translate-btn")
const french = document.getElementById("french")
const spanish = document.getElementById("spanish")
const japanese = document.getElementById("japanese")

translateBtn.addEventListener('click', function () {
    const input = document.getElementById("lang-input")
    let langEntry = ""
    let rad = ""
    let language = ""
    if (input.value) {
        langEntry = input.value
        instruction1.textContent = "Original text 👇"
        languages.textContent = "Your translation 👇"
        rad = radioTick()
        language = getLanguage(rad)
        document.querySelector('.form-div').textContent = "Loading translation..."
        getTranslation(langEntry, language)
    }
})

function radioTick () {
    const ele = document.getElementsByName("language")
    
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i]
        }
    }
}

function getLanguage(lang) {
    if (lang == french) {
        return "french"
    }
    else if (lang == spanish) {
        return "spanish"
    }
    else if (lang == japanese) {
        return "japanese"
    }
}

const mainContainer = document.querySelector('.main-container')

async function getTranslation(entry, choice) {
    try {
        const reply = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({first: entry, second: choice})
        }
        const response = await fetch('/info', reply)
        const answer = await response.json()
        const rollout = answer.answer
        renderTranslation(rollout)

    } catch (err) {
        console.log('Error:', err)
        mainContainer.innerHTML = `<div><p>Unable to access AI. Please refresh and try again</p></div>`
    }
}

function renderTranslation (info) {
    const formDiv = document.querySelector(".form-div")
    formDiv.innerHTML = `<div class="ans"><p class="innerans">${info}</p></div>`
    translateBtn.textContent = "Start Over"
    translateBtn.addEventListener('click', function () {
        location.reload()
    })  
}