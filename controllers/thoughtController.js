const { Thought, User } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({ _id: params.id })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Create single thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate({ _id: params.id }, body, { $push: { thoughts: _id } }, { new: true });
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Not found.' });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found.' });
          return;
        }
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  addReaction({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { $push: { reactions: body } }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Reaction not found' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = thoughtController;
