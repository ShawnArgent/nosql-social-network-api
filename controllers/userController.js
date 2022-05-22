const { User, Thought } = require('../models');

const userController = {
  getUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User Not Found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  addUser({ body }, res) {
    User.create(body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(({ username }) => {
        return Thought.deleteMany({ username });
      })
      .then(() => {
        return User.updateMany({ friends: { _id: params.id } }, { $pull: { friends: params.id } }, { new: true, runValidators: true });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Not found.' });
          return;
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      {
        $push: { friends: params.friendId },
      },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      {
        $pull: { friends: params.friendId },
      },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = userController;
