import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { RsvpInputInfo } from '../RsvpInputInfo/RsvpInputInfo.js';
import { RsvpDetails } from '../RsvpDetails/RsvpDetails.js';
import MockEvents from '../Events/mockEvents.js';

export class OtherProfile extends BaseComponent {
    constructor(user) {
        super();
        this.user = user; // Take in the User 
        this.loadCSS('OtherProfile'); // Load the CSS file for styling this component
        this.isRsvpMode = false; // State to track if RSVP mode is active
    }

    // Renders the profile and events UI
    render() {
        const profileContainer = document.createElement('div'); // Main container for the profile
        profileContainer.className = 'profile-screen';

        // Create the user info section (e.g., profile picture, username, followers & following, bio, follow button)
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <img src="${this.user.profileImage}" alt="${this.user.username}'s profile picture" class="profile-image" />
            <div class="username">${this.user.username}</div>
            <div class="user-stats">
                <span class="followers">${this.user.followers} Followers</span>
                <span class="following">${this.user.following} Following</span>
            </div>
            <div class="user-bio">${this.user.bio || ''}</div> <!-- Bio Section -->
        `;

        // Create a "Follow" button 
        const followButton = document.createElement('button');
        followButton.className = 'follow-button';
        followButton.textContent = 'Follow';

        // Attach an event listener to toggle between follow/unfollow states
        followButton.addEventListener('click', () => this.toggleFollow(followButton));

        userInfo.appendChild(followButton); // Append the button to the user info section

        // Create the events container to display events
        const eventsContainer = this.createEventsContainer();

        // Append the user info and events container to the profile container
        profileContainer.appendChild(userInfo);
        profileContainer.appendChild(eventsContainer);

        return profileContainer; // Return the complete profile UI
    }

    // Toggles the follow/unfollow button state
    toggleFollow(button) {
        if (button.textContent === 'Follow') {
            // Change to "Unfollow" state
            button.textContent = 'Unfollow';
            button.classList.add('unfollow-button');
        } else {
            // Change back to "Follow" state
            button.textContent = 'Follow';
            button.classList.remove('unfollow-button');
        }
    }
    
    // Creates the container for displaying events and RSVP functionality
    createEventsContainer() {
        const container = document.createElement('section'); // Main container for events
        container.className = 'events-container';

        // Container for the list of events
        const eventSectionElem = document.createElement('div');
        eventSectionElem.id = 'events';

        // RSVP container for rendering RSVP forms or details (hidden by default)
        const rsvpContainer = document.createElement('div');
        rsvpContainer.id = 'rsvpContainer';

        // Loop through MockEvents to dynamically create event elements
        MockEvents.forEach((event) => {
            const elem = document.createElement('div');
            elem.id = `event-${event.id}`; // Unique ID for each event
            elem.className = 'eventContainer';

            // Add event details (title, image, description, etc.)
            elem.innerHTML = `
                <h3>${event.title}</h3>
                <div class="eventImage"><img src="${event.cover.replace('./mockImages/', './static/event_images/')}" alt="${event.title}"/></div>
                <div class="eventDetails">
                    <p><strong>Description:</strong> ${event.desc}</p>
                    <p><strong>Category:</strong> ${event.category}</p>
                    <p><strong>When:</strong> ${event.date}</p>
                </div>
            `;

            // Add an RSVP button for each event
            const rsvpButton = document.createElement('button');
            rsvpButton.textContent = 'RSVP';
            rsvpButton.classList.add('rsvp-button');
            rsvpButton.addEventListener('click', () => this.showRsvpInput(rsvpContainer, eventSectionElem));

            elem.appendChild(rsvpButton); // Append the RSVP button to the event element
            eventSectionElem.appendChild(elem); // Append the event element to the event section
        });

        // Append the different parts
        container.appendChild(eventSectionElem);
        container.appendChild(rsvpContainer);

        return container; // Return the events container
    }

    // Displays the RSVP input form for a specific event
    showRsvpInput(rsvpContainer, eventSectionElem) {
        rsvpContainer.classList.add('active'); // Activate the RSVP container

        // Clear previous content and render a new RSVP input form
        const rsvpInput = new RsvpInputInfo((details) => this.showRsvpDetails(details, rsvpContainer));
        rsvpContainer.innerHTML = ''; // Clear the container
        rsvpContainer.appendChild(rsvpInput.render()); // Add the new form

        // Hide the event list while showing the RSVP form - otherwise the events will show instead
        eventSectionElem.classList.add('hidden');
    }

    // Displays the RSVP details after the user submits the RSVP form
    showRsvpDetails(details, rsvpContainer) {
        const rsvpDetails = new RsvpDetails(details, () => this.closeRsvp(rsvpContainer)); // Create RSVP details view
        rsvpContainer.innerHTML = ''; // Clear the container
        rsvpContainer.appendChild(rsvpDetails.render()); // Add the RSVP details view
    }
    
    // Closes the RSVP view and restores the event list
    closeRsvp(rsvpContainer) {
        rsvpContainer.classList.remove('active'); // Remove the active and make it back to the event list
        rsvpContainer.classList.add('hidden'); // Hide the RSVP container
        document.getElementById('events').classList.remove('hidden'); // Makes it so events can be seen again
    }
}
