# OpenInvite

OpenInvite is a web application designed to centralize the process of discovering and engaging with local community events. Users can create events, RSVP, and explore various events filtered by category, location, and date.

## Features

- Create and manage events with rich details.
- RSVP to events with dietary restrictions and accessibility needs.
- Explore events using filters and sorting options.
- Seamless backend and frontend integration.

---

## Prerequisites

Ensure the following software is installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)
- [live-server](https://www.npmjs.com/package/live-server) (used for running the frontend)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sophiatangg/CS326Team26.git
   cd openinvite
   ```

2. Install Dependencies
Navigate to the project directory and run the following commands in both frontend and backend directories:

  ```bash
  cd frontend
  npm install
  cd ../backend
  npm install
  ```

## Running the Application

1. Start the Frontend
Navigate to the frontend directory and start the live server:

  ```bash
  cd frontend
  npm run start
  ```
This will start the frontend on your default live server (e.g., http://127.0.0.1:8080).

2. Start the Backend
Open another terminal, navigate to the backend directory, and start the development server:

  ```bash
  cd backend
  npm run dev
  ```
The backend server will run on http://localhost:5050.

