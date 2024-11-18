User Profiles sequenceDiagram

```mermaid
flowchart TD
    User->>UI: Clicks on Profile picture
    UI->>JavaScript: Trigger "navigateToProfile" event
    JavaScript->>IndexedDB: Fetch profile data for the selected user
    IndexedDB-->>JavaScript: Returns profile data
    JavaScript->>UI: Update UI with profile information

    User->>UI: Clicks "Follow/Unfollow" button
    UI->>JavaScript: Trigger "toggleFollow" event
    JavaScript->>IndexedDB: Update follow status in the database
    IndexedDB-->>JavaScript: Confirmation of follow status update
    JavaScript->>UI: Update UI to reflect follow/unfollow state

    User->>UI: Clicks "Followers/Following"
    UI->>JavaScript: Trigger "viewFollowersOrFollowing" event
    JavaScript->>IndexedDB: Fetch followers/following data
    IndexedDB-->>JavaScript: Returns followers/following data
    JavaScript->>UI: Display followers/following list in UI

    User->>UI: Clicks on an event
    UI->>JavaScript: Trigger "navigateToEventDetails" event
    JavaScript->>IndexedDB: Fetch event details
    IndexedDB-->>JavaScript: Returns event details
    JavaScript->>UI: Display event details in UI
```
