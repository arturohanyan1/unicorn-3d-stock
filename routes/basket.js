const router = require('express').Router();
const { create } = require('hbs');
const { Listing, Order } = require('../db/models');

router.get('/', async (req, res) => {
  const basketId = req.session.basket;
  const itemsArr = [];
  for (let i = 0; i < basketId.length; i++) {
    const item = await Listing.findOne({
      where: { id: basketId[i] },
      raw: true,
    });
    const srcImg = item.modelImage.split(', ');
    const srcImgZero = srcImg[0];
    item.srcImg = srcImg;
    item.srcImgZero = srcImgZero;

    itemsArr.push(item);
  }
  const priceSum = itemsArr.reduce((acc, curr) => acc + curr.price, 0);

  res.render('entries/basket', { itemsArr, priceSum });
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const basketId = req.session.basket;
    const index = basketId.indexOf(id);
    const newBasket = basketId.splice(index, 1);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.get('/proceed', (req, res) => {
  const arr = req.session.basket
  const newArr = arr.forEach(async (e) => {
    const oreder = Order.create({userId: req.session.userId, listingId: e})
  })
  res.redirect('/myAccount/')
})

module.exports = router;
