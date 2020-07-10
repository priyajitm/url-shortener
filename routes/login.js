const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // Calling in express-validator
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');

// @route   POST    /api/login
// @desc    Login user
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Validating
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json('Invalid Credential');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json('Invalid Credential');
      }

      // Creating a Payload to add userid to JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generating token
      jwt.sign(
        payload,
        config.get('jwtsecret'), // This is a secret key needs by JWT to create token. This key is in the default JSON file which is being called using config module
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // Need to remove this later
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

module.exports = router;
