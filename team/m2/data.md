# Application Data 

## Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `profile_picture` (string): URL to the user's profile image.
  - `bio` (string): A brief biography or description provided by the user.
  - `interests` (array of strings): A list of user interests for event recommendations.
  - `created_at` (timestamp): The date and time when the account was created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
- **Data Source**: User-input data during registration or profile updates.

### 2. Event

- **Description**: Details of events created by users or organizations, available for others to view and RSVP to.
- **Attributes**:
  - `event_id` (string): A unique identifier for each event.
  - `creator_id` (string): The `user_id` or `organization_id` of the event creator.
  - `title` (string): The name of the event.
  - `description` (string): A detailed description of the event.
  - `location` (string): The address or venue where the event will take place.
  - `start_time` (datetime): The date and time when the event starts.
  - `end_time` (datetime): The date and time when the event ends.
  - `category` (string): The category of the event (e.g., social, educational, cultural).
  - `capacity` (integer): The maximum number of attendees allowed.
  - `image` (string): URL to an image representing the event.
  - `created_at` (timestamp): When the event was created.
  - `updated_at` (timestamp): When the event details were last updated.
- **Data Source**: User-input data when creating or editing an event.

### 3. RSVP

- **Description**: Tracks users' responses to events, indicating their intention to attend.
- **Attributes**:
  - `rsvp_id` (string): A unique identifier for each RSVP.
  - `user_id` (string): The unique identifier of the user responding to the event.
  - `event_id` (string): The unique identifier of the event.
  - `response` (string): The user's response (e.g., "Going", "Interested", "Not Going").
  - `timestamp` (timestamp): The date and time when the RSVP was made.
- **Data Source**: User-input data when responding to an event invitation.

### 4. Organization Profile

- **Description**: Contains information about organizations or groups that create and manage events.
- **Attributes**:
  - `organization_id` (string): A unique identifier for each organization.
  - `name` (string): The organization's name.
  - `email` (string): Contact email for the organization.
  - `password` (string): A hashed version of the organization's password.
  - `description` (string): A summary of the organization's mission or activities.
  - `logo` (string): URL to the organization's logo image.
  - `website` (string): The organization's website URL.
  - `created_at` (timestamp): When the organization profile was created.
  - `updated_at` (timestamp): The last time the organization's profile was updated.
- **Data Source**: User-input data during organization registration or profile updates.

### 5. Comment

- **Description**: User-generated comments on events for discussions or inquiries.
- **Attributes**:
  - `comment_id` (string): A unique identifier for each comment.
  - `event_id` (string): The unique identifier of the event being commented on.
  - `user_id` (string): The unique identifier of the user who made the comment.
  - `content` (string): The text content of the comment.
  - `timestamp` (timestamp): When the comment was posted.
- **Data Source**: User-input data when posting a comment on an event.

<!-- ### 6. Location Data

- **Description**: Stores users' location data for proximity-based event discovery.
- **Attributes**:
  - `user_id` (string): The unique identifier of the user.
  - `latitude` (float): The user's current geographical latitude.
  - `longitude` (float): The user's current geographical longitude.
  - `updated_at` (timestamp): When the location data was last updated.
- **Data Source**: User-input data or device location services with user permission. -->

### 6. Category

- **Description**: Defines the different categories under which events can be classified.
- **Attributes**:
  - `category_id` (string): A unique identifier for each category.
  - `name` (string): The name of the category (e.g., "Networking", "Sports").
  - `description` (string): A brief description of the category.
- **Data Source**: Predefined by the system or added by administrators.

## Data Relationships

- **User Profile to Event**: One-to-many relationship (a user can create multiple events).
- **Organization Profile to Event**: One-to-many relationship (an organization can create multiple events).
- **User Profile to RSVP**: One-to-many relationship (a user can RSVP to multiple events).
- **Event to RSVP**: One-to-many relationship (an event can have multiple RSVPs).
- **Event to Comment**: One-to-many relationship (an event can have multiple comments).
- **User Profile to Comment**: One-to-many relationship (a user can post multiple comments).
- **User Profile to Notification**: One-to-many relationship (a user can receive multiple notifications).
- **Event to Category**: Many-to-one relationship (an event belongs to one category).

## Data Sources

- **User-Input Data**: Collected when users register, create profiles, post events, RSVP, comment, and update settings.
- **System-Generated Data**: Notifications, event recommendations, and aggregated statistics are generated by the application based on user interactions and preferences.
- **Device Location Services**: With user permission, location data is collected to provide location-based event listings.
- **Administrators**: Categories are managed by system administrators to maintain consistency.
