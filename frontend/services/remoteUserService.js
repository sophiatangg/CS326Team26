import {Service} from './Service.js';
import { Events } from '../eventhub/EventNames.js';
import Base64 from "../utility/base64.js";

export class remoteUserService extends Service {
  #token;
  constructor() {
    super();
    // this.#initUser();
  }

  addSubscriptions() {
    this.subscribe(Events.UpdateProfileInfo, data => {
      this.#updateProfile(data);
    });
    this.subscribe(Events.LoadProfileInfo, () => {
      this.#initUser();
    });
    this.subscribe(Events.LoadOtherProfilesInfo, username => {
      this.#getAnotherUserProfile(username);
    });
    this.subscribe(Events.LoadProfileInfo, username => {
      this.#updateProfile(username);
    });
    this.subscribe(Events.followUser, username => {
      this.#followUser(username);
    });
    this.subscribe(Events.unfollowUser, username => {
      this.#unfollowUser(username);
    });
    this.subscribe(Events.getUserFollowers, username => {
      this.#getUserFollowers(username);
    });
    this.subscribe(Events.getUserFollowing, username => {
      this.#getUserFollowing(username);
    });
  }
  #setToken(token){
    this.#token = token;
    this.publish(Events.LoggedIn, true);
  }

  #getToken(){
    return this.#token;
  }
  // The #initTasks() method is an async method that fetches the authenticated user's profile
  async #initUser() {
    try {
        if (!this.#getToken()){
          //have to delay it in case profile takes too long to load 
          // so the event doesn't publish to no subscribers
          setTimeout(() => {
            this.publish(Events.LoadProfileInfoFailure, 'You are not logged in, you need to log in to view profile.');
        }, 100); // Delay publishing to allow subscribers to initialize
        return;
        }
        // Fetch the authenticated user's profile
        const response = await fetch("/api/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.#getToken()}`, 
            },
        });

        if (!response.ok) {
          this.publish(Events.LoadOtherProfilesInfoFailure, response.message);
            throw new Error("Failed to fetch user profile");
        }

        // Parse the profile data
        const data = await response.json();

        if (data.user.profile_picture) {
          data.user.profile_picture = Base64.convertBase64ToFile(
            task.file,
            task.mime,
            task.filename
          );
        }
        // Publish the user profile information
        this.publish(Events.LoadProfileInfoSuccess, data.user);
    } catch (error) {
        console.error("Error loading user profile:", error.message);
        this.publish(Events.LoadOtherProfilesInfoFailure,  'You are not logged in, you need to log in to see your profile.');
    }
}

async #updateProfile(update) {
  try {
    if (!this.#getToken()){
      this.publish(Events.LoadProfileInfoFailure, 'You are not logged in, you need to log in to update profile.');
      return;
    }
      // Fetch the authenticated user's profile
      const response = await fetch("/api/users/profileupdate", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.#getToken()}`, 
          },
          body: JSON.stringify(update),
      });

      if (!response.ok) {
          this.publish(Events.UpdateProfileInfoFailure, response.message);
          throw new Error("Failed to update profile");
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.UpdateProfileInfoSuccess, data.user);

      return data;
  } catch (error) {
      console.error("Error updating user profile:", error.message);
  }
}

async #toBase64(profile) {
  // If the profile has a profile picture, we need to convert the file to base64 before
  // storing. We also need to store the mime type and filename separately so
  // that we can convert the base64 string back to a blob when fetched from
  // the server.
  if (profile.profile_picture) {
    // Need to store the mime type separately as it is needed when
    // converting back to blob when fetched from the server.
    profile.mime = profile.profile_picture.type;
    // Store the filename separately as well
    profile.picturename = profile.profile_picture.name;
    // Convert the file to base64
    const base64 = await Base64.convertFileToBase64(profile.profile_picture);
    taskData.profile_picture = base64;
  }
}

async #getAnotherUserProfile(username) {
  try {
      await this.#toBase64(update);
      // Fetch the other user's profile
      const response = await fetch(`/api/users/otherprofile/${username}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
      });

      if (!response.ok) {
          this.publish(Events.LoadOtherProfilesInfoFailure, response.message);
          throw new Error(response.message);
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.LoadOtherProfilesInfoSuccess, data.userInfo);

      return data.userInfo;
  } catch (error) {
      console.error("Error getting other user profile:", error.message);
  }
}

async #followUser(username) {
  try {
    if (!this.#getToken()){
      throw new Error('You are not logged in, you need to be logged in to follow this profile');
    }
      // Fetch the authenticated user's profile
      const response = await fetch(`/api/users/follow/${username}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.#getToken()}`, 
          }
      });

      if (!response.ok) {
          this.publish(Events.followUserFailure, response.error);
          throw new Error("Failed to follow profile");
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.followUserSuccess, data);

      return data;
  } catch (error) {
      console.error("Error following user", error.message);
  }
}

async #unfollowUser(username) {
  try {
    if (!this.#getToken()){
      throw new Error('You are not logged in, you need to be logged in to unfollow this profile');
    }
      // Fetch the authenticated user's profile
      const response = await fetch(`/api/users/unfollow/${username}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.#getToken()}`, 
          }
      });

      if (!response.ok) {
          this.publish(Events.unfollowUserFailure, response.error);
          throw new Error("Failed to unfollow profile");
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.unfollowUserSuccess, data);

      return data;
  } catch (error) {
      console.error("Error unfollowing user", error.message);
  }
}

async #getUserFollowers(username) {
  try {
      // Fetch the other user's profile
      const response = await fetch(`/api/users/followers/${username}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          this.publish(Events.getUserFollowersFailure, response.message);
          throw new Error(response.message);
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.getUserFollowersSuccess, data);

      return data;
  } catch (error) {
      console.error("Error getting user's followers.", error.message);
  }
}

async #getUserFollowing(username) {
  try {
      // Fetch the other user's profile
      const response = await fetch(`/api/users/following/${username}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          this.publish(Events.getUserFollowingFailure, response.message);
          throw new Error(response.message);
      }

      // Parse the profile data
      const data = await response.json();

      // Publish the updated user profile information
      this.publish(Events.getUserFollowingSuccess, data);

      return data;
  } catch (error) {
      console.error("Error getting user's following.", error.message);
  }
}

}
