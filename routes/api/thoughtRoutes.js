const router = require('express').Router();

const { getThoughts, getThoughtById, addThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(addThought);

// /api/thought/
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reaction').post(addReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
