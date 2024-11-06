const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAsnwer = document.createElement("button")
        newAsnwer.classList.add("button", "answer")
        newAsnwer.textContent = answer.text
        if (answer.correct) {
            newAsnwer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAsnwer)

        newAsnwer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true

        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestions = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestions)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito bom :)"
            break
        case (performance >= 50):
            message = "Bom"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML =
        `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
    {
        question: "Qual animal é considerado o maior felino das Américas?",
        answers: [
            { text: "Onça-parda", correct: false },
            { text: "Leão", correct: false },
            { text: "Onça-pintada", correct: true },
            { text: "Tigre", correct: false }
        ]
    },
    {
        question: "O boto-cor-de-rosa nasce de qual cor?",
        answers: [
            { text: "Cinza", correct: true },
            { text: "Branco", correct: false },
            { text: "Rosa", correct: false },
            { text: "Azul", correct: false },
        ]
    },
    {
        question: '"O mico-leão-dourado existe em qual país?"',
        answers: [
            { text: "Brasil e Portugal", correct: false },
            { text: "Peru e Uruguai", correct: false },
            { text: "Bolívia e Paraguai", correct: false },
            { text: "Somente no Brasil", correct: true },
        ]
    },
    {
        question: ' O lobo-guará é um animal feroz',
        answers: [
            { text: "Verdadeiro", correct: false },
            { text: "Falso", correct: true },
        ]
    },
    {
        question: 'A maior população de arara-azul são encontradas em qual bioma?',
        answers: [
            { text: 'Cerrado', correct: false },
            { text: 'Pantanal', correct: true },
            { text: 'Mata Atlântica', correct: false },
            { text: 'Amazônia', correct: false },
        ]
    },
    {
        question: 'Qual é a alimentação da anta?',
        answers: [
            { text: 'Castanhas e cocos ', correct: false },
            { text: 'Folhas, frutos, ervas e plantas aquáticas', correct: true },
            { text: 'Insetos, ovos de pássaros, casca de árvore, flores e frutos', correct: false },
            { text: 'Peixes e crustáceos', correct: false },
        ]
    },
    {
        question: ' Qual é o  parente mais próximo do peixe-boi?',
        answers: [
            { text: 'A vaca', correct: false },
            { text: 'O elefante', correct: true },
            { text: 'O boi', correct: false },
            { text: 'Nenhuma das alternativas', correct: false },
          
        ]
    },
]