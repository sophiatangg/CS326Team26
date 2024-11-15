# Feature Descriptions and Ownership

## Small Features (1 point)

### Feature Name: Basic Event Form
**Description**: A simple form that allows users to input the event title, description, date, and location. Basic validation ensures all fields are filled correctly before submission. No interaction with IndexedDB is required for this feature.
**Point Value**: 1 point  
**Team Member**: Mason Choi, Erika Lam

### Feature Name: Static About Page
**Description**: A static HTML page that provides information about the purpose of the OpenInvite app, including a short description, the mission statement, and the team. It contains no interactive elements.
**Point Value**: 1 point  
**Team Member**: Anne Colombe Sinkpon, Mason Choi

### Feature Name: Event Reminder Notification
**Description**: A notification system that displays a reminder to users when an event is upcoming. This feature triggers a simple pop-up notification, but does not involve complex data interaction or dynamic content.
**Point Value**: 1 point  
**Team Member**: Zhitong Liu

### Feature Name: Followers Page
**Description**: A page on the profile that allows users to see who they are following. It will notify them of the events posted by the people or groups they follow. Similarly, groups can see how many members are following them.
**Point Value**: 1 point  
**Team Member**: Erika Lam

## Medium Features (2-3 points)

### Feature Name: Event Category Filter
**Description**: A filter that allows users to select and view events based on categories such as "Music," "Sports," or "Social." The events in the feed dynamically update to reflect the selected category, and the feature pulls data from IndexedDB to store user preferences.
**Point Value**: 2 points  
**Team Member**: Mason Choi

### Feature Name: RSVP System
**Description**: A system that allows users to RSVP to events. Users can select "Yes," "No," or "Maybe" for attending, and their response is stored in IndexedDB. The RSVP status updates dynamically in the event detail page.
**Point Value**: 2 points  
**Team Member**: Sophia Tang

### Feature Name: Event Search Bar
**Description**: A search bar that allows users to search for events by keyword. The list of events updates dynamically based on the user's search term, and it fetches results from IndexedDB.
**Point Value**: 3 points  
**Team Member**: Mehek Shah, Sophia Tang

## Large Features (4-5 points)

### Feature Name: User Profile Dashboard
**Description**: A dynamic user profile page that displays the user's details, including their RSVP history, events they’ve posted, and their preferences. The dashboard fetches data from IndexedDB and updates in real-time based on user interaction. This feature also allows users to edit their profile details and save them.
**Point Value**: 4 points  
**Team Member**: Anne Colombe Sinkpon, Mason Choi

### Feature Name: Event Feed with Sorting and Filtering
**Description**: A complex event feed that allows users to sort and filter events by date, location, or category. The feed fetches data from IndexedDB and updates dynamically when filters are applied. Users can interact with the feed to see events that match their interests and preferences.
**Point Value**: 4 points  
**Team Member**: Zhitong Liu

### Feature Name: Event Creation and Management
**Description**: A comprehensive feature that allows users to create new events, edit them, and delete them. The system validates inputs, ensures the event data is saved to IndexedDB, and allows for updates. Users can also track and manage the number of RSVPs for their events.
**Point Value**: 5 points  
**Team Member**: Mason Choi, Sophia Tang

### Feature Name: Multi-step RSVP Process with Confirmation
**Description**: A multi-step RSVP form that guides users through the process of confirming attendance, adding optional details like dietary restrictions, and finalizing their RSVP. The feature saves progress to IndexedDB between steps, ensuring users can continue later. Confirmation emails are sent after submission.
**Point Value**: 5 points  
**Team Member**: Erika Lam, Anne-Colombe Sinkpon
