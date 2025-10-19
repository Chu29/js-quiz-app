'use strict'

const questions = [
  {
    num: 1,
    question: 'What does CSS stand for?',
    answer: 'Cascading Style Sheets',
    options: [
      'Computer Style Sheets',
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Colorful Style Syntax',
    ],
  },
  {
    num: 2,
    question: 'Which HTML tag is used to create an unordered list?',
    answer: '<ul>',
    options: ['<ol>', '<li>', '<ul>', '<dl>'],
  },
  {
    num: 3,
    question: 'Which of the following is a client-side scripting language?',
    answer: 'JavaScript',
    options: ['Python', 'Java', 'PHP', 'JavaScript'],
  },
  {
    num: 4,
    question:
      'In CSS, which property is used to change the text color of an element?',
    answer: 'color',
    options: ['font-color', 'text-color', 'color', 'background-color'],
  },
  {
    num: 5,
    question: "What does the 'DOM' stand for in web development?",
    answer: 'Document Object Model',
    options: [
      'Data Object Manager',
      'Document Order Module',
      'Document Object Model',
      'Design Only Markup',
    ],
  },
  {
    num: 6,
    question:
      'Which keyword is used to declare a constant variable in modern JavaScript (ES6)?',
    answer: 'const',
    options: ['var', 'constant', 'const', 'let'],
  },
  {
    num: 7,
    question:
      'Which of the following is the correct way to add a comment in HTML?',
    answer: '',
    options: [
      '// This is a comment',
      '/* This is a comment */',
      '',
      "'This is a comment",
    ],
  },
  {
    num: 8,
    question: "In CSS, what does the 'M' stand for in the Box Model?",
    answer: 'Margin',
    options: ['Max-width', 'Model', 'Media', 'Margin'],
  },
  {
    num: 9,
    question:
      'What is the primary function of the `<head>` element in an HTML document?',
    answer: 'To contain metadata and links to external files',
    options: [
      'To display the main heading of the page',
      'To contain all the visible content on the page',
      'To contain JavaScript code only',
      'To contain metadata and links to external files',
    ],
  },
  {
    num: 10,
    question:
      'Which operator is used for strict equality comparison (value and type) in JavaScript?',
    answer: '===',
    options: ['==', '!=', '===', '='],
  },
  {
    num: 11,
    question:
      "What is the default behavior of a flex container's items without any property set?",
    answer: 'They line up in a row',
    options: [
      'They stack in a column',
      'They line up in a row',
      'They shrink to fit the content',
      'They fill the entire container width',
    ],
  },
  {
    num: 12,
    question:
      'Which HTML tag is specifically designed to display a large piece of code?',
    answer: '<pre>',
    options: ['<code-block>', '<text-area>', '<pre>', '<samp>'],
  },
  {
    num: 13,
    question: "What is 'hoisting' in JavaScript?",
    answer:
      'A mechanism where variable and function declarations are moved to the top of their scope during compilation',
    options: [
      'A technique for moving elements on the screen',
      'A method for importing external libraries',
      'A server-side optimization process',
      'A mechanism where variable and function declarations are moved to the top of their scope during compilation',
    ],
  },
  {
    num: 14,
    question:
      'The property `padding` in CSS controls the space between what two elements?',
    answer: 'The content and the border',
    options: [
      "The element's border and other elements",
      'The content and the border',
      'The margin and the border',
      'Two adjacent elements',
    ],
  },
  {
    num: 15,
    question: 'What does AJAX stand for?',
    answer: 'Asynchronous JavaScript and XML',
    options: [
      'Advanced JavaScript and XHTML',
      'Asynchronous JavaScript and XML',
      'All JavaScript and XAML',
      'Asynchronous JSON and XML',
    ],
  },
]

// select html elements
const startBtn = document.querySelector('.start-quiz')
const quizBox = document.querySelector9('.quiz-box')
const questionText = quizBox.querySelector('.que-text')
const optionsBox = quizBox.querySelector('.next-btn')
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
