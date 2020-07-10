const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Url = require('../model/Url');

// @route   GET    /api/url
// @desc    Get existing URL's
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const url = await Url.find({ user: req.user.id });

    res.json(url);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   POST    /api/url
// @desc    Add new URL
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new URL');
});

// @route   PUT   /api/url/:id
// @desc    Update existing URL
// @access  Private
router.put('/:id', async (req, res) => {
  const { newcode } = req.body;

  console.log('oldcode', req.params.id);
  console.log('newcode', newcode);

  const newurlcode = {
    shortUrl: `http://localhost:5000/${newcode}`,
    urlCode: newcode,
  };

  try {
    // const url = await Url.find({ urlCode: req.params.id });

    // console.log(url);

    const response = await Url.findOneAndUpdate(
      req.params.id,
      { $set: newurlcode },
      { new: true }
    );

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   DELETE    /api/url/:id
// @desc    Delete a URL
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete a URL');
});

module.exports = router;
