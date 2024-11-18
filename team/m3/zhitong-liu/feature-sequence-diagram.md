flowchart TD
    A["User visits Event page"] --> B("Javascript fetches event data")
    B --> C["Render events list in UI"]
    C --> D{"User toggles event sorting options"}
    D --> E["Sort by Location"] & F["Sort by Category"] & G["Sort by Date"]
    E --> n1["User toggles Sort Event button"]
    F --> n1
    G --> n1
    n1 --> H["Javascript reorders IndexDB data"]
    H --> C



