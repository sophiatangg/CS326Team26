import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class EventForm extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('EventForm');
    }

    render() {
        const form = document.createElement('form');
        form.id = 'eventForm';

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Event Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.required = true;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.id = 'description';
        descriptionInput.required = true;

        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Event Date:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'date';
        dateInput.required = true;

        const locationLabel = document.createElement('label');
        locationLabel.textContent = 'Location:';
        const locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.id = 'location';
        locationInput.required = true;

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Create Event';
        submitButton.type = 'submit';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(dateLabel);
        form.appendChild(dateInput);
        form.appendChild(locationLabel);
        form.appendChild(locationInput);
        form.appendChild(submitButton);

        return form;
    }
}
