// Questions Array
// The email has been validated using the regular expression for ts pattern
const questions = [
  { question: 'Please enter your First Name' },
  { question: 'Please enter your Last Name' },
  { question: 'Please enter your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Please enter your Password', type: 'password' }
];

// Transition Times
const shakeTime = 100; // Shake transition time has been set to 100
const switchTime = 200; // Transition between questions

// Init Position at First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

// Get Question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// Functions

// Get Question from Array & Add to Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;

  // Get Current Type
  inputField.type = questions[position].type || 'text';

  // Get Current Answer
  inputField.value = questions[position].answer || '';

  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending on Question
  // Reason why the User Icon did not appear is because of the "import { types } from 'node-sass';", which I have deleted
  prevBtn.className = position ? 'fa fa-arrow-left' : 'fa fa-user';

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to Create Shake Motion
function transform(x, y) {
  console.log(x, y);
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make sure that the pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion - Set i to number of shakes
  for (let i = 0; i < 4; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 4, 0, 0);
    inputField.focus();
  }
}

// Field Input Pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
}

// All Fields are Complete - Once the form is complete, the 'h1' heading will be displayed on the screen
function formComplete() {
  const h1 = document.createElement('h1');
  h1.addClass('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${question[0].answer} You have registered successfully and will receive an email shortly!`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
