### User Profile Feature Sequence Diagram

```mermaid
flowchart TD
    A[User clicks on Profile picture] --> B[Trigger navigate to profile event];
    B --> C[Fetch profile data from IndexedDB];
    C --> D[Update UI with profile information];

    D --> E{User clicks follow/unfollow button};
    E --> F[Trigger follow/unfollow event];
    F --> G[Update follow/unfollow status in IndexedDB];
    G --> D[Update UI to reflect follow/unfollow state];

    D --> I{User clicks Followers/Following};
    I --> J[Trigger event to help view Followers/Following pages];
    J --> K[Fetch followers/following data from IndexedDB];
    K --> L[Display followers/following page];
    L --> O{User clicks Back button};
    O --> P[Load previous profile information]
    P --> D

    D --> M[User clicks on an event];
    M --> N[Trigger event to load event page];
```
