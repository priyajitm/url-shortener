const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../model/Url');

// @route   POST    /api/genurl
// @desc    Generate a short URL from original URL
// @access  Public
router.post('/', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseURI');

  // console.log('111', longUrl);

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create URL Code
  const urlCode = shortid.generate();

  // Check long URL
  if (validUrl.isUri(longUrl)) {
    console.log(longUrl);
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(401).json('Invalid long Url');
  }
});

module.exports = router;
