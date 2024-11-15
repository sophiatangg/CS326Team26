import MockEvents from "./mockEvents.js";

// dummy for now
document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to OpenInvite! - Event page");

    const eventSectionElem = document.querySelector("#events");

    MockEvents.forEach((event) => {

        const elem = document.createElement("div");
        elem.id = event.id;
        elem.className = "eventContainer"

        elem.innerHTML = `
            <div><strong>${event.username}</strong> posted an event</div>
            <div>${event.title}</div>

            <div><img src="${event.cover ?? null}"/</div>
            <div class="eventDetails">
                <div><strong>Description</strong></div>
                <div>${event.desc}</div>
                <div><strong> Catergory:</strong> ${event.category}</div>
                <div><strong> When:</strong> ${event.date}</div>
            </div>
            
        `;

        eventSectionElem.appendChild(elem);
    });
});

/*event container is each event and think of divs and each thing i want ot display */