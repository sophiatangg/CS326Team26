
    participant User
    participant UI
    participant JavaScript
    participant IndexedDB

    User->UI: Clicks events tab
    UI->JavaScript: Trigger event that navigates user to events
    JavaScript->IndexedDB: Fetch events from the IndexedDB
    IndexedDB- ->JavaScript: Returns events data
    JavaScript->UI: Update UI to show all current events

    User->UI: Clicks an event
    UI->JavaScript: Triggers event that shows more information about the event
    JavaScript->UI: Update UI to show more information 

    User->UI: Clicks yes button under RSVP
    UI->JavaScript: Triggers event to show rsvp form 
    JavaScript->IndexedDB: Adds the user into IndexedDB
    JavaScript->UI: yes button is changed to green

    User->UI: Clicks no button under RSVP
    JavaScript->IndexedDB: Adds the user into IndexedDB
    JavaScript->UI: no button is changed to red

    User->UI: Clicks maybe button under RSVP
    JavaScript->IndexedDB: Adds the user into IndexedDB
    JavaScript->UI: maybe button is changed to orange


Note: 
-> : solid arrows (messages)
- -> : dotted arrows (return)
