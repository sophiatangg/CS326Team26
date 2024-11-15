import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Profile extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Profile');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'profile';
        const header = document.createElement('div');
        header.classList.add('header');

        const profile_info = document.createElement('div');
        header.classList.add('profile-info');

        profile_info.innerHTML = '<img src = "./static/images/logo.png" alt = "Profile Picture"> \
        <h2> username</h2> <div class = "follows">\
        <span> <button>50 Followers</button>  <button>50 Following</button></span></div>\
        <p class = "description">Posting fun events involving music.</p>\
        <button>Edit Profile</button>'
        header.appendChild(profile_info);

        const option = document.createElement('div');
        option.classList.add('options');
        option.innerHTML = "<button class = 'Post'>Posts</button>\
        <button class = 'RSVP'>RSVP History</button>";
        
        container.appendChild(header);
        container.appendChild(option);
        return container;
    }
}
