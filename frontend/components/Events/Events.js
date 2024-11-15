import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventForm } from '../EventForm/EventForm.js';

export class Events extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Events');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'events-view';

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

        const eventFormContainer = document.createElement('div');
        eventFormContainer.id = 'eventFormContainer';
        eventFormContainer.classList.add('hidden');

        container.appendChild(header);
        container.appendChild(eventFormContainer);

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
