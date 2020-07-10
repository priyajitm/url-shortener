const Url = require('../model/Url');

module.exports = async function (req, res, next) {
  //   console.log(`${req.method} ${req.originalUrl}`);

  const urlCode = req.originalUrl.slice(1);

  const geturl = await Url.findOne({ urlCode });

  if (geturl) {
    console.log(geturl);
    const id = geturl._id;
    console.log(id);
    try {
      let oldclicks = geturl.clicks;
      const addclicks = {
        clicks: oldclicks + 1,
      };

      console.log(oldclicks, addclicks);

      await Url.findOneAndUpdate(
        { _id: geturl._id },
        { $set: addclicks },
        { new: true }
      );
    } catch (err) {
      console.error(err.message);
    }
  } else {
    res.json('No URL found');
  }

  next();
};
