import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class RsvpDetails extends BaseComponent {
  constructor(details) {
    super();
    this.details = details; // Expecting `details` to contain name, dietaryRestrictions, and accessibilityNeeds
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
      this.details.dietaryRestrictions.forEach(restriction => {
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
      const response = await fetch('http://localhost:5050/api/rsvp', {
        method: 'POST', // Ensure POST is used
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rsvp_id: Math.random()*100 , 
          user_id: 1, // [TODO]: Replace with actual user ID
          event_id: 1, //[TODO]: Replace with actual event ID
          response: 'yes', // Assume user clicked "Yes"
          dietary_restrictions: this.details.dietaryRestrictions || [],
          accessibility_needs: this.details.accessibilityNeeds || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save RSVP2');
      }

      const result = await response.json();
      console.log('RSVP successfully saved:', result);
      alert('Your RSVP has been confirmed!');
    } catch (error) {
      console.error('Error confirming RSVP:', error);
      alert('Failed to confirm RSVP. Please try again later.');
    }
  }

}
