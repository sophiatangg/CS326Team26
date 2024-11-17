import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Profile extends BaseComponent {
    #container = null;
    #isEditingProfile = false;

    constructor() {
        super();
        this.loadCSS('Profile');
    }

    render() {
        if (!this.#container) {
            this.#container = document.createElement('section');
            this.#container.id = 'profile';
            this.#renderProfileView();
        }
        return this.#container;
    }

    #renderProfileView() {
        this.#isEditingProfile = false;
        this.#container.innerHTML = ''; // Clear the container

        const header = document.createElement('div');
        header.classList.add('header');

        const profileInfo = document.createElement('div');
        profileInfo.classList.add('profile-info');

        profileInfo.innerHTML = `
            <img src="./static/images/logo.png" id="picture" alt="Profile Picture">
            <h2 id="username">Username</h2>
            <div class="follows">
                <span><button class="followers">50 Followers</button></span>
                <span><button class="following">50 Following</button></span>
            </div>
            <p id="userbio">Looking to enjoy and post events.</p>
            <button class="edit-profile">Edit Profile</button>
        `;
        header.appendChild(profileInfo);

        const options = document.createElement('div');
        options.classList.add('options');
        options.innerHTML = `
            <button class="Post">Posts</button>
            <button class="RSVP">RSVP History</button>
        `;

        this.#container.appendChild(header);
        this.#container.appendChild(options);

        this.#attachEventListeners();
    }

    #openEditProfile() {
        this.#isEditingProfile = true;
        this.#container.innerHTML = ''; // Clear the profile view

        const editContainer = document.createElement('div');
        editContainer.classList.add('edit-profile-container');

        editContainer.innerHTML = `
            <div class="profile-edit-header">
                <h1>Edit Profile</h1>
            </div>
            <div class="profile-edit-form">
                <div class="edit-profile-picture">
                    <img src="./static/images/logo.png" id="edit-pic" alt="Profile Picture">
                    <label class="edit-picture-label" for="edit-pfp">Change Picture</label>
                    <input type="file" id="edit-pfp" accept="image/png, image/jpg, image/jpeg" style="display:none;">
                </div>
                <form>
                    <label for="edit-username">Username</label>
                    <input type="text" id="edit-username" placeholder="Enter new username">
                    <label for="edit-bio">Bio</label>
                    <textarea id="edit-bio" placeholder="Enter new bio"></textarea>
                </form>
                <div class="edit-buttons">
                    <button class="save-profile">Save</button>
                    <button class="cancel-profile">Cancel</button>
                </div>
            </div>
        `;

        this.#container.appendChild(editContainer);

        const profilePicInput = document.getElementById('edit-pfp');
        const profilePic = document.getElementById('edit-pic');

        profilePicInput.addEventListener('change', () => {
            const file = profilePicInput.files[0];
            if (file) {
                profilePic.src = URL.createObjectURL(file);
            }
        });

        this.#attachEditProfileListeners();
    }

    #attachEditProfileListeners() {
        const saveButton = this.#container.querySelector('.save-profile');
        const cancelButton = this.#container.querySelector('.cancel-profile');

        saveButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.#saveProfileChanges();
        });

        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.#cancelEditProfile();
        });
    }

    #saveProfileChanges() {
        const usernameInput = document.getElementById('edit-username');
        const bioInput = document.getElementById('edit-bio');
        const profilePic = document.getElementById('edit-pic').src;

        if (!usernameInput.value.trim()) {
            alert('Please enter a username.');
            return;
        }

        const profileData = {
            username: usernameInput.value,
            bio: bioInput.value,
            profile_picture: profilePic
        };

        this.#updateProfileInfo(profileData);
        this.#renderProfileView(); // Re-render the profile view
    }

    #cancelEditProfile() {
        this.#renderProfileView(); // Restore the original profile view
    }

    #attachEventListeners() {
        this.#container.addEventListener('click', (event) => {
            if (event.target.matches('.edit-profile')) {
                this.#openEditProfile();
            }
        });
    }

    #updateProfileInfo(profileData) {
        const pictureElem = this.#container.querySelector('#picture');
        const usernameElem = this.#container.querySelector('#username');
        const userBioElem = this.#container.querySelector('#userbio');

        if (pictureElem) pictureElem.src = profileData.profile_picture;
        if (usernameElem) usernameElem.textContent = profileData.username;
        if (userBioElem) userBioElem.textContent = profileData.bio;
    }
}
