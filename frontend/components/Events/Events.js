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

        // RSVP container for rendering RSVP form or details
        const rsvpContainer = document.createElement('div');
        rsvpContainer.id = 'rsvpContainer';
        rsvpContainer.classList.add('hidden');

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

                <div class="additionalInfo">
                <div><strong> Catergory:</strong> ${event.category}</div>
                <div><strong> Time:</strong> ${event.time}</div>
                <div><strong> Where:</strong> ${event.where}</div>

                <div class="rsvpSection">
                    <h4>RSVP:</h4>
                    <button class="rsvpButton" data-response="yes" data-event-id="${event.id}">Yes</button>
                    <button class="rsvpButton" data-response="no" data-event-id="${event.id}">No</button>
                    <button class="rsvpButton" data-response="maybe" data-event-id="${event.id}">Maybe</button>
                </div>
                <div class="rsvpCount" id="rsvp-count-${event.id}"></div>
    
            </div>

            
        `;
        const additionalInfo = elem.querySelector(".additionalInfo");
        additionalInfo.style.display = "none";

        // Add click event listener to toggle the expanded state
        elem.addEventListener("click", () => {
            elem.classList.toggle("expanded");
            additionalInfo.style.display = elem.classList.contains("expanded") ? "block" : "none";
        });

        const rsvpButtons = elem.querySelectorAll('.rsvpButton');
            rsvpButtons.forEach((button) => {
            button.addEventListener('click', (event) => this.rsvpButton(event));
        });

            // Add RSVP button to each event
            const rsvpButton = document.createElement('button');
            rsvpButton.textContent = 'RSVP';
            rsvpButton.classList.add('rsvp-button');
            rsvpButton.addEventListener('click', () => this.showRsvpInput(rsvpContainer, eventSectionElem, eventFormContainer));

            elem.appendChild(rsvpButton);
            eventSectionElem.appendChild(elem);
        });

        // Append all elements to the container
        container.appendChild(header);
        container.appendChild(eventFormContainer);
        container.appendChild(eventSectionElem);
        container.appendChild(rsvpContainer);

        return container;
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

    rsvpButton(event){
        //stop on click function for enlarge 
        event.stopPropagation();
        const button = event.target;
        //get the button clicked
        const response= button.getAttribute('data-response');
        //get the specific event for the DB
        const eventID = button.getAttribute('data-event-id');
        const eventContainer = button.closest('.eventContainer');
         
        const rsvpButtons = eventContainer.querySelectorAll('.rsvpButton');
        rsvpButtons.forEach((btn) => {
            btn.style.backgroundColor = ''; 
        });

        if (response ==='yes'){
            button.style.backgroundColor='green';
        } else if (response === 'no') {
            button.style.backgroundColor = 'red';
        } else if (response === 'maybe') {
            button.style.backgroundColor = 'orange';
        }

        //call function to update indexedDB
    }

    showRsvpInput(rsvpContainer, eventSectionElem, eventFormContainer) {
        this.isRsvpMode = !this.isRsvpMode; // Toggle RSVP mode

        if (this.isRsvpMode) {
            // Hide other sections and show RSVP input form
            eventSectionElem.classList.add('hidden');
            eventFormContainer.classList.add('hidden');

            // Create RSVP input form with callback for review
            const rsvpInput = new RsvpInputInfo((details) => this.showRsvpDetails(details, rsvpContainer));
            rsvpContainer.innerHTML = '';
            rsvpContainer.appendChild(rsvpInput.render());
            rsvpContainer.classList.remove('hidden');
        } else {
            // Show the event list and hide the RSVP form
            rsvpContainer.classList.add('hidden');
            eventSectionElem.classList.remove('hidden');
        }
    }

    showRsvpDetails(details, rsvpContainer) {
        // Display RSVP details confirmation
        const rsvpDetails = new RsvpDetails(details);
        rsvpContainer.innerHTML = '';
        rsvpContainer.appendChild(rsvpDetails.render());
    }
}
