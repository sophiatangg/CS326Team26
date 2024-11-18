import { Events } from '../eventhub/EventNames.js';
import {Service} from './Service.js';

export class localService extends Service {
  constructor() {
    super();
    this.dbName = 'Users';
    this.storeName = 'currentuser';
    this.otherusers = "otherusers";
    this.db = null;

    // Initialize the database
    this.initDB()
    .then(() => {
      // Load tasks on initialization
      this.loadUserFromDB();
    })
    .catch(error => {
      console.error(error);
    });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        const userstore = db.createObjectStore(this.storeName, {
          keyPath: 'userId',
          autoIncrement: true,
        });
        const otherstore = db.createObjectStore(this.otherusers, {
          keyPath: 'otherUserId',
          autoIncrement: true,
        });
        userstore.createIndex("username", "username", { unique: true });
        otherstore.createIndex("username", "username", { unique: true });
      };
      
      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeUser(userData) {
    return new Promise((resolve, reject) => {
      this.clearUser();
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(userData);

      request.onsuccess = () => {
        this.publish(Events.StoreProfileInfoSuccess, userData);
        resolve('User information stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreProfileInfoFailure, userData);
        reject('Error storing user.');
      };
    });
  }

  async loadUserFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const users = event.target.result;
        users.forEach(user => this.publish(Events.LoadProfileInfoSuccess, user));
        resolve(users);
      };

      request.onerror = () => {
        this.publish(Events.LoadProfileInfoFailure);
        reject('Error retrieving users.');
      };
    });
  }

  async getUser(username) {
    return new Promise((resolve, reject) => {
      const objectStore = db.transaction([this.storeName]).objectStore(this.storeName);
      const index = objectStore.index("username");
      const request = index.get(username);

      request.onerror = (event) => {
        this.publish(Events.LoadProfileInfoFailure);
        reject('Error getting profile information for requested user.');
      };
      request.onsuccess = (event) => {
        this.publish(event.target.result);
        resolve('Got User Info.');
      };
    });
  }

  async clearUser() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve('All tasks cleared');
      };

      request.onerror = () => {
        reject('Error clearing tasks');
      };
    });
  }

  // other users management

  async storeotherUser(userData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.otherusers], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(userData);

      request.onsuccess = () => {
        this.publish(Events.StoreProfileInfoSuccess, userData);
        resolve('User information stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreProfileInfoFailure, userData);
        reject('Error storing user.');
      };
    });
  }

  async loadUsersFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.otherusers], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const users = event.target.result;
        users.forEach(user => this.publish(Events.LoadOtherProfilesInfoSuccess, user));
        resolve(users);
      };

      request.onerror = () => {
        this.publish(Events.LoadOtherProfilesInfoFailure);
        reject('Error retrieving users.');
      };
    });
  }

  async getUser(username) {
    return new Promise((resolve, reject) => {
      const objectStore = db.transaction([this.otherusers]).objectStore(this.otherusers);
      const index = objectStore.index("username");
      const request = index.get(username);

      request.onerror = (event) => {
        this.publish(Events.LoadProfileInfoFailure);
        reject('Error getting profile information for requested user.');
      };
      request.onsuccess = (event) => {
        this.publish(Events.LoadOtherProfilesInfoSuccess, event.target.result);
        resolve('Got User Info.');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreProfileInfo, data => {
      this.storeUser(data);
    });
  }
}
