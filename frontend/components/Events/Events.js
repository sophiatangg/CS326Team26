import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventForm } from '../EventForm/EventForm.js';
import MockEvents from './mockEvents.js';

export class Events extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Events');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'events-view';

        // Create the header with title and "Create Event" button
        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('h2');
        title.textContent = 'Events';

        const createButton = document.createElement('button');
        createButton.textContent = 'Create Event';
        createButton.classList.add('create-event-button');
        createButton.addEventListener('click', () => this.toggleEventForm());

        header.appendChild(title);
        header.appendChild(createButton);

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
                <div><strong>${event.username}</strong> posted an event</div>
                <div>${event.title}</div>
                <div><img src="${event.cover.replace('./mockImages/', './static/event_images/')}" alt="${event.title}"/></div>
                <div class="eventDetails">
                    <div><strong>Description:</strong></div>
                    <div>${event.desc}</div>
                    <div><strong>Category:</strong> ${event.category}</div>
                    <div><strong>When:</strong> ${event.date}</div>
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

    toggleEventForm() {
        const eventFormContainer = document.getElementById('eventFormContainer');
        if (eventFormContainer.classList.contains('hidden')) {
            const eventForm = new EventForm();
            eventFormContainer.appendChild(eventForm.render());
            eventFormContainer.classList.remove('hidden');
        } else {
            eventFormContainer.classList.add('hidden');
            eventFormContainer.innerHTML = '';
        }
    }
}
