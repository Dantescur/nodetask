// Function to handle user registration form submission
async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('logname').value;
    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registration successful
            console.log('Registration successful:', data);
            // Redirect to login page or perform any other action
        } else {
            // Registration failed
            console.error('Registration failed:', data.message);
            // Display error message to the user
        }
    } catch (error) {
        console.error('Error occurred during registration:', error);
        // Display error message to the user
    }
}

// Function to handle user login form submission
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            console.log('Login successful:', data);
            // Redirect to the user's dashboard or perform any other action
        } else {
            // Login failed
            console.error('Login failed:', data.message);
            // Display error message to the user
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        // Display error message to the user
    }
}

// Attach event listeners to the registration and login forms
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerForm.addEventListener('submit', handleRegister);
loginForm.addEventListener('submit', handleLogin);
