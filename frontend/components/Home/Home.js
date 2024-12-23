import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Home extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Home');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'home-view';
        const header = document.createElement('h1');
        header.innerText = 'OpenInvite';
        header.classList.add("openInvite")
        const mainDiv = document.createElement("div");
        
        const motto = document.createElement("p");
        motto.classList.add("motto");
        motto.innerHTML="Connect, Share, Belong"

        mainDiv.appendChild(motto);
        container.appendChild(header);
        container.appendChild(mainDiv);

        const signUp = document.createElement("a");
        signUp.innerHTML = "Sign Up";
        signUp.classList.add("btn-primary");
        signUp.setAttribute("data-view", "signup");
        const explore = document.createElement("a");
        explore.innerHTML = "Explore Events";
        explore.classList.add("btn-secondary")
        explore.setAttribute("data-view", "events");
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("cta-buttons")
        btnDiv.appendChild(signUp);
        btnDiv.appendChild(explore);
        container.appendChild(btnDiv);
        
        const docHeader = document.getElementById("viewContainer");
        docHeader.appendChild(container);
   
        return container;
    }
}