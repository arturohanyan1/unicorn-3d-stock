const router = require('express').Router();
const { Listing } = require('../db/models');

router.get('/:id', async (req, res) => {
  const currListing = await Listing.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const srcImg = currListing.modelImage.split(', ');
  const srcImgZero = srcImg[0];
  currListing.srcImg = srcImg;
  currListing.srcImgZero = srcImgZero;
  res.render('entries/listing', currListing);
});

router.post('/add/:id', async (req, res) => {
  try {
    const product = req.body.id;
    if (!req.session.basket.includes(req.body.id)) {
      req.session.basket.push(product);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

module.exports = router;
