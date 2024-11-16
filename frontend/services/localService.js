import { Events } from '../eventhub/Events.js';
import {Service} from './Service.js';

export class localService extends Service {
  constructor() {
    super();
    this.dbName = 'userDB';
    this.storeName = 'users';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        // Load tasks on initialization
        this.loadUsersFromDB();
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
        const store = db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex("username", "username", { unique: true });
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

  async loadUsersFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const users = event.target.result;
        users.forEach(user => this.publish('User', user));
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
        this.publish(Events.LoadProfileInfoSucess);
        resolve('Got User Info.');
      };
    });
  }


  addSubscriptions() {
    this.subscribe(Events.StoreTask, data => {
      this.storeTask(data);
    });

    this.subscribe(Events.UnStoreTasks, () => {
      this.clearTasks();
    });
  }
}
