import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/EventNames.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class ViewFollowers extends BaseComponent {
    constructor(userName, isFollowers) {
        super();
        this.userName = userName; // The name of the user
        this.isFollowers = isFollowers; // Boolean flag to determine if we show followers or following
        const hub = EventHub.getInstance();
        hub.subscribe(Events.getUserFollowersSuccess);
        hub.subscribe(Events.getUserFollowingSuccess);
        if (isFollowers){
            hub.publish(Events.getUserFollowers, this.username);
        } else {
            hub.publish(Events.getUserFollowing, this.username);
        }
        this.data = [];
        this.loadCSS('ViewFollowers'); // Load the corresponding CSS
    }

    setFollowers(data){
        this.data = data;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'view-follows-container';

        // Header with back button and title
        const header = document.createElement('div');
        header.className = 'header';

        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = 'Back';
        backButton.addEventListener('click', () => {
            if (typeof this.goBack === 'function') {
                this.goBack();
            }
        });
    
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = this.isFollowers ? 'Followers' : 'Following';

        header.appendChild(backButton);
        header.appendChild(title);

        // List of followers or following
        const listContainer = document.createElement('div');
        listContainer.className = 'list-container';

        this.data.forEach(person => {
            const personCard = document.createElement('div');
            personCard.className = 'person-card';

            personCard.innerHTML = `
                <img src="${person.profileImage}" alt="${person.name}'s profile picture" class="profile-picture" />
                <div class="person-name">${person.name}</div>
            `;

            // Add click listener to navigate to the selected person's profile
            personCard.addEventListener('click', () => {
                if (typeof this.viewProfile === 'function') {
                    this.viewProfile(person); // Pass the clicked person's data
                }
            });
    
            listContainer.appendChild(personCard);
        });

        container.appendChild(header);
        container.appendChild(listContainer);

        return container;
    }

    goBack() {
        if (typeof this.goBack === 'function') {
            this.goBack(); // Call the parent's renderProfile method
        }
    }
}