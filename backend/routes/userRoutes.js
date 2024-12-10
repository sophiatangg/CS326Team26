const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const { followUser, unfollowUser, getUserFollowers, getUserFollowing,updateUserProfile, getConnectedUserProfileInfo,getUserProfile} = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Update user profile
router.put('/profileupdate', authenticate , updateUserProfile);

// get other user profile
router.get('/otherprofile',  getUserProfile);

// get connected user profile
router.get('/profile', authenticate , getConnectedUserProfileInfo);

// follow user with username of followee as params
router.put('/follow/:username',authenticate , followUser);

// unfollow user with username of followee as params
router.put('/unfollow/:username',authenticate, unfollowUser);

// get user's followers 
router.get('/followers/:username', getUserFollowers);

// get user's following
router.get('/following/:username', getUserFollowing);

module.exports = router;
