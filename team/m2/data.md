# Application Data 

## Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including login details and preferences. The profile can now be edited dynamically, including updating the profile picture, username, and bio.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `username` (string): The user's display name.
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `profile_picture` (string): URL to the user's profile image.
  - `bio` (string): A brief biography or description provided by the user.
  - `followers` (integer): Number of followers the user has.
  - `following` (integer): Number of accounts the user is following.
  - `created_at` (timestamp): The date and time when the account was created.
  - `updated_at` (timestamp): The last time the user's profile was updated.
- **Data Source**: User-input data during registration, profile updates, or actions such as following/unfollowing other users.

### 2. Event

- **Description**: Details of events created by users or organizations. Events now include expanded RSVP interactions and additional dynamic attributes for displaying detailed event information.
- **Attributes**:
  - `event_id` (string): A unique identifier for each event.
  - `creator_id` (string): The `user_id` or `organization_id` of the event creator.
  - `title` (string): The name of the event.
  - `description` (string): A detailed description of the event.
  - `location` (string): The address or venue where the event will take place.
  - `start_time` (datetime): The date and time when the event starts.
  - `end_time` (datetime): The date and time when the event ends.
  - `category` (string): The category of the event (e.g., social, educational, cultural).
  - `cover_image` (string): URL to an image representing the event.
  - `rsvp_count` (object): Tracks RSVP responses with counts for "Yes," "No," and "Maybe."
  - `created_at` (timestamp): When the event was created.
  - `updated_at` (timestamp): When the event details were last updated.
- **Data Source**: User-input data when creating or editing an event.

### 3. RSVP

- **Description**: Tracks users' responses to events, including additional details such as dietary restrictions and accessibility needs.
- **Attributes**:
  - `rsvp_id` (string): A unique identifier for each RSVP.
  - `user_id` (string): The unique identifier of the user responding to the event.
  - `event_id` (string): The unique identifier of the event.
  - `response` (string): The user's response (e.g., "Yes," "No," "Maybe").
  - `dietary_restrictions` (array of objects): A list of dietary restrictions, where each object contains:
    - `type` (string): The type of restriction (e.g., "Food," "Skin").
    - `description` (string): Additional details about the restriction.
  - `accessibility_needs` (string): Details about the user's accessibility requirements.
  - `timestamp` (timestamp): The date and time when the RSVP was made.
- **Data Source**: User-input data during RSVP submission.

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

### 6. Category

- **Description**: Defines the different categories under which events can be classified.
- **Attributes**:
  - `category_id` (string): A unique identifier for each category.
  - `name` (string): The name of the category (e.g., "Networking," "Sports").
  - `description` (string): A brief description of the category.
- **Data Source**: Predefined by the system or added by administrators.

## Data Relationships

- **User Profile to Event**: One-to-many relationship (a user can create multiple events).
- **User Profile to RSVP**: One-to-many relationship (a user can RSVP to multiple events).
- **Event to RSVP**: One-to-many relationship (an event can have multiple RSVPs).
- **Event to Comment**: One-to-many relationship (an event can have multiple comments).
- **User Profile to Comment**: One-to-many relationship (a user can post multiple comments).
- **Event to Category**: Many-to-one relationship (an event belongs to one category).

## Data Sources

- **User-Input Data**: Collected when users register, create profiles, post events, RSVP, comment, and update settings.
- **System-Generated Data**: Includes RSVP counts, recommendations, and aggregated statistics based on user interactions.
- **Administrators**: Categories are predefined and maintained by system administrators to ensure consistency. 

### Interaction with IndexedDB

The front-end leverages IndexedDB for persistent client-side data storage, ensuring users can save and retrieve data seamlessly across sessions. Data includes:
- RSVP details (e.g., responses, dietary restrictions).
- User profile updates.
- Event details, including RSVP counts and comments.

No storage methods are described in this document to maintain focus on data structure and interaction.
