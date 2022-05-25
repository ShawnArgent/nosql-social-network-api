const router = require('express').Router();

const { getThoughts, getThoughtById, addThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(addThought);

// /api/thought/
router.route('/').get(getThoughts).post(addThought);
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
