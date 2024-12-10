import { BaseComponent } from "../BaseComponent/BaseComponent.js";
export class signup extends BaseComponent{
    constructor(){
        super();
        this.loadCSS('signup');
    }
    
    async handleSignIn(event) {
        event.preventDefault(); // Prevent default form behavior
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
    
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token); // Save JWT
                alert('Login successful');
                window.location.href = '/'; // Redirect after login
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    }
    
    render() {
        const container = document.createElement("div");
        container.classList.add("container");
    
        const form = document.createElement("div");
        form.classList.add("form");
        form.innerHTML = 
            `<form id="login-form">
                <h1 id="heading">SignUp/Login</h1>
                <div>
                    <input type="text" name="username" id="username" placeholder="username">
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="password">
                </div>
                <div>
                    <button id="next" type="submit">Sign In</button>
                </div>
                <hr>
                <div id="create">
                    Don't have an account? 
                    <button id="create-acc">Create account</button>
                </div>
            </form>`
        ;
    
        container.appendChild(form);
    
        // Attach attributes and event listeners AFTER appending to DOM
        const createBtn = form.querySelector("#create-acc"); // Use form.querySelector here
        createBtn.setAttribute("data-view", "createAccount");
        document.getElementById('login-form').addEventListener('submit', this.handleSignIn.bind(this));

        return container;
    }
    
}
    
