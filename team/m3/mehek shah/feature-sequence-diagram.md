graph TD
    A[Start: User visits Explore Events page] --> B[Render Search UI]
    B --> C[Render Filters Checkboxes]
    B --> D[Render Search Bar]
    B --> E[Initialize Feed Container]
    
    C --> F[User interacts with Filters]
    F --> G[Filter Events based on Selected Categories]
    G --> H[Update Feed Container]
    
    D --> I[User types in Search Bar]
    I --> J[Search Events based on Keywords]
    J --> H
    
    H --> K[Display Matching Events]
    K --> L[User views Event Details]
    L --> M[End]

The feature is to search events based on keywords(still in progress) or filters. The feed section renders event cards which either have the search keyword or match the selected event type filter or both.
