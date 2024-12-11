const db = require('../models'); // Adjust the path as needed
const User = db.User; // Access the User model

const UserFollowers = require('../models/Followers');


exports.updateUserProfile = async (req, res, next) => {
    const { user } = req; // Authenticated user
    const updates = req.body; // New profile data from the request body
    // if the user updated his password encrypt it before updating his
    // profile info
    if (updates.password) {
        try {
              updates.password = await bcrypt.hashSync(updates.password, 10);
        } catch (err) {
            throw err;
        }
    }
    try {
        // Find the authenticated user in the database
        const currentUser = await User.findByPk(user.id);

        // if User does not exist
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user instance with new data
        await currentUser.update(updates);

        // Return the updated user profile
        return res.status(200).json({
            message: "Profile updated successfully",
            user: currentUser,
        });
    } catch (error) {
        return res.status(404).json({ error });
    }
};
  
exports.getConnectedUserProfileInfo = async (req, res) => {
    const { user } = req; // Authenticated user
    try {
        // Find the authenticated user in the database
        const currentUser = await User.findOne({
            where : {id: user.id},
            // include the profiles that follow this user 
            include : [{
                model: User,
                as: 'Followers',
                required: false,
                // attributes we want to remove from the User followers in response
                attributes: {
                    exclude: ['password', 'email' ]
                },
              },
              {
                model: User,
                as: 'Following',
                required: false,
                // attributes we want to remove from the User following in response
                attributes: {
                    exclude: ['password', 'email']
                },
              }
            ]
            }
        );

        // if User does not exist
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user profile
        return res.status(200).json({
            message: "Authenticated user's profile info fetched successfully",
            user: currentUser,
        });
    } catch (error) {
        return res.status(404).json({ error, message: error.message });
    }
  };

// get a user's profile given a username
exports.getUserProfile  = async (req, res) => {
    try {
        const user =  await User.findOne({ 
            where: { username: req.query.username },
            // exclude these attribute in person's profile in response
            attributes: {exclude: ['password', 'email']},
            include : [{
                model: User,
                as: 'Followers',
                required: false,
                // attributes we want to remove from the User followers in response
                attributes: {
                    exclude: ['password', 'email']
                },
              },
              {
                model: User,
                as: 'Following',
                required: false,
                // attributes we want to remove from the User following in response
                attributes: {
                    exclude: ['password', 'email']
                },
              }
            ]        
        });
        // if user does not exist
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // return user
        res.status(200).json({
          userInfo: user,
          message: "User profile has been fetched Successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  };

exports.followUser = async (req, res) => {
    try {
        // user: Authenticated user's data (e.g., from middleware)
        // username: Username of the person the user wants to follow.
        const { user, params: { username } } = req;
        // check if Follow is possible then return users if yes
        const {followee, follower } = await this.checkIfFollowisPossible(user, username);
        const userAlreadyFollowsOther = await followee.hasFollower(follower);
        // if user does not already follow followee
        if (!userAlreadyFollowsOther){
            // add user as a follower
            await followee.addFollower(follower);

            // Reload the followee to include updated followers
            await followee.reload({
                include: [{
                    model: User,
                    as: 'Followers',
                    attributes: {
                        // attributes we want to remove from the User followers in response
                        exclude: ['password',  'email']
                    },
                }],
            });

            // Reload the follower to include updated following
            await follower.reload({
                include: [{
                    model: User,
                    as: 'Following',
                    // attributes we want to remove from the User followings in response
                    attributes: {
                        exclude: ['password',  'email']
                    },
                }],
            });

            return res.status(200).json({
                // return the followee and follower
                followee: followee,
                follower: follower,
                message: "User followed Successfully",
              });
        } else {
            // if user already follows other user
            return res.status(409).json({
                error: "You already follow this user",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

exports.checkIfFollowisPossible = async (user, otherUsername, follow = true) => {
    try {
        // find user the current user wants to follow
        const otherUser = await User.findOne({
            where : {username: otherUsername},
            // include the profiles that follow this user 
            include : [{
                model: User,
                as: 'Followers',
                required: false,
                // attributes we want to remove from the User followers in response
                attributes: {
                    exclude: ['password', 'email']
                },
              }]
            }
        );
        if (!otherUser) {
            throw new Error(`User with username ${otherUsername} not found.`);
        }
        // find the current user
        const currentUser = await User.findOne({
            where : {id: user.id},
            // include currentUser's following
            include : [{
                model: User,
                as: 'Following',
                required: false,
                // attributes we want to remove from the User followings in response
                attributes: {
                    exclude: ['password', 'email']
                },
              }]
            }
        );
        console.log(currentUser);
        // if it's the same user then throw error
        if (otherUser.id === currentUser.id){
            // if the operation is follow
            if (follow) {
                throw new Error('You cannot follow yourself.');
            } else {
                // if the operation is unfollow
                throw new Error('You cannot unfollow yourself.');
            }
        }
        return { followee: otherUser, follower: currentUser };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.unfollowUser = async (req, res) => {
    try {
        // user: Authenticated user's data (e.g., from middleware)
        // username: Username of the person the user wants to follow.
        const { user, params: { username } } = req;
        // check if Follow is possible then return users if yes
        const {followee, follower } = await this.checkIfFollowisPossible(user, username, false);
        const followerExists = await followee.hasFollower(follower);
        // if user is a follower
        if (followerExists){
            // remove user as a follower
            await followee.removeFollower(follower);
            // Reload the followee to include updated followers
            await followee.reload({
                include: [{
                    model: User,
                    as: 'Followers',
                    // attributes we want to remove from the User followers in response
                    attributes: {
                        exclude: ['password', 'email']
                    },
                }],
            });

            // Reload the follower to include updated following
            await follower.reload({
                include: [{
                    model: User,
                    as: 'Following',
                    // attributes we want to remove from the User followings in response
                    attributes: {
                        exclude: ['password', 'email']
                    },
                }],
            });
            return res.status(200).json({
                // return the followee and follower
                followee: followee,
                follower: follower,
                message: `Successfully unfollowed ${username}`,
              });
        } else {
            // if user is not a follower throw errpr
            return res.status(409).json({
                error: "You do not follow this user",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error following user', details: error.message });
    }
};

exports.getUserFollowers = async (req, res) => {
    try {
        // user: Authenticated user's data (e.g., from middleware)
        const {params: { username }} = req;
        const user = await User.findOne({
            where : {username: username},
            // include the profiles that follow this user 
            include : [{
                model: User,
                as: 'Followers',
                required: false,
                // attributes we want to remove from the User followers in response
                attributes: {
                    exclude: ['password', 'email']
                },
              }]
            }
        );

        // if user does not exist
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        // Get user's followers
        const followers = await user['Followers'];

        return res.status(200).json({
            // return the followee and follower
            followers,
            message: "User's followers fetched Successfully",
          });
    
    } catch (error) {
        throw error;
    }
};

exports.getUserFollowing = async (req, res) => {
    try {
        // user: Authenticated user's data (e.g., from middleware)
        const {params: { username }} = req;
        const user = await User.findOne({
            where : {username: username},
            // include the profiles that follow this user 
            include : [{
                model: User,
                as: 'Following',
                required: false,
                // attributes we want to remove from the User followings in response
                attributes: {
                    exclude: ['password', 'req.body', 'email']
                },
              }]
            }
        );

        // if User does not exist
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        // Get user's following
        const followings = await user['Following'];

        return res.status(200).json({
            // return following
            followings,
            message: "User's following fetched Successfully",
          });
    
    } catch (error) {
        throw error;
    }
};