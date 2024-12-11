import { EventHub } from '../../eventhub/EventHub.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/EventNames.js';
import { ViewFollowers } from '../ViewFollowers/ViewFollowers.js';
import { OtherProfile } from '../OtherProfile/OtherProfile.js';
import { ServiceFactory } from '../../services/ServiceFactory.js';

export class Profile extends BaseComponent {
    #container = null;
    #user = {}; 
    #loggedin = false;
    #token = null;

    constructor() {
        super();      
        this.loadCSS('Profile');
        // const hub = EventHub.getInstance();
        // hub.subscribe(Events.LoadProfileInfoFailure, (message) => this.#userNotLoggedInError(message));
    }

    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();   
        this.#attachEventListeners();
        //const userRepository = ServiceFactory.get('local'); // create storage
        return this.#container;
    }

    #setLogin(isLoggedIn){
        this.#loggedin = isLoggedIn;
    }


    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('section');
        this.#container.id = 'profile';
        this.#container.className = 'profile-screen';
        const header = document.createElement('div');
        header.classList.add('top-of-page');

        const profile_info = document.createElement('div');
        header.classList.add('profile-info');

        profile_info.innerHTML = `
            <img src="${this.#user.profile_picture || './static/images/logo.png'}" id="picture" alt="Profile Picture">
            <h2 id="username">${this.#user.username || 'Your username'}</h2>
            <div class="follows">
                <span>
                    <button class="followers">${this.#user.Followers? this.#user.Followers.length: '0'} Followers</button>
                    <button class="following">${this.#user.Following? this.#user.Following.length: '0'} Following</button>
                </span>
            </div>
            <p id="userbio">${this.#user.bio || 'No bio available.'}</p>
            <button class="edit-profile">Edit Profile</button>
        `;
        header.appendChild(profile_info);

        const option = document.createElement('div');
        option.classList.add('options');
        option.innerHTML = `
            <button class="post">Posts</button>
            <button class="rsvp">RSVP History</button>
        `;
        
        this.#container.appendChild(header);
        this.#container.appendChild(option);
      }

    #openEditModal(containerId) {
        this.#createEditModal(containerId,"unique");
    }

    #createEditModal(containerId, modalId) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.id = modalId;

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const closeModalButton = document.createElement('button');
        closeModalButton.textContent = 'x';
        closeModalButton.classList.add('close-btn');
        // remove modal when clicking on close
        closeModalButton.addEventListener('click', () => this.#closeModal(modalId));
        
        modal.innerHTML = `
            <div class= "profilepic">
                <img src="./static/images/logo.png" id = "pic" alt="Profile Picture">
            </div>
            <label class= "edit-picture" for ="pfp">Edit Picture</label>
            <input type="file" id="pfp" style="display:none" accept="image/png, image/jpg, image/jpeg"/>
            <form>
                <label>Username</label>
                <input type="text" id="UsernameInput" placeholder="Username">
                <label>Bio</label>
                <input type="text" id="BioInput" placeholder="Bio">
            </form>
            <button class= "done-btn">Done</button>
        `
        modal.appendChild(closeModalButton);
        modalOverlay.appendChild(modal);

        document.getElementById(containerId).appendChild(modalOverlay);
        const input = document.getElementById("pfp");
        input.onchange = ()=>{
          document.getElementById("pic").src = URL.createObjectURL(input.files[0]);
        }
      }

    #closeModal(modalId) {
        const modalOverlay = document.getElementById(modalId);
        if (modalOverlay) {
          modalOverlay.remove();
        }
    };
      
    #attachEventListeners() {
        const hub = EventHub.getInstance();

        hub.subscribe(Events.StoreProfileInfo, (data) => this.#updateProfileInfo(data));
        hub.subscribe(Events.LoadProfileInfoSuccess, (user)=> {
            console.log("here");
            // get here
            this.#user = user;
            this.#renderProfile();
        });
        if (!this.#loggedin){
            hub.publish(Events.LoadProfileInfo);
            this.#setLogin(true);
        }
        // hub.subscribe(Events.isLoggedIn,(token)=> this.#setLogin(token));
        hub.subscribe(Events.LoadProfileInfoFailure, (message) => this.#userNotLoggedInError(message));
        hub.subscribe(Events.UpdateProfileInfoFailure, (message) => this.#userNotLoggedInError(message));
        // hub.publish(Events.LoadProfileInfo);

        // Attach event listeners to the input and button elements
        this.#container.addEventListener('click', (event) =>{
            if (event.target.matches(".edit-profile")){
                // if (this.#loggedin)
                    this.#openEditModal(this.#container.id);
            }
            if (event.target.matches(".done-btn")){
                const usernameInput = document.getElementById('UsernameInput');
                const bioInput = document.getElementById('BioInput');
                const chosenpfp = document.getElementById('pic');
                this.#handleProfileEdit(usernameInput,bioInput,chosenpfp);
            }            
            // Handle "Followers" button click
            if (event.target.matches('.followers')) {
                if (this.#loggedin)
                    this.#viewFollows(true); 
            }
            // Handle "Following" button click
            if (event.target.matches('.following')) {
                if (this.#loggedin)
                    this.#viewFollows(false); 
            }
        })
    }

    #userNotLoggedInError(message){
        const error_message = document.createElement('p');
        error_message.className = "loginerror";
        error_message.innerHTML = message;
        this.#container.appendChild(error_message);
    }

    #handleProfileEdit(name, bio, chosenpfp){
        const usrname = name.value;
        const bioinfo = bio.value;
        const file = chosenpfp.src;

        if (!name.value) {
            alert('Please enter a username.');
            return;   
        }

        this.#publishNewUser(usrname, bioinfo, file);

        // Clear inputs
        this.#clearInputs(name, bio);
        this.#closeModal("unique");
    }

    #publishNewUser(name, bio, pfp){
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreProfileInfo, {username: name, bio: bio, profile_picture: pfp})

    }

    #clearInputs(name, bio) {
        name.value = '';
        bio.value = '';
    }

    #updateProfileInfo(profileinfo){
        document.getElementById("picture").src = profileinfo.profile_picture;
        document.getElementById("username").textContent = profileinfo.username;
        document.getElementById("userbio").textContent = profileinfo.bio;
    }

    //taken from OtherProfile.js
    #viewFollows(isFollowers) {
        // Create a new instance of ViewFollowers
        const viewFollowers = new ViewFollowers(this.#user.username, isFollowers);
    
        // Attach the goBack callback to return to the profile view
        viewFollowers.goBack = () => this.#renderProfile();
        viewFollowers.viewProfile = (person) => this.#switchToProfile(person, viewFollowers);

        // Render the ViewFollowers page inside the container
        const profileContainer = document.querySelector('.profile-screen');
        profileContainer.innerHTML = '';
        profileContainer.appendChild(viewFollowers.render());
    }

    #switchToProfile(person, previousPage) {
        //Create a new instance of the calss so that when it is passed through. 
        //need to make it adaptable to take in their followers/Followings but it at least
        //toggles through right now
        const otherProfile = new OtherProfile(
            {
                username: person.name,
                profileImage: person.profile_picture,
                followers: Math.floor(Math.random() * 500),
                following: Math.floor(Math.random() * 500), 
                bio: 'This is a bio of ' + person.name 
            },
            previousPage // Pass the ViewFollowers page as the previousPage
        );

        const profileContainer = document.querySelector('.profile-screen');
        profileContainer.innerHTML = '';
        profileContainer.appendChild(otherProfile.render());
    }
    
    #renderProfile() {
        console.log('Current container:', this.#container);
        console.log('Appending new profile content...');
    
        this.#container.innerHTML = ''; 
        this.#createContainer(); 
        this.#attachEventListeners(); 
    
        const viewContainer = document.getElementById('viewContainer');
        if (!viewContainer.contains(this.#container)) {
            console.log('Appending the profile container to the viewContainer.');
            viewContainer.innerHTML = ''; // Clear previous content in viewContainer
            viewContainer.appendChild(this.#container); // Make sure this current container is attached in the correct spot
        }

    }

}
