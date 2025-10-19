'use strict'

const questions = [
  {
    num: 1,
    question: 'What does HTML stand for?',
    answer: 'Hyper Text Markup Language',
    options: [
      'Hyper Text Multiple Language',
      'Hyper Text Preprocessor',
      'Hyper Tool Multi Language',
      'Hyper Text Markup Language'
    ]
  },
  {
    num: 2,
    question: 'What does CSS stand for?',
    answer: 'Cascading Style Sheet',
    options: [
      'Computer Style Sheet',
      'Cascading Style Sheet',
      'Colorful Style Sheet',
      'Common Style Sheet'
    ]
  },
  {
    num: 3,
    question: 'What does PHP stand for?',
    answer: 'Hypertext Preprocessor',
    options: [
      'Hypertext Preprocessor',
      'Hypertext Programming',
      'Hometext Preprocessor',
      'Hypertext Preprogramming'
    ]
  },

  {
    num: 4,
    question: 'What does XML stand for?',
    answer: 'eXtensible Markup Language',
    options: [
      'eXTra Multi-Program Language',
      'eXecutable Multiple Language',
      'eXtensible Markup Language',
      'eXamine Multiple Language'
    ]
  },
  {
    num: 5,
    question: 'What does SQL stand for?',
    answer: 'Structured Query Language',
    options: [
      'Statement Question Language',
      'Stylesheet Query Language',
      'Stylish Question Language',
      'Structured Query Language'
    ]
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
  let allOptions = optionsBox.querySelectorAll('.option')

  for (let j = 0; j < allOptions.length; j++) {
    allOptions[j].setAttribute('onclick', 'userAnswer(this)')
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

  if (questions.length - 1 == questionIndex) {
    nextBtn.textContent = 'Finish'
  }
}

const userAnswer = (answer) => {
  let userAns = answer.textContent
  let correctAns = questions[questionIndex].answer
  let allOptions2 = optionsBox.querySelectorAll('.option')

  nextBtn.classList.remove('inactive')
  if (userAns == correctAns) {
    answer.classList.add('correct')
    answer.insertAdjacentHTML('beforeend', markCheck)
    rightAns++
  } else {
    answer.classList.add('incorrect')
    answer.insertAdjacentHTML('beforeend', markWrong)
    incorrectAns++

    for (let i = 0; i < allOptions2.length; i++) {
      if (allOptions2[i].textContent == correctAns) {
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
  wrongAns = 0
  nextBtn.textContent = 'Next Question'
  countQuestion.textContent = questionIndex + 1
  showQuestion(questionIndex)
}

startBtn.addEventListener('click', startQuiz)
