'use strict'

const questions = [
  {
    num: 1,
    question: 'What is the largest organ in the human body?',
    answer: 'Skin',
    options: ['Heart', 'Liver', 'Brain', 'Skin']
  },
  {
    num: 2,
    question: 'Who developed the theory of relativity?',
    answer: 'Albert Einstein',
    options: [
      'Isaac Newton',
      'Galileo Galilei',
      'Nikola Tesla',
      'Albert Einstein'
    ]
  },
  {
    num: 3,
    question: 'What is the capital city of Brazil?',
    answer: 'Brasília',
    options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Buenos Aires']
  },
  {
    num: 4,
    question: 'In what year did the Titanic sink?',
    answer: '1912',
    options: ['1905', '1912', '1918', '1923']
  },
  {
    num: 5,
    question: "Which element has the chemical symbol 'O'?",
    answer: 'Oxygen',
    options: ['Gold', 'Iron', 'Oxygen', 'Osmium']
  },
  {
    num: 6,
    question:
      'The ancient city of Machu Picchu is located in which modern country?',
    answer: 'Peru',
    options: ['Mexico', 'Chile', 'Peru', 'Colombia']
  },
  {
    num: 7,
    question: 'What is the primary function of chlorophyll in a plant?',
    answer: 'To absorb light for photosynthesis',
    options: [
      'To give the flower scent',
      'To protect the plant from pests',
      'To absorb water from the soil',
      'To absorb light for photosynthesis'
    ]
  },
  {
    num: 8,
    question: "Who wrote the play 'Romeo and Juliet'?",
    answer: 'William Shakespeare',
    options: [
      'Charles Dickens',
      'Jane Austen',
      'William Shakespeare',
      'Mark Twain'
    ]
  },
  {
    num: 9,
    question: "Which US state is known as the 'Sunshine State'?",
    answer: 'Florida',
    options: ['California', 'Texas', 'Florida', 'Hawaii']
  },
  {
    num: 10,
    question: 'How many bones are in the average adult human body?',
    answer: '206',
    options: ['200', '206', '212', '300']
  }
]

// select html elements
const startBtn = document.querySelector('.start-quiz')
const quizBox = document.querySelector('.quiz-box')
const questionText = quizBox.querySelector('.que-text')
const optionsBox = quizBox.querySelector('.options')
const nextBtn = document.querySelector('.next-btn')
const totalQuestion = document.querySelector('.quiz-footer .total-que')
const countQuestion = document.querySelector('.quiz-footer .count-que')
const resultBox = document.querySelector('.result-box')
const totalQuestionAns = document.querySelector('.total-que span')
const correctAns = document.querySelector('.right-ans span')
const wrongAns = document.querySelector('.wrong-ans span')
const percentage = document.querySelector('.percentage span')
const retakeQuiz = document.querySelector('.result-footer .again-quiz')
const exitBtn = document.querySelector('.result-footer .exit')
const markWrong = '<i class="fa fa-times"></i>'
const markCheck = '<i class="fa fa-check"></i>'

// update the total number of questions on the dom
totalQuestion.textContent = questions.length
totalQuestionAns.textContent = questions.length

const startQuiz = () => {
  quizBox.classList.remove('inactive')
  startBtn.classList.add('inactive')
  countQuestion.textContent = questionIndex + 1
  showQuestion(questionIndex)
}

let questionIndex = 0
let rightAns = 0
let incorrectAns = 0

const showQuestion = (qIndex) => {
  questionText.textContent =
    questions[qIndex].num + '. ' + questions[qIndex].question

  let optionStatement = ''
  for (let i = 0; i < questions[qIndex].options.length; i++) {
    optionStatement += `<div class='option'>${questions[qIndex].options[i]}</div>`
  }

  optionsBox.innerHTML = optionStatement
  const allOptions = optionsBox.querySelectorAll('.option')

  for (let j = 0; j < allOptions.length; j++) {
    allOptions[j].addEventListener('click', (event) => {
      userAnswer(event.target)
    })
  }
}

nextBtn.onclick = () => {
  questionIndex++

  if (questions.length > questionIndex) {
    countQuestion.textContent = questionIndex + 1
    showQuestion(questionIndex)
  } else {
    quizBox.classList.add('inactive')
    resultBox.classList.remove('inactive')
    correctAns.textContent = rightAns
    wrongAns.textContent = incorrectAns
    percentage.textContent =
      ((rightAns * 100) / questions.length).toFixed(2) + '%'
  }

  if (questions.length - 1 === questionIndex) {
    nextBtn.textContent = 'Finish'
  }
}

const userAnswer = (answer) => {
  const userAns = answer.textContent
  const correctAns = questions[questionIndex].answer
  const allOptions2 = optionsBox.querySelectorAll('.option')

  nextBtn.classList.remove('inactive')
  if (userAns === correctAns) {
    answer.classList.add('correct')
    answer.insertAdjacentHTML('beforeend', markCheck)
    rightAns++
  } else {
    answer.classList.add('incorrect')
    answer.insertAdjacentHTML('beforeend', markWrong)
    incorrectAns++

    for (let i = 0; i < allOptions2.length; i++) {
      if (allOptions2[i].textContent === correctAns) {
        allOptions2[i].classList.add('correct')
        allOptions2[i].insertAdjacentHTML('beforeend', markCheck)
      }
    }
  }

  for (let j = 0; j < allOptions2.length; j++) {
    allOptions2[j].classList.add('disabled')
  }
}

retakeQuiz.onclick = () => {
  resultBox.classList.add('inactive')
  quizBox.classList.remove('.inactive')

  resetQuiz()
}
exitBtn.onclick = () => {
  startBtn.classList.remove('inactive')
  resultBox.classList.add('inactive')

  resetQuiz()
}

const resetQuiz = () => {
  questionIndex = 0
  rightAns = 0
  incorrectAns = 0
  nextBtn.textContent = 'Next Question'
  countQuestion.textContent = questionIndex + 1
  showQuestion(questionIndex)
}

startBtn.addEventListener('click', startQuiz)
