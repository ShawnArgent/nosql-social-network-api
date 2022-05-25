const router = require('express').Router();

const { getUsers, getUserById, addUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/:userId
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
