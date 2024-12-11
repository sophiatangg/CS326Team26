import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class RsvpInputInfo extends BaseComponent {
    constructor(onSubmitCallback) {
        super();
        this.onSubmitCallback = onSubmitCallback; // Callback function to handle form submission
        if (this.cssLoaded) return; // Ensure CSS is loaded only once
        this.loadCSS('RsvpInputInfo');
    }

    render() {
        // Main container for the RSVP form
        const container = document.createElement('div');
        container.classList.add('rsvp-container');

        // Back to Events Button
        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Events';
        backButton.classList.add('buttons', 'back-button');
        backButton.addEventListener('click', () => {
            const rsvpContainer = document.getElementById('rsvpContainer');
            const eventSectionElem = document.getElementById('events');

            rsvpContainer.classList.add('hidden'); // Hide RSVP container
            eventSectionElem.classList.remove('hidden'); // Show events list
        });
        container.appendChild(backButton);

        // Title
        const header = document.createElement('h1');
        header.classList.add('title', 'rsvp-title');
        header.textContent = 'RSVP to Event'; // Dynamically update event name if available
        container.appendChild(header);

        // Name Input Section
        const nameSectionContainer = document.createElement('div');
        nameSectionContainer.classList.add('container');

        const nameTitle = document.createElement('h2');
        nameTitle.classList.add('title');
        nameTitle.textContent = 'Your Name';
        nameSectionContainer.appendChild(nameTitle);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.classList.add('input-boxes');
        nameInput.placeholder = 'Enter your name';
        nameInput.setAttribute('aria-label', 'Your Name');
        nameSectionContainer.appendChild(nameInput);

        container.appendChild(nameSectionContainer);

        // Dietary Restrictions Section
        const restrictionsContainer = document.createElement('div');
        restrictionsContainer.classList.add('container');

        const restrictionsTitle = document.createElement('h2');
        restrictionsTitle.classList.add('title');
        restrictionsTitle.textContent = 'Dietary Restrictions';
        restrictionsContainer.appendChild(restrictionsTitle);

        const form = document.createElement('form');
        restrictionsContainer.appendChild(form);

        // Create a new dietary restriction row
        const createRestrictionRow = () => {
            const restrictionRow = document.createElement('div');
            restrictionRow.classList.add('restriction-row');

            const select = document.createElement('select');
            select.classList.add('input-boxes', 'type-selection');
            select.innerHTML = `
                <option value="">Select Type</option>
                <option value="Food">Food</option>
                <option value="Skin">Skin</option>
                <option value="Pet">Pet</option>
                <option value="Other">Other</option>
            `;
            restrictionRow.appendChild(select);

            const descriptionInput = document.createElement('input');
            descriptionInput.type = 'text';
            descriptionInput.classList.add('input-boxes', 'description-input');
            descriptionInput.placeholder = 'Description';
            descriptionInput.setAttribute('aria-label', 'Description');
            restrictionRow.appendChild(descriptionInput);

            return restrictionRow;
        };

        // Add initial dietary restriction row
        form.appendChild(createRestrictionRow());

        // Button to add more dietary restriction rows
        const addRestrictionBtn = document.createElement('button');
        addRestrictionBtn.type = 'button';
        addRestrictionBtn.classList.add('buttons');
        addRestrictionBtn.textContent = 'Add Restriction';
        addRestrictionBtn.addEventListener('click', () => {
            const newRow = createRestrictionRow();
            form.appendChild(newRow);
        });
        restrictionsContainer.appendChild(addRestrictionBtn);

        container.appendChild(restrictionsContainer);

        // Accessibility Needs Section
        const accessibilityTitle = document.createElement('h2');
        accessibilityTitle.classList.add('title');
        accessibilityTitle.textContent = 'Accessibility Needs';
        restrictionsContainer.appendChild(accessibilityTitle);

        const accessibilityInput = document.createElement('textarea');
        accessibilityInput.classList.add('input-boxes', 'accessibility-input');
        accessibilityInput.placeholder = 'Describe here';
        accessibilityInput.setAttribute('aria-label', 'Accessibility Needs');
        restrictionsContainer.appendChild(accessibilityInput);

        // Review Button
        const reviewButton = document.createElement('button');
        reviewButton.classList.add('buttons', 'review-button');
        reviewButton.textContent = 'Review';
        reviewButton.addEventListener('click', () => {
            const dietaryRestrictions = [];
            form.querySelectorAll('.restriction-row').forEach((row) => {
                const type = row.querySelector('.type-selection').value;
                const description = row.querySelector('.description-input').value;
                if (type || description) {
                    dietaryRestrictions.push({ type, description });
                }
            });

            const userName = nameInput.value;
            const accessibilityNeeds = accessibilityInput.value;

            this.onSubmitCallback({ userName, dietaryRestrictions, accessibilityNeeds });
        });

        container.appendChild(reviewButton);

        return container;
    }
}
