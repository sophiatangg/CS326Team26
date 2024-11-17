import { Home } from './components/Home/Home.js';
import { Events } from './components/Events/Events.js';
import { About } from './components/About/About.js';
import { Search } from './components/Search/Search.js';
import { Profile } from './components/Profile/Profile.js';
import { EventSorting } from './components/EventSorting/EventSorting.js';


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
            component = new EventSorting();
            break;
        case 'about':
            component = new About();
            break;
        case 'Search':
            component = new Search();
            break;
        case 'profile':
            component = new Profile();
            break;
        default:
            console.error("View not found:", view);
            return;
    }

    if (component) {
        viewContainer.appendChild(component.render());
        const searchBar = document.querySelector(".bar");
    if(searchBar && view !== 'Search'){
        
        const header = document.getElementById("header");
        header.removeChild(searchBar);
    }
        if(view === "home"){
            const exploreBtn = document.querySelector('.btn-secondary');
            exploreBtn.addEventListener("click", (event)=>{
            event.preventDefault();
            const view = event.target.getAttribute("data-view");
            loadView(view);
    });
        }
    }
    
}

import { Home } from './components/Home/Home.js';
import { Events } from './components/Events/Events.js';
import { About } from './components/About/About.js';
import { EventSorting } from './components/EventSorting/EventSorting.js';

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
            component = new EventSorting();
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
