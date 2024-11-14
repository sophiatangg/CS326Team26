document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to OpenInvite!");

    // Load the default view (Home) on page load
    loadView("home");

    // Attach event listeners to navigation links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const view = event.target.getAttribute("data-view");
            loadView(view);
        });
    });

    // Function to load the appropriate view
    function loadView(view) {
        let viewUrl = "";
        
        switch (view) {
            case "home":
                viewUrl = "components/Home/Home.html";
                break;
            case "events":
                viewUrl = "components/Events/Events.html";
                break;
            case "about":
                viewUrl = "components/About/About.html";
                break;
            default:
                console.error("View not found:", view);
                return;
        }

        fetch(viewUrl)
            .then(response => response.text())
            .then(html => {
                document.getElementById("viewContainer").innerHTML = html;

                // Load the event form if the events view is selected
                if (view === "events") {
                    setupCreateEventButton();
                }
            })
            .catch(error => {
                console.error("Error loading view:", error);
            });
    }

    // Function to setup "Create Event" button behavior
    function setupCreateEventButton() {
        const createEventButton = document.getElementById("createEventButton");
        const eventFormContainer = document.getElementById("eventFormContainer");

        createEventButton.addEventListener("click", () => {
            // Toggle the visibility of the event form
            if (eventFormContainer.classList.contains("hidden")) {
                loadComponent("components/EventForm/EventForm.html", "eventFormContainer");
                eventFormContainer.classList.remove("hidden");
            } else {
                eventFormContainer.classList.add("hidden");
            }
        });
    }

    // Function to load an HTML component into a specified container
    function loadComponent(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
            })
            .catch(error => {
                console.error("Error loading component:", error);
            });
    }
});
