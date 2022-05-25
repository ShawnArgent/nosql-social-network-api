const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.id,
      });
      if (!thought) {
        res.status(400).json({
          message: 'Thought not found.',
        });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async addThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          _id: req.body.userId,
          thoughts: { $ne: newThought._id },
        },
        { $push: { thoughts: newThought._id } },
        {
          new: true,
          unique: true,
        }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        }
      );
      if (!updatedThought) {
        res.status(404).json({
          message: 'Thought not found.',
        });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deleteThought) {
        res.status(404).json({
          message: 'Thought not found.',
        });
        return;
      }
      const user = await User.findOneAndUpdate(
        {
          thoughts: { $eq: req.params.id },
        },
        { $pull: { thoughts: req.params.id } },
        {}
      );
      res.json(deleteThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thoughtReaction = await Thought.findOne({ _id: req.params.id });
      if (!thoughtReaction) {
        res.status(404).json({
          message: 'Thought not found.',
        });
      }
      thoughtReaction.reactions.push(req.body);
      res.json(thoughtReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const deleteReaction = await Thought.findOne({ _id: req.params.id });
      if (!thoughtReaction) {
        res.status(404).json({
          message: 'Thought not found.',
        });
      }
      deleteReaction.reactions.id(req.body.reactionId).remove();
      res.json(thoughtReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
