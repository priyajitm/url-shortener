const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const { register, genUrl } = require('../middleware/genurl-register');

const app = express();

const Url = require('../model/Url');

// @route   POST    /api/genurl
// @desc    Generate a short URL from original URL
// @access  Public
router.post('/', (req, res) => {
  const { longUrl, email, password, name } = req.body;
  const baseUrl = config.get('baseURI');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  //   if (email && password && name) {
  //     // Register User
  //     res.send(register(email, password, name));
  //   }

  res.send(genUrl(longUrl, baseUrl));
});

module.exports = router;
