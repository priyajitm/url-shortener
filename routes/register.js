const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // Calling in express-validator
const bcrypt = require('bcryptjs');

const User = require('../model/User');

// @route   POST    /api/register
// @desc    Register new user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be 6 characters or more').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Validating
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json('User Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

module.exports = router;
