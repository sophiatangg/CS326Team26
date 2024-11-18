export class IndexedDBService {
    constructor() {
      this.dbName = 'events';
      this.storeName = 'events';
      this.db = null;
      this.initDB();
    }
  
    async initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id' });
          objectStore.createIndex('date', 'date', { unique: false });
          objectStore.createIndex('where', 'where', { unique: false });
          objectStore.createIndex('category', 'category', { unique: false });
        };
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          reject('Error opening IndexedDB');
        };
      });
    }
  
    // Add event to the database
    async addEvent(eventData) {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        await store.add(eventData);
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  
    // Get all events from the database
    async getAllEvents() {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const events = [];
  
        const request = store.openCursor();
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            events.push(cursor.value);
            cursor.continue();
          } else {
            resolve(events);
          }
        };
  
        request.onerror = () => {
          reject('Error retrieving events');
        };
      });
    }
  }
  
  