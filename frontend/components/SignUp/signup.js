import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { Events } from '../../eventhub/EventNames.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class signup extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('signup');
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("container");
    
        const form = document.createElement("div");
        form.classList.add("form");

        this.#renderLoginForm(form);

        container.appendChild(form);
        return container;
    }

    #renderLoginForm(form) {
        form.innerHTML = `
            <form action="#">
                <h1 id="heading">SignUp/Login</h1>
                <div>
                    <input type="text" name="email" id="email" placeholder="email">
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="password">
                </div>
                <div>
                    <button id="next">Sign In</button>
                </div>
                <hr>
                <div id="create">
                    Don't have an account? 
                    <button id="create-acc">Create account</button>
                </div>
            </form>
        `;

        // Attach event listeners
        form.querySelector("#next").addEventListener("click", (event) => {
            event.preventDefault();
            this.handleSignIn();
        });

        const createAccountBtn = form.querySelector("#create-acc");
        createAccountBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.#renderCreateAccountForm(form);
        });
    }

    #renderCreateAccountForm(form) {
        form.innerHTML = `
            <form action="#">
                <h1 id="heading">Create Account</h1>
                <div>
                    <input type="text" name="email" id="email" placeholder="email">
                </div>
                <div>
                    <input type="text" name="username" id="username" placeholder="username">
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="password">
                </div>
                <div>
                    <button id="register">Register</button>
                </div>
                <hr>
                <div id="back">
                    Already have an account? 
                    <button id="back-to-login">Back to Login</button>
                </div>
            </form>
        `;

        // Attach event listeners
        form.querySelector("#register").addEventListener("click", (event) => {
            event.preventDefault();
            this.handleRegister();
        });

        const backToLoginBtn = form.querySelector("#back-to-login");
        backToLoginBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.#renderLoginForm(form);
        });
    }

    async handleSignIn() {
        const hub = EventHub.getInstance();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill in all fields to sign in.");
            return;
        }
        // hub.subscribe(Events.LogInSuccessful, (message) => {this.#signUpMessage(message)});
        // hub.publish(Events.LogIn, {username,password});
        try {
            const response = await fetch('http://localhost:5050/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                sessionStorage.setItem('token', data.token); // Save JWT
                alert('Login successful');
                hub.publish(Events.LoggedIn, true);
                // window.location.href = '/'; // Redirect after login
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    
    }

    async handleRegister() {
        event.preventDefault(); // Prevent default form behavior
        const hub = EventHub.getInstance();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !username || !password) {
            alert("Please fill in all fields to create an account.");
            return;
        }
        // hub.subscribe(Events.SignUpSuccessful, (message) => {this.#signUpMessage(message)});
        // hub.publish(Events.SignUp, {username , email, password});
        try {
            const response = await fetch('http://localhost:5050/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account created successfully. Redirecting to login...');
                window.location.href = '/login'; // Redirect to login page
            } else {
                alert(data.error || 'Error creating account');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    }
}
