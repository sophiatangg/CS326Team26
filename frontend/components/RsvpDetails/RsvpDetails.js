import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class RsvpDetails extends BaseComponent {
  constructor(details) {
    super();
    this.details = details; // Expecting `details` to contain userName, eventId, dietaryRestrictions, and accessibilityNeeds
    this.loadCSS('RsvpDetails');
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('rsvp-container');

    const header = document.createElement('h1');
    header.textContent = 'Confirm Your RSVP';
    container.appendChild(header);

    // Display name
    const nameInfo = document.createElement('p');
    nameInfo.textContent = `Name: ${this.details.userName || 'N/A'}`;
    container.appendChild(nameInfo);

    // Display dietary restrictions
    const dietaryInfo = document.createElement('div');
    const dietaryTitle = document.createElement('h2');
    dietaryTitle.textContent = 'Dietary Restrictions:';
    dietaryInfo.appendChild(dietaryTitle);

    if (this.details.dietaryRestrictions && this.details.dietaryRestrictions.length > 0) {
      const list = document.createElement('ul');
      this.details.dietaryRestrictions.forEach((restriction) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Type: ${restriction.type || 'N/A'}, Description: ${restriction.description || 'N/A'}`;
        list.appendChild(listItem);
      });
      dietaryInfo.appendChild(list);
    } else {
      const noDietaryInfo = document.createElement('p');
      noDietaryInfo.textContent = 'None';
      dietaryInfo.appendChild(noDietaryInfo);
    }
    container.appendChild(dietaryInfo);

    // Display accessibility needs
    const accessibilityInfo = document.createElement('div');
    const accessibilityTitle = document.createElement('h2');
    accessibilityTitle.textContent = 'Accessibility Needs:';
    accessibilityInfo.appendChild(accessibilityTitle);

    const accessibilityDetails = document.createElement('p');
    accessibilityDetails.textContent = this.details.accessibilityNeeds || 'None';
    accessibilityInfo.appendChild(accessibilityDetails);

    container.appendChild(accessibilityInfo);

    // Confirm RSVP button
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm RSVP';
    confirmButton.classList.add('rsvp-button');
    confirmButton.addEventListener('click', () => this.confirmRSVP());

    container.appendChild(confirmButton);

    return container;
  }

  async confirmRSVP() {
    try {
      const rsvpId = this.generateRsvpId();
      const userId = this.getUserId(); // Replace with actual logic for getting the user ID
      const eventId = this.details.eventId || 1; // Use event ID passed in details

      const response = await fetch('http://localhost:5050/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rsvp_id: rsvpId,
          user_id: userId,
          event_id: eventId,
          response: 'yes', // Assume user clicked "Yes"
          dietary_restrictions: this.details.dietaryRestrictions || [],
          accessibility_needs: this.details.accessibilityNeeds || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save RSVP');
      }

      const result = await response.json();
      console.log('RSVP successfully saved:', result);
      alert('Your RSVP has been confirmed!');
    } catch (error) {
      console.error('Error confirming RSVP:', error);
      alert('Failed to confirm RSVP. Please try again later.');
    }
  }

  generateRsvpId() {
    // Generate a unique RSVP ID
    return `RSVP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  getUserId() {
    // Placeholder for user ID retrieval logic
    // Replace with logic to fetch the actual logged-in user's ID
    return 1; // Dummy user ID
  }
}
