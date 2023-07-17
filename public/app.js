// app.js

const notesList = document.getElementById('notes-list');
const addNoteForm = document.getElementById('add-note-form');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Function to fetch and display notes from the server
async function fetchNotes() {
  try {
    const response = await fetch('/notes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      // Clear existing notes
      notesList.innerHTML = '';

      if (data.notes.length === 0) {
        notesList.innerHTML = '<p>No notes found.</p>';
      } else {
        // Display each note
        data.notes.forEach((note) => {
          const noteCard = createNoteCard(note);
          notesList.appendChild(noteCard);
        });
      }
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('An error occurred while fetching notes.');
    console.error(error);
  }
}

// Function to create a note card
function createNoteCard(note) {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');

  const noteTitle = document.createElement('h3');
  noteTitle.textContent = note.title;

  const noteContent = document.createElement('p');
  noteContent.textContent = note.content;

  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteContent);

  return noteCard;
}

// Function to handle form submission and add a new note
async function addNoteFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('note-title').value;
  const content = document.getElementById('note-content').value;

  try {
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();

    if (response.ok) {
      // Clear the form
      addNoteForm.reset();

      // Display the new note
      const noteCard = createNoteCard(data.note);
      notesList.appendChild(noteCard);
      showSuccess('Note added successfully.');
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('An error occurred while adding the note.');
    console.error(error);
  }
}

// Function to handle registration form submission
async function registerFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // Registration successful, proceed to login
      loginForm.reset();
      showSuccess('Registration successful. You can now login.');
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('An error occurred while registering.');
    console.error(error);
  }
}

// Function to handle login form submission
async function loginFormSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // Login successful, store the token in local storage
      localStorage.setItem('token', data.token);
      loginForm.reset();
      fetchNotes();
    } else {
      showError(data.message);
    }
  } catch (error) {
    showError('An error occurred while logging in.');
    console.error(error);
  }
}

// Function to display an error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = message;
  document.body.insertBefore(errorDiv, document.body.firstChild);
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}

// Function to display a success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.classList.add('success-message');
  successDiv.textContent = message;
  document.body.insertBefore(successDiv, document.body.firstChild);
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Add event listeners to the add note form, register form, and login form
addNoteForm.addEventListener('submit', addNoteFormSubmit);
registerForm.addEventListener('submit', registerFormSubmit);
loginForm.addEventListener('submit', loginFormSubmit);

// Fetch notes on initial page load
fetchNotes();
