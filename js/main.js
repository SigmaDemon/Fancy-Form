// Questions Array

import { types } from 'node-sass';

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
const formBox = document.getElementById('#form-box');
const nextBtn = document.getElementById('#next-btn');
const prevBtn = document.getElementById('#prev-btn');
const inputGroup = document.getElementById('#input-group');
const inputField = document.getElementById('#input-field');
const inputLabel = document.getElementById('#input-label');
const inputProgress = document.getElementById('#input-progress');
const progress = document.getElementById('#progress-bar');

// Events
document.addEventListener('DOMContentLoaded', getQuestion);

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
  prevBtn.className = position ? 'fa fa-arrow-left' : 'fa fa-user';
}
