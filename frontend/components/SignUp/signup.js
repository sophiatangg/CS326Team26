import { BaseComponent } from "../BaseComponent/BaseComponent.js";
export class signup extends BaseComponent{
    constructor(){
        super();
        this.loadCSS('signup');
    }
    render(){
        const container = document.createElement("div");
        container.classList.add("container");
        const form = document.createElement("div");
        form.classList.add("form");
        form.innerHTML =`
            <form action="#">
            <h1 id="heading">SignUp/Login</h1>
            <div>
            <input type="text" name="username" id="username" placeholder="username">
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
        `
        container.appendChild(form);
        return container;
        
        
    }
}