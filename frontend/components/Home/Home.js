import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class Home extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('Home');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'home-view';

        const header = document.createElement('h2');
        header.textContent = 'Welcome to OpenInvite';

        const description = document.createElement('p');
        description.textContent = 'Find events in your community and engage with others.';

        container.appendChild(header);
        container.appendChild(description);

        return container;
    }
}
