import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class RsvpInputInfo extends BaseComponent {
  constructor(onSubmitCallback) {
    super();
    this.onSubmitCallback = onSubmitCallback; // Callback function to handle form submission and put it into the rsvpDetails
    if (this.cssLoaded) return; // if CSS isn't loaded yet, load it
      this.loadCSS('RsvpInputInfo'); 
  }

  render() {
    // Main container for the entire RSVP form
    const container = document.createElement('div');
    container.classList.add('rsvp-container');

    //backButton
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Events';
    backButton.classList.add('buttons', 'back-button'); // Apply button styling
    backButton.addEventListener('click', () => {
      const rsvpContainer = document.getElementById('rsvpContainer');
      const eventSectionElem = document.getElementById('events');
    
      rsvpContainer.classList.add('hidden'); // Hide the RSVP container
      eventSectionElem.classList.remove('hidden'); // Show the events list
    });
    container.appendChild(backButton);


    // Header of the page displaying the event name
    const header = document.createElement('h1');
    header.classList.add('title', 'rsvp-title'); // Apply relevant styles
    header.textContent = 'RSVP to Event Name'; // TODO: Replace 'Event Name' dynamically
    container.appendChild(header);

    // Section for entering the user's name
    const nameSectionContainer = document.createElement('div');
    nameSectionContainer.classList.add('container');

    // Subtitle for the "Your Name" section
    const nameTitle = document.createElement('h2');
    nameTitle.classList.add('title'); // Apply subtitle styling
    nameTitle.textContent = 'Your Name'; // Display the subtitle
    nameSectionContainer.appendChild(nameTitle);

    // Input field for the user's name
    const nameInput = document.createElement('input');
    nameInput.type = 'text'; // Define input type
    nameInput.classList.add('input-boxes'); // Apply consistent input styling
    nameInput.placeholder = 'Enter your name'; // Placeholder text for the input
    nameInput.setAttribute('aria-label', 'Your Name'); // Accessibility label
    nameSectionContainer.appendChild(nameInput);

    container.appendChild(nameSectionContainer); // Add the name section to the main container

    // Section for dietary restrictions
    const restrictionsContainer = document.createElement('div');
    restrictionsContainer.classList.add('container');

    // Title for the "Dietary Restrictions" section
    const restrictionsTitle = document.createElement('h2');
    restrictionsTitle.classList.add('title');
    restrictionsTitle.textContent = 'Dietary Restrictions';
    restrictionsContainer.appendChild(restrictionsTitle);

    // Form to hold dietary restriction inputs
    const form = document.createElement('form');
    restrictionsContainer.appendChild(form);

    // Function to create a new row for dietary restrictions
    const createRestrictionRow = () => {
      const restrictionRow = document.createElement('div');
      restrictionRow.classList.add('restriction-row'); // Styling for restriction rows

      // Dropdown menu for the type of dietary restriction
      const select = document.createElement('select');
      select.classList.add('input-boxes', 'type-selection'); // Apply input styles
      select.innerHTML = `
        <option value="">Select Type</option>
        <option value="Food">Food</option>
        <option value="Skin">Skin</option>
        <option value="Pet">Pet</option>
        <option value="Other">Other</option>
      `;
      restrictionRow.appendChild(select);

      // Input for the description of the restriction
      const descriptionInput = document.createElement('input');
      descriptionInput.type = 'text';
      descriptionInput.classList.add('input-boxes', 'description-input'); // Apply input styles
      descriptionInput.placeholder = 'Description'; // Placeholder text
      descriptionInput.setAttribute('aria-label', 'Description'); // Accessibility label
      restrictionRow.appendChild(descriptionInput);

      return restrictionRow; // Return the created row
    };

    // Add the first restriction row by default
    const initialRestrictionRow = createRestrictionRow();
    form.appendChild(initialRestrictionRow);

    // Button to add more dietary restriction rows
    const addRestrictionBtn = document.createElement('button');
    addRestrictionBtn.type = 'button'; // Prevent form submission
    addRestrictionBtn.classList.add('buttons'); // Apply button styling
    addRestrictionBtn.textContent = 'Add Restriction'; // Button label

    // Add functionality to dynamically add more restriction rows
    addRestrictionBtn.addEventListener('click', () => {
      const newRestrictionRow = createRestrictionRow(); // Create a new row
      form.appendChild(newRestrictionRow); // Append it to the form
    });

    restrictionsContainer.appendChild(addRestrictionBtn); // Add the button to the section

    // Section for accessibility needs
    const accessibilityTitle = document.createElement('h2');
    accessibilityTitle.classList.add('title');
    accessibilityTitle.textContent = 'Accessibility Needs'; // Section title
    restrictionsContainer.appendChild(accessibilityTitle);

    const accessibilityInputContainer = document.createElement('div');
    accessibilityInputContainer.classList.add('container'); // Styling container

    // Textarea for entering accessibility needs
    const accessibilityInput = document.createElement('textarea');
    accessibilityInput.classList.add('input-boxes', 'accessibility-input'); // Apply input styles
    accessibilityInput.placeholder = 'Describe Here'; // Placeholder text
    accessibilityInput.setAttribute('aria-label', 'Describe accessibility needs'); // Accessibility label
    accessibilityInputContainer.appendChild(accessibilityInput);

    restrictionsContainer.appendChild(accessibilityInputContainer); // Add to restrictions section

    container.appendChild(restrictionsContainer); // Add the restrictions section to the main container

    // Button to review the entered information
    const reviewButton = document.createElement('button');
    reviewButton.classList.add('buttons', 'review-button'); // Apply button styling
    reviewButton.textContent = 'Review'; // Button label

    // Event listener to handle the review action
    reviewButton.addEventListener('click', () => {
      const dietaryRestrictions = [];

      // Gather information from all restriction rows
      form.querySelectorAll('.restriction-row').forEach(row => {
        const type = row.querySelector('.type-selection').value; // Get selected type
        const description = row.querySelector('.description-input').value; // Get description
        if (type || description) {
          dietaryRestrictions.push({ type, description }); // Add to the list if valid
        }
      });

      const userName = nameInput.value; // Get the entered name
      const accessibilityNeeds = accessibilityInput.value; // Get accessibility needs

      // Call the provided callback with the collected information
      this.onSubmitCallback({ userName, dietaryRestrictions, accessibilityNeeds });
    });

    container.appendChild(reviewButton); // Add the review button to the main container

    return container; // Return the completed form container
  }
}
