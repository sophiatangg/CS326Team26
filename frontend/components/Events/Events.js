import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventForm } from '../EventForm/EventForm.js';
import { RsvpInputInfo } from '../RsvpInputInfo/RsvpInputInfo.js';
import { RsvpDetails } from '../RsvpDetails/RsvpDetails.js';

export class Events extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Events');
        this.isCreatingEvent = false; // State to track if we're in "create event" mode
        this.isRsvpMode = false; // State to track if we're in RSVP mode
        this.events = []; // Initialize as empty array
        this.filteredEvents = []; // Initialize filtered events as empty
        this.fetchEvents(); // Fetch events on initialization
    }

    async fetchEvents() {
        try {
            const response = await fetch('http://localhost:5050/api/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const events = await response.json();
            this.events = events;
            this.filteredEvents = [...events]; // Initialize filtered events with fetched data
            const eventSectionElem = document.getElementById('events');
            if (eventSectionElem) this.renderEvents(eventSectionElem, this.filteredEvents); // Re-render events if container exists
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    render() {
        const container = document.createElement('section');
        container.id = 'events-view';

        // Header with title and "Create Event" button
        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('h2');
        title.textContent = 'Events';

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Create Event';
        toggleButton.classList.add('toggle-button');

        // Container for sort and search controls
        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('controls-container');

        // Sorting Controls
        const sortContainer = document.createElement('div');
        sortContainer.classList.add('sort-container');

        const sortLabel = document.createElement('label');
        sortLabel.setAttribute('for', 'sortOptions');
        sortLabel.textContent = 'Sort Events: ';

        const sortDropdown = document.createElement('select');
        sortDropdown.id = 'sortOptions';
        const options = ['date', 'location', 'category'];
        options.forEach((o) => {
            const opt = document.createElement('option');
            opt.value = o;
            opt.textContent = `By ${o.charAt(0).toUpperCase() + o.slice(1)}`;
            sortDropdown.appendChild(opt);
        });

        const sortButton = document.createElement('button');
        sortButton.textContent = 'Apply Sort';
        sortButton.classList.add('sort-events-button');
        sortButton.addEventListener('click', () => {
            const sortOption = sortDropdown.value;
            this.sortEvents(sortOption);
        });

        sortContainer.appendChild(sortLabel);
        sortContainer.appendChild(sortDropdown);
        sortContainer.appendChild(sortButton);

        // Search/Filter Controls
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('filter-container');

        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', 'filterInput');
        filterLabel.textContent = 'Search by Keyword: ';

        const filterInput = document.createElement('input');
        filterInput.type = 'text';
        filterInput.placeholder = 'Type keyword...';
        filterInput.id = 'filterInput';

        const filterButton = document.createElement('button');
        filterButton.textContent = 'Filter';
        filterButton.classList.add('filter-events-button');
        filterButton.addEventListener('click', () => {
            const keyword = filterInput.value.trim().toLowerCase();
            this.filterEvents(keyword);
        });

        filterContainer.appendChild(filterLabel);
        filterContainer.appendChild(filterInput);
        filterContainer.appendChild(filterButton);

        controlsContainer.appendChild(sortContainer);
        controlsContainer.appendChild(filterContainer);

        // Append elements to the header
        header.appendChild(title);
        header.appendChild(toggleButton);

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

        // Append all elements to the container
        container.append(header, controlsContainer, eventFormContainer, eventSectionElem, rsvpContainer);

        // Add toggle event listener after elements are appended
        toggleButton.addEventListener('click', () => this.toggleEventForm(toggleButton, eventSectionElem, eventFormContainer, controlsContainer));

        return container;
    }

    renderEvents(eventSectionElem, eventsList) {
        if (!eventsList || !Array.isArray(eventsList)) {
            console.error('Invalid events list provided.');
            return;
        }

        eventSectionElem.innerHTML = ''; // Clear existing content

        eventsList.forEach((event) => {
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
            image.src = event.cover_image || '/static/event_images/default.jpg';
            image.alt = event.title;
            eventImage.appendChild(image);

            const eventDetails = document.createElement('div');
            eventDetails.className = 'eventDetails';

            const description = document.createElement('p');
            description.innerHTML = `<strong>Description:</strong> ${event.description}`;
            const category = document.createElement('p');
            category.innerHTML = `<strong>Category:</strong> ${event.category}`;
            const date = document.createElement('p');
            date.innerHTML = `<strong>When:</strong> ${new Date(event.start_time).toLocaleString()} - ${new Date(event.end_time).toLocaleString()}`;
            const location = document.createElement('p');
            location.innerHTML = `<strong>Where:</strong> ${event.location}`;

            eventDetails.append(description, category, date, location);

            const rsvpSection = document.createElement('div');
            rsvpSection.className = 'rsvpSection';

            const rsvpYes = this.createRsvpButton('Yes', 'green', event.id);
            const rsvpNo = this.createRsvpButton('No', 'red', event.id);
            const rsvpMaybe = this.createRsvpButton('Maybe', 'orange', event.id);

            rsvpSection.append(rsvpYes, rsvpNo, rsvpMaybe);

            elem.append(eventHeader, eventTitle, eventImage, eventDetails, rsvpSection);
            eventSectionElem.appendChild(elem);
        });
    }

    filterEvents(keyword) {
        if (!keyword) {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter((event) => {
                return (
                    event.title.toLowerCase().includes(keyword) ||
                    event.description.toLowerCase().includes(keyword) ||
                    event.category.toLowerCase().includes(keyword) ||
                    event.location.toLowerCase().includes(keyword)
                );
            });
        }

        const eventSectionElem = document.getElementById('events');
        this.renderEvents(eventSectionElem, this.filteredEvents);
    }

    sortEvents(option) {
        if (this.filteredEvents && Array.isArray(this.filteredEvents)) {
            if (option === 'date') {
                this.filteredEvents.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
            } else if (option === 'location') {
                this.filteredEvents.sort((a, b) => a.location.toLowerCase().localeCompare(b.location.toLowerCase()));
            } else if (option === 'category') {
                this.filteredEvents.sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()));
            }

            const eventSectionElem = document.getElementById('events');
            this.renderEvents(eventSectionElem, this.filteredEvents);
        } else {
            console.error('Filtered events is not defined or not an array.');
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

        const rsvpButtons = eventContainer.querySelectorAll('.rsvpButton');
        rsvpButtons.forEach((btn) => (btn.style.backgroundColor = ''));

        button.style.backgroundColor = color;

        if (response === 'yes') {
            const rsvpContainer = document.getElementById('rsvpContainer');
            const eventSectionElem = document.getElementById('events');

            rsvpContainer.innerHTML = '';
            rsvpContainer.classList.remove('hidden');
            eventSectionElem.classList.add('hidden');

            const rsvpForm = new RsvpInputInfo((rsvpDetails) => {
                console.log('RSVP Details Submitted:', rsvpDetails);
                this.showRsvpDetails(rsvpDetails);
            });
            rsvpContainer.appendChild(rsvpForm.render());
        }
    }

    toggleEventForm(button, eventSectionElem, eventFormContainer, controlsContainer) {
        this.isCreatingEvent = !this.isCreatingEvent;

        if (this.isCreatingEvent) {
            eventFormContainer.innerHTML = '';
            const eventForm = new EventForm();
            eventFormContainer.appendChild(eventForm.render());
            eventFormContainer.classList.remove('hidden');
            eventSectionElem.classList.add('hidden');
            controlsContainer.classList.add('hidden');

            button.textContent = 'Back to Browse Events';
        } else {
            eventFormContainer.classList.add('hidden');
            eventSectionElem.classList.remove('hidden');
            controlsContainer.classList.remove('hidden');

            button.textContent = 'Create Event';
        }
    }

    showRsvpDetails(rsvpDetails) {
        const rsvpContainer = document.getElementById('rsvpContainer');
        rsvpContainer.innerHTML = '';

        const rsvpDetailsPage = new RsvpDetails(rsvpDetails);
        rsvpContainer.appendChild(rsvpDetailsPage.render());
    }
}
