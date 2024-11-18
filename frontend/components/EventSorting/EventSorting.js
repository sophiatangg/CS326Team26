import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class EventSorting extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('EventSorting');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'event-view-sorted';

        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('h2');
        title.textContent = 'Event Sorting';

        const sortDropdown = document.createElement('select');
        sortDropdown.id = 'sortOptions';
        const options = ['date', 'location', 'category'];
        options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o;
            opt.textContent = `Sort by ${o}`;
            sortDropdown.appendChild(opt);
        });

        const sortButton = document.createElement('button');
        sortButton.textContent = 'Sort Events';
        sortButton.classList.add('sort-events-button');
        sortButton.addEventListener('click', () => this.sortEvents());

        header.appendChild(title);
        header.appendChild(sortDropdown);
        header.appendChild(sortButton);

        const eventSortingContainer = document.createElement('div');
        eventSortingContainer.id = 'eventSortingContainer';

        container.appendChild(header);
        container.appendChild(eventSortingContainer);

        return container;
    }

    async sortEvents() {
        const sortOption = document.getElementById('sortOptions').value;
        const eventSortingContainer = document.getElementById('eventSortingContainer');
        eventSortingContainer.innerHTML = '';

        const sortedEvents = await this.fetchSortedEvents(sortOption);

        sortedEvents.forEach(e => {
            const eventCard = this.createEventCard(e);
            eventSortingContainer.appendChild(eventCard);
        });
    }

    async fetchSortedEvents(sortBy) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('events', 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                const objectStore = db.createObjectStore('events', { keyPath: 'id' });
                objectStore.createIndex('date', 'date', { unique: false });
                objectStore.createIndex('location', 'where', { unique: false });
                objectStore.createIndex('category', 'category', { unique: false });
            };

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction('events', 'readonly');
                const objectStore = transaction.objectStore('events');
                const index = objectStore.index(sortBy);
                const events = [];

                index.openCursor(null, 'next').onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        events.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(events);
                    }
                };

                transaction.onerror = (e) => reject(e);
            };

            request.onerror = (e) => reject(e);
        });
    }

    createEventCard(e) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        const title = document.createElement('h3');
        title.textContent = e.title;

        const description = document.createElement('p');
        description.textContent = e.desc; // Ensure "desc" matches your database schema

        const date = document.createElement('p');
        date.textContent = `Date: ${e.date}`;

        const time = document.createElement('p');
        time.textContent = `Time: ${e.time}`;

        const location = document.createElement('p');
        location.textContent = `Where: ${e.where}`;

        const category = document.createElement('p');
        category.textContent = `Category: ${e.category}`;

        const cover = document.createElement('img');
        cover.src = e.cover;
        cover.alt = `${e.title} cover`;

        eventCard.appendChild(title);
        eventCard.appendChild(description);
        eventCard.appendChild(date);
        eventCard.appendChild(time);
        eventCard.appendChild(location);
        eventCard.appendChild(category);
        eventCard.appendChild(cover);

        return eventCard;
    }
}
