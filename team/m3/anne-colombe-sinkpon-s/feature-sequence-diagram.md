### User Profile Feature Sequence Diagram
This feature allows the user to edit their profile (e.g., name, bio, profile picture) and save updates dynamically. Changes are reflected in the UI immediately after being saved in the database. I worked on this with Erika Lam.


```mermaid
flowchart TD
    sequenceDiagram
    participant User
    participant UI
    participant JavaScript
    participant IndexedDB

    User->>UI: Navigate to Profile Page
    UI->>JavaScript: Initialize profile component
    JavaScript->>IndexedDB: Fetch user details (transaction: "read")
    IndexedDB-->>JavaScript: Return user details (e.g., RSVP history, events, preferences)
    JavaScript->>UI: Populate profile data on the page

    User->>UI: Edit profile details (e.g., name, preferences)
    UI->>JavaScript: Trigger updateProfile event
    JavaScript->>IndexedDB: Save updated details (transaction: "write")
    IndexedDB-->>JavaScript: Confirm update success
    JavaScript->>UI: Update profile data in real-time

    User->>UI: Refresh profile page
    UI->>JavaScript: Re-fetch updated user data
    JavaScript->>IndexedDB: Fetch data from database
    IndexedDB-->>JavaScript: Return updated data
    JavaScript->>UI: Update UI with new data

```