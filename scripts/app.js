'use strict'

// select quiz params
let numberOfQtn = document.querySelector('#num-qtn')
const selectDifficulty = document.getElementById('difficulty')
let difficulty = selectDifficulty.options[selectDifficulty.selectedIndex]

let questions = []

/**
 * This function helps to decode questions containing html tags
 * It receives the the question as an arg, stores it in a textarea and then returns the text content of the value stored.
 * @param {*} html
 * @returns
 */
const decodeHtml = (html) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const fetchCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php')
  const data = await response.json()
  const categories = document.querySelector('.categories')

  for (let index = 0; index < data.trivia_categories.length; index++) {
    const element = data.trivia_categories[index]
    categories.insertAdjacentHTML(
      'beforeend',
      `<option value = "${element.id}">${element.name}</option>`
    )
  }
}

fetchCategories()

const fetchQuestions = async () => {
  const selectCategory = document.getElementById('categories')
  const category = selectCategory.options[selectCategory.selectedIndex].value

  const selectDifficulty = document.getElementById('difficulty')
  difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].value

  numberOfQtn = document.querySelector('#num-qtn').value
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQtn}&category=${category}&difficulty=${difficulty}`
    )

    if (!response.ok) {
      throw new Error(
        `Network response was not OK (Status: ${response.status})`
      )
    }

    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error(`Try different categories/amount.`)
    }

    questions = data.results.map((result, index) => {
      const options = [...result.incorrect_answers, result.correct_answer]
      // shuffle the answers
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[options[i], options[j]] = [options[j], options[i]]
      }

      return {
        num: index + 1,
        question: decodeHtml(result.question),
        answer: decodeHtml(result.correct_answer),
        options: options.map((opt) => decodeHtml(opt))
      }
    })

    totalQuestion.textContent = questions.length
    totalQuestionAns.textContent = questions.length

    startQuiz()
  } catch (error) {
    console.error('Error loading quiz questions:', error.message)

    startBtn.textContent = `Error loading quiz: ${error.message}. Click to retry.`
    startBtn.classList.remove('inactive')
  }
}

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
  quizBox.classList.remove('inactive')

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

startBtn.addEventListener('click', fetchQuestions)
