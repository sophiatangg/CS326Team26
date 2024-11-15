import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventForm } from '../EventForm/EventForm.js';
import MockEvents from './mockEvents.js';

export class Events extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Events');
        this.isCreatingEvent = false; // State to track if we're in "create event" mode
    }

    render() {
        const container = document.createElement('section');
        container.id = 'events-view';

        // Create the header with title and "Create Event" button
        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('h2');
        title.textContent = 'Events';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Create Event';
        toggleButton.classList.add('toggle-button');
        toggleButton.addEventListener('click', () => this.toggleEventForm(toggleButton, eventSectionElem, eventFormContainer));

        header.appendChild(title);
        header.appendChild(toggleButton);

        // Event form container, initially hidden
        const eventFormContainer = document.createElement('div');
        eventFormContainer.id = 'eventFormContainer';
        eventFormContainer.classList.add('hidden');

        // Event section to hold the list of events
        const eventSectionElem = document.createElement('div');
        eventSectionElem.id = 'events';

        // Populate events from MockEvents
        MockEvents.forEach((event) => {
            const elem = document.createElement('div');
            elem.id = `event-${event.id}`;
            elem.className = 'eventContainer';

            elem.innerHTML = `
                <div class="eventHeader"><strong>${event.username}</strong> posted an event</div>
                <h3>${event.title}</h3>
                <div class="eventImage"><img src="${event.cover.replace('./mockImages/', './static/event_images/')}" alt="${event.title}"/></div>
                <div class="eventDetails">
                    <p><strong>Description:</strong> ${event.desc}</p>
                    <p><strong>Category:</strong> ${event.category}</p>
                    <p><strong>When:</strong> ${event.date}</p>
                </div>
            `;

            eventSectionElem.appendChild(elem);
        });

        // Append all elements to the container
        container.appendChild(header);
        container.appendChild(eventFormContainer);
        container.appendChild(eventSectionElem);

        return container;
    }

    toggleEventForm(button, eventSectionElem, eventFormContainer) {
        this.isCreatingEvent = !this.isCreatingEvent; // Toggle the state

        if (this.isCreatingEvent) {
            console.log("creating event");
            // Show the event form and hide the event list
            eventFormContainer.innerHTML = '';
            const eventForm = new EventForm();
            eventFormContainer.appendChild(eventForm.render());
            console.log("event form rendered")
            eventFormContainer.classList.remove('hidden');
            eventSectionElem.classList.add('hidden');
            console.log("event section hidden?")

            button.textContent = 'Back to Browse Events';
        } else {
            // Show the event list and hide the event form
            eventFormContainer.classList.add('hidden');
            eventSectionElem.classList.remove('hidden');

            button.textContent = 'Create Event';
        }
    }
}
