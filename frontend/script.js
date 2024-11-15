import { Home } from './components/Home/Home.js';
import { Events } from './components/Events/Events.js';
import { About } from './components/About/About.js';

document.addEventListener("DOMContentLoaded", () => {
    loadView("home");

    // Attach event listeners to navigation links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const view = event.target.getAttribute("data-view");
            loadView(view);
        });
    });
});

function loadView(view) {
    const viewContainer = document.getElementById("viewContainer");
    viewContainer.innerHTML = ''; // Clear existing content

    let component;
    switch (view) {
        case 'home':
            component = new Home();
            break;
        case 'events':
            component = new Events();
            break;
        case 'about':
            component = new About();
            break;
        default:
            console.error("View not found:", view);
            return;
    }

    if (component) {
        viewContainer.appendChild(component.render());
    }
}
