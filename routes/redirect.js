const express = require('express');
const router = express.Router();
const reqdata = require('../middleware/reqdata');

const Url = require('../model/Url');

// @route   GET    /:code
// @desc    Get existing URL's
// @access  Private

router.get('/:code', reqdata, async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No Url found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
