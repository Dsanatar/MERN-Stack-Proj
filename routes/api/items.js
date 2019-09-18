const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model to make queries
const Item = require('../../models/Items');

// @route   GET api/items
// @desc    Get All items
// @access  Public

//NOTE: we are already in endpoint api/item bc of how we defined it in server.js
//      so we are simply referecing that endpoint
router.get('/', (req, res) => {
    //Fetch All items from db
    Item.find()
        //-1 = sort by descending
        .sort({ date: -1})
        .then(items => res.json(items));
});

// @route   Post api/items
// @desc    Create new item
// @access  Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   Delete api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.deleteOne({ _id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;