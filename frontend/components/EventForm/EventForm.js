import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class EventForm extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('EventForm');
    }

    async submitEvent(eventData) {
        try {
            const response = await fetch('http://localhost:5050/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Event created successfully:', result);
                alert('Event created successfully!');
            } else {
                console.error('Failed to create event:', response.statusText);
                alert('Failed to create event. Please try again.');
            }
        } catch (error) {
            console.error('Error while submitting event:', error);
            alert('An error occurred. Please try again.');
        }
    }

    render() {
        const form = document.createElement('form');
        form.id = 'eventForm';

        // Title
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Event Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.required = true;

        // Description
        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.id = 'description';
        descriptionInput.required = true;

        // Start Date & Time
        const startDateLabel = document.createElement('label');
        startDateLabel.textContent = 'Start Date & Time:';
        const startDateInput = document.createElement('input');
        startDateInput.type = 'datetime-local';
        startDateInput.id = 'start_date';
        startDateInput.required = true;

        // End Date & Time
        const endDateLabel = document.createElement('label');
        endDateLabel.textContent = 'End Date & Time:';
        const endDateInput = document.createElement('input');
        endDateInput.type = 'datetime-local';
        endDateInput.id = 'end_date';
        endDateInput.required = true;

        // Location
        const locationLabel = document.createElement('label');
        locationLabel.textContent = 'Location:';
        const locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.id = 'location';
        locationInput.required = true;

        // Category
        const categoryLabel = document.createElement('label');
        categoryLabel.textContent = 'Category:';
        const categoryInput = document.createElement('select');
        categoryInput.id = 'category';
        categoryInput.required = true;
        const categories = ['General', 'Social', 'Education', 'Sports', 'Other'];
        categories.forEach((cat) => {
            const option = document.createElement('option');
            option.value = cat.toLowerCase();
            option.textContent = cat;
            categoryInput.appendChild(option);
        });

        // Cover Image
        const coverImageLabel = document.createElement('label');
        coverImageLabel.textContent = 'Cover Image URL:';
        const coverImageInput = document.createElement('input');
        coverImageInput.type = 'url';
        coverImageInput.id = 'cover_image';
        coverImageInput.placeholder = 'e.g., http://example.com/image.jpg';
        coverImageInput.required = true;

        // Submit Button
        const submitButtonContainer = document.createElement('div'); // Add a container for the button
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Create Event';
        submitButton.type = 'submit';
        submitButtonContainer.appendChild(submitButton); // Wrap the button in a container

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(startDateLabel);
        form.appendChild(startDateInput);
        form.appendChild(endDateLabel);
        form.appendChild(endDateInput);
        form.appendChild(locationLabel);
        form.appendChild(locationInput);
        form.appendChild(categoryLabel);
        form.appendChild(categoryInput);
        form.appendChild(coverImageLabel);
        form.appendChild(coverImageInput);
        form.appendChild(submitButtonContainer); // Add the container to the form

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const newEvent = {
                title: titleInput.value,
                description: descriptionInput.value,
                start_time: startDateInput.value,
                end_time: endDateInput.value,
                location: locationInput.value,
                username: 'user123', // Replace with actual logged-in user data
                category: categoryInput.value,
                cover_image: coverImageInput.value,
            };

            await this.submitEvent(newEvent);
            form.reset();
        });

        return form;
    }
}
