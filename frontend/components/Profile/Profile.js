import { EventHub } from '../../eventhub/EventHub.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { Events } from '../../eventhub/EventNames.js';

export class Profile extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('Profile');
    }

    render() {
        if (this.#container) {
            return this.#container;
          }
          
        this.#createContainer();   
        this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('section');
        this.#container.id = 'profile';
        const header = document.createElement('div');
        header.classList.add('header');

        const profile_info = document.createElement('div');
        header.classList.add('profile-info');

        profile_info.innerHTML = '<img src = "./static/images/logo.png" id = "picture" alt = "Profile Picture"> \
        <h2 id = "username"> username</h2> <div class = "follows">\
        <span> <button class="followers">50 Followers</button>  <button class="following">50 Following</button></span></div>\
        <p id = "userbio">Looking to enjoy and post events.</p>\
        <button class="edit-profile">Edit Profile</button>'
        header.appendChild(profile_info);

        const option = document.createElement('div');
        option.classList.add('options');
        option.innerHTML = "<button class = 'Post'>Posts</button>\
        <button class = 'RSVP'>RSVP History</button>";
        
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
        // Attach event listeners to the input and button elements
        this.#container.addEventListener('click', (event) =>{
            if (event.target.matches(".edit-profile")){
                this.#openEditModal(this.#container.id);
            }
            if (event.target.matches(".done-btn")){
                const usernameInput = document.getElementById('UsernameInput');
                const bioInput = document.getElementById('BioInput');
                const chosenpfp = document.getElementById('pic');
                this.#handleProfileEdit(usernameInput,bioInput,chosenpfp);
            }
        })

      }

      #handleProfileEdit(name, bio, chosenpfp){
        console.log("Test");
        const usrname = name.value;
        const bioinfo = bio.value;
        const file = chosenpfp.src;

        if (!name.value) {
            alert('Please enter a username.');
            return;   
        }

        this.#publishNewUser(usrname, bioinfo, file);

        // Clear inputs
        this.#clearInputs(name, bio, pfp);
        this.#closeModal("unique");
      }

    #publishNewUser(name, bio, pfp){
        const hub = EventHub.getInstance();
        hub.publish(Events.StoreProfileInfo, {username: name, bio: bio, profile_picture: pfp})

    }

    #clearInputs(name, bio, pfp) {
        name.value = '';
        bio.value = '';
      }

    #updateProfileInfo(profileinfo){
            document.getElementById("picture").src = profileinfo.profile_picture;
            document.getElementById("username").textContent = profileinfo.username;
            document.getElementById("userbio").textContent = profileinfo.bio;
      }
}
