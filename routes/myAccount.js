/* eslint-disable max-len */
const router = require('express').Router();

const { User, Listing, Order } = require('../db/models');

router.get('/', async (req, res) => {
  const id = req.session.userId;
  const user = await User.findOne({ where: { id }, raw: true });
  const { basket } = req.session;

  const newArr = [];
  for (let i = 0; i < basket.length; i++) {
    const download = await Listing.findOne({ where: { id: basket[i] }, raw: true });
    newArr.push(download);
  }

  res.render('./entries/myAccount', { user, newArr });
});

router.get('/creator', async (req, res) => {
  const id = req.session.userId;
  await User.update({ isCreater: true }, { where: { id } });
  res.redirect('/myAccount/downloads');
});

router.get('/downloads', async (req, res) => {
  let allBuysId = await Order.findAll({ where: { userId: req.session.userId }, attributes: ['listingId'], raw: true });
  allBuysId = allBuysId.map((elem) => elem.listingId);
  const allBuysArr = [];
  for (let i = 0; i < allBuysId.length; i++) {
    const oneBuys = await Listing.findOne({ where: { id: allBuysId[i] }, raw: true });
    allBuysArr.push(oneBuys);
  }
  const id = req.session.userId;
  const user = await User.findOne({ where: { id }, raw: true });
  console.log(allBuysArr);
  res.render('entries/DownloadsList', { allBuysArr, user });
});

router.get('/listings', async (req, res) => {
  const id = req.session.userId;
  const user = await User.findOne({ where: { id }, raw: true });
  const allListings = await Listing.findAll({ where: { user_id: req.session.userId }, raw: true });
  console.log(allListings);
  res.render('entries/ListingsList', { allListings, user });
});

module.exports = router;
