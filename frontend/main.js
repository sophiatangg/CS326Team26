import { EventSorting } from './components/EventSorting/EventSorting.js';

const app = document.getElementById('app');
const eventSorting = new EventSorting();
app.appendChild(eventSorting.render());

function populateIndexedDB() {
    const request = indexedDB.open('events', 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('events', { keyPath: 'id' });
        objectStore.createIndex('date', 'date', { unique: false });
        objectStore.createIndex('where', 'where', { unique: false });
        objectStore.createIndex('category', 'category', { unique: false });

        objectStore.add({
            id: 1,
            username: 'John Doe',
            surname: 'hackUMASS',
            title: 'Hack UMass',
            desc: 'Join HackUMASS for an exciting 3-day coding challenge!',
            category: 'academic',
            date: '2024-11-27',
            cover: './mockImages/hackUMASS.png',
            time: '12:45 pm to 9:00 pm',
            where: 'Integrated Learning Center Lobby',
        });
        objectStore.add({
            id: 2,
            username: 'Jane Doe',
            surname: 'hackathon',
            title: 'AI Bootcamp',
            desc: 'A workshop to explore AI technologies.',
            category: 'tech',
            date: '2024-12-01',
            cover: './mockImages/aibootcamp.png',
            time: '10:00 am to 4:00 pm',
            where: 'UMass Engineering Center',
        });
    };
}

populateIndexedDB();