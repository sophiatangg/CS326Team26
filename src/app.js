document.addEventListener("DOMContentLoaded", () => {
    function navigate(viewId) {
      // Hide all views
      document.querySelectorAll(".view").forEach((view) => {
        view.style.display = "none";
      });
  
      // Show the requested view
      document.getElementById(viewId).style.display = "block";
    }
  
    document
      .getElementById("home")
      .addEventListener("click", () => navigate("homeView"));
    document
      .getElementById("profile")
      .addEventListener("click", () => navigate("profileView"));
    document
      .getElementById("about")
      .addEventListener("click", () => navigate("aboutView"));
  
    // Initialize with the home view
    navigate("homeView");
  
  });
  