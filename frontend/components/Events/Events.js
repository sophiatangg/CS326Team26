import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventForm } from '../EventForm/EventForm.js';
import { RsvpInputInfo } from '../RsvpInputInfo/RsvpInputInfo.js';
import { RsvpDetails } from '../RsvpDetails/RsvpDetails.js';
import MockEvents from './mockEvents.js';

export class Events extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Events');
        this.isCreatingEvent = false; // State to track if we're in "create event" mode
        this.isRsvpMode = false; // State to track if we're in RSVP mode
        this.events = [...MockEvents];
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

        const sortDropdown = document.createElement('select');
        sortDropdown.id = 'sortOptions';
        const options = ['date', 'location', 'category'];
        options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o;
            opt.textContent = `Sort by ${o}`;
            sortDropdown.appendChild(opt);
        });

        const sortButton = document.createElement('button');
        sortButton.textContent = 'Sort Events';
        sortButton.classList.add('sort-events-button');
        sortButton.addEventListener('click', () => {
            const sortOption = sortDropdown.value;
            this.sortEvents(sortOption);
        });

        const filterInput = document.createElement('input');
        filterInput.type = 'text';
        filterInput.placeholder = 'Filter by keyword';
        filterInput.id = 'filterInput';

        const filterButton= document.createElement('button');
        filterButton.textContent = 'Filter Events';
        filterButton.classList.add('filter-events-button');
        filterButton.addEventListener('click', () => {
            const keyword = filterInput.value.trim().toLowerCase();
            this.filterEvents(keyword);
        });


        header.appendChild(title);
        header.appendChild(toggleButton);
        header.appendChild(sortDropdown);
        header.appendChild(sortButton);
        header.appendChild(filterInput);
        header.appendChild(filterButton);

        // Event form container, initially hidden
        const eventFormContainer = document.createElement('div');
        eventFormContainer.id = 'eventFormContainer';
        eventFormContainer.classList.add('hidden');

        // Event section to hold the list of events
        const eventSectionElem = document.createElement('div');
        eventSectionElem.id = 'events';

        // RSVP container for rendering RSVP form or details
        const rsvpContainer = document.createElement('div');
        rsvpContainer.id = 'rsvpContainer';
        rsvpContainer.classList.add('hidden');

        // Populate events from MockEvents
        MockEvents.forEach((event) => {
            const elem = document.createElement('div');
            elem.id = `event-${event.id}`;
            elem.className = 'eventContainer';

            // Create event header
            const eventHeader = document.createElement('div');
            eventHeader.className = 'eventHeader';
            eventHeader.textContent = `${event.username} posted an event`;

            // Create event title
            const eventTitle = document.createElement('h3');
            eventTitle.textContent = event.title;

            // Create event image
            const eventImage = document.createElement('div');
            eventImage.className = 'eventImage';
            const image = document.createElement('img');
            image.src = event.cover.replace('./mockImages/', './static/event_images/');
            image.alt = event.title;
            eventImage.appendChild(image);

            // Create event details
            const eventDetails = document.createElement('div');
            eventDetails.className = 'eventDetails';

            const description = document.createElement('p');
            description.innerHTML = `<strong>Description:</strong> ${event.desc}`;
            const category = document.createElement('p');
            category.innerHTML = `<strong>Category:</strong> ${event.category}`;
            const date = document.createElement('p');
            date.innerHTML = `<strong>When:</strong> ${event.date || 'TBD'}`;
            const location = document.createElement('p');
            location.innerHTML = `<strong>Where:</strong> ${event.where || 'TBD'}`;

            eventDetails.append(description, category, date, location);

            // Hide additional details initially
            const additionalInfo = document.createElement('div');
            additionalInfo.className = 'additionalInfo hidden';
            additionalInfo.innerHTML = `
                <p><strong>Additional Details:</strong> ${(event.time || event.time) ? '' : 'No additional details available.'}</p>
                <p><strong>Category:</strong> ${event.category || 'TBD'}</p>
                <p><strong>Time:</strong> ${event.time || 'TBD'}</p>
            `;

            // RSVP buttons
            const rsvpSection = document.createElement('div');
            rsvpSection.className = 'rsvpSection';

            const rsvpYes = this.createRsvpButton('Yes', 'green', event.id);
            const rsvpNo = this.createRsvpButton('No', 'red', event.id);
            const rsvpMaybe = this.createRsvpButton('Maybe', 'orange', event.id);

            rsvpSection.append(rsvpYes, rsvpNo, rsvpMaybe);

            // Add click functionality to expand/collapse details
            elem.addEventListener('click', () => {
                const isExpanded = additionalInfo.classList.contains('hidden');
                additionalInfo.classList.toggle('hidden', !isExpanded);
                elem.classList.toggle('expanded', isExpanded);
            });

            // Append all elements to the event container
            elem.append(eventHeader, eventTitle, eventImage, eventDetails, additionalInfo, rsvpSection);
            eventSectionElem.appendChild(elem);
        });

        // Append all elements to the container
        container.append(header, eventFormContainer, eventSectionElem, rsvpContainer);

        return container;
    }

    renderEvents(eventSectionElem) {
        if (!this.events || !Array.isArray(this.events)) {
            console.error('Events is not defined or not an array.');
            return;
        }
    
        eventSectionElem.innerHTML = ''; // Clear existing content
    
        this.events.forEach((event) => {
            const elem = document.createElement('div');
            elem.id = `event-${event.id}`;
            elem.className = 'eventContainer';
    
            const eventHeader = document.createElement('div');
            eventHeader.className = 'eventHeader';
            eventHeader.textContent = `${event.username} posted an event`;
    
            const eventTitle = document.createElement('h3');
            eventTitle.textContent = event.title;
    
            const eventImage = document.createElement('div');
            eventImage.className = 'eventImage';
            const image = document.createElement('img');
            image.src = event.cover.replace('./mockImages/', './static/event_images/');
            image.alt = event.title;
            eventImage.appendChild(image);
    
            const eventDetails = document.createElement('div');
            eventDetails.className = 'eventDetails';
    
            const description = document.createElement('p');
            description.innerHTML = `<strong>Description:</strong> ${event.desc}`;
            const category = document.createElement('p');
            category.innerHTML = `<strong>Category:</strong> ${event.category}`;
            const date = document.createElement('p');
            date.innerHTML = `<strong>When:</strong> ${event.date || 'TBD'}`;
            const location = document.createElement('p');
            location.innerHTML = `<strong>Where:</strong> ${event.where || 'TBD'}`;
    
            eventDetails.append(description, category, date, location);
    
            // RSVP Section
            const rsvpSection = document.createElement('div');
            rsvpSection.className = 'rsvpSection';
    
            const rsvpYes = this.createRsvpButton('Yes', 'green', event.id);
            const rsvpNo = this.createRsvpButton('No', 'red', event.id);
            const rsvpMaybe = this.createRsvpButton('Maybe', 'orange', event.id);
    
            rsvpSection.append(rsvpYes, rsvpNo, rsvpMaybe);
    
            // Append all components to the event container
            elem.append(eventHeader, eventTitle, eventImage, eventDetails, rsvpSection);
            eventSectionElem.appendChild(elem);
        });
    }

    filterEvents(keyword) {
        this.events = this.events.filter((event) => {
            return (
                event.title.toLowerCase().includes(keyword) ||
                event.desc.toLowerCase().includes(keyword) ||
                event.category.toLowerCase().includes(keyword) ||
                event.where.toLowerCase().includes(keyword)
            );
        });

        const eventSectionElem = document.getElementById('events');
        this.renderEvents(eventSectionElem);
    }
    

    sortEvents(option) {
        if (this.events && Array.isArray(this.events)) {
            if (option === 'date') {
                this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (option === 'location') {
                this.events.sort((a, b) => a.where.toLowerCase().localeCompare(b.where.toLowerCase()));
            } else if (option === 'category') {
                this.events.sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()));
            }
    
            // Re-render the sorted events
            const eventSectionElem = document.getElementById('events');
            this.renderEvents(eventSectionElem); // Re-render the sorted events
        } else {
            console.error('Events is not defined or not an array.');
        }
    }
    
    

    createRsvpButton(text, color, eventId) {
        const button = document.createElement('button');
        button.className = 'rsvpButton';
        button.textContent = text;
        button.style.backgroundColor = color;
        button.setAttribute('data-response', text.toLowerCase());
        button.setAttribute('data-event-id', eventId);

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            this.handleRsvp(event, color);
        });

        return button;
    }

    handleRsvp(event, color) {
        const button = event.target;
        const eventContainer = button.closest('.eventContainer');
        const eventId = button.getAttribute('data-event-id');
        const response = button.getAttribute('data-response');

        // Reset colors for all buttons
        const rsvpButtons = eventContainer.querySelectorAll('.rsvpButton');
        rsvpButtons.forEach((btn) => (btn.style.backgroundColor = ''));

        // Highlight the selected button
        button.style.backgroundColor = color;

        // If "Yes" is clicked, bring up the RSVP form
        if (response === 'yes') {
            const rsvpContainer = document.getElementById('rsvpContainer');
            const eventSectionElem = document.getElementById('events');
    
            rsvpContainer.innerHTML = ''; // Clear existing content
            rsvpContainer.classList.remove('hidden'); // Show the RSVP container
            eventSectionElem.classList.add('hidden'); // Hide the event list
    
            // Render the RSVP input form
            const rsvpForm = new RsvpInputInfo((rsvpDetails) => {
                console.log('RSVP Details Submitted:', rsvpDetails);
    
                // Render the RSVP details after submission
                this.showRsvpDetails(rsvpDetails);
            });
            rsvpContainer.appendChild(rsvpForm.render());
        }
    }

    toggleEventForm(button, eventSectionElem, eventFormContainer) {
        this.isCreatingEvent = !this.isCreatingEvent; // Toggle the state

        if (this.isCreatingEvent) {
            // Show the event form and hide the event list
            eventFormContainer.innerHTML = '';
            const eventForm = new EventForm();
            eventFormContainer.appendChild(eventForm.render());
            eventFormContainer.classList.remove('hidden');
            eventSectionElem.classList.add('hidden');

            button.textContent = 'Back to Browse Events';
        } else {
            // Show the event list and hide the event form
            eventFormContainer.classList.add('hidden');
            eventSectionElem.classList.remove('hidden');

            button.textContent = 'Create Event';
        }
    }

    showRsvpDetails(rsvpDetails) {
        const rsvpContainer = document.getElementById('rsvpContainer');
        rsvpContainer.innerHTML = ''; // Clear the RSVP form
    
        // Render the RSVP details
        const rsvpDetailsPage = new RsvpDetails(rsvpDetails);
        rsvpContainer.appendChild(rsvpDetailsPage.render());
    }
}
