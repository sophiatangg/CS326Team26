User Profiles sequenceDiagram

```mermaid
flowchart TD
    A[User clicks on Profile picture] --> B[Trigger "navigateToProfile" event];
    B --> C[Fetch profile data from IndexedDB];
    C --> D[Update UI with profile information];

    D --> E[User clicks "Follow/Unfollow" button];
    E --> F[Trigger "toggleFollow" event];
    F --> G[Update follow status in IndexedDB];
    G --> H[Update UI to reflect follow/unfollow state];

    H --> I[User clicks "Followers/Following"];
    I --> J[Trigger "viewFollowersOrFollowing" event];
    J --> K[Fetch followers/following data from IndexedDB];
    K --> L[Display followers/following list in UI];

    L --> M[User clicks on an event];
    M --> N[Trigger "navigateToEventDetails" event];
    N --> O[Fetch event details from IndexedDB];
    O --> P[Display event details in UI];
```
