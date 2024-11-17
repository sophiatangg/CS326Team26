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

    // Add event listener for logo click
    const logo = document.getElementById("imgLogo");
    logo.addEventListener("click", () => {
        loadView("home");
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

        // Remove search bar if not in the Search view
        const searchBar = document.querySelector(".bar");
        if (searchBar && view !== 'Search') {
            const header = document.getElementById("header");
            header.removeChild(searchBar);
        }

        // Add Explore button functionality on the home page
        if (view === "home") {
            const exploreBtn = document.querySelector('.btn-secondary');
            if (exploreBtn) {
                exploreBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    const view = event.target.getAttribute("data-view");
                    loadView(view);
                });
            }
        }
    }
}
