const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/add', async (req, res) => {
    const { userId, movieId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.list.push(movieId);
        await user.save();
        res.status(200).json({ message: 'Movie added to list' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;