import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class createAccount extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('createAccount');
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("container");
        const form = document.createElement("div");
        form.classList.add("form");
        form.innerHTML = `
            <center>
            <form id="create-form">
                <div id="main-form">
                    <h1>Please enter your details</h1>
                    <div>
                        <label for="username">Username:</label>
                        <input type="text" name="username" id="username">
                    </div>
                    <div>
                        <label for="email">Enter Email:</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div>
                        <label for="password">Create Password:</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <div id="create-btn">
                        <button id="create-account-btn" type="submit">Create Account</button>
                    </div>
                </div>
            </form>
            </center>
        `;
        container.appendChild(form);

        // Add event listener AFTER the DOM is updated
        setTimeout(() => this.addEventListeners(), 0);

        return container;
    }

    addEventListeners() {
        const createForm = document.getElementById("create-form");
        if (createForm) {
            createForm.addEventListener("submit", (e) => this.handleCreateAccount(e));
        } else {
            console.error("Form not found in DOM");
        }
    }

    async handleCreateAccount(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
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
