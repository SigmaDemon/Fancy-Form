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
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

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
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
}
