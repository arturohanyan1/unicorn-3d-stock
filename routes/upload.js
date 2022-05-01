const router = require('express').Router();
const multer = require('multer');
const { Listing } = require('../db/models');

const upload = multer({ dest: 'public/uploads/' });

router.get('/', (req, res) => {
  res.render('entries/addEdit');
});

router.post('/', upload.array('Photo-1'), (req, res) => {
  const pathArr = req.files.map((elem) => elem.path.slice(7));
  let file = "/" + pathArr[pathArr.length - 1];
  const newPath = pathArr.slice(0, pathArr.length - 1).map(e => '/' + e).join(', ');
  const prevImage = pathArr[0]
  const listing = Listing.create({
    name: req.body.name, description: req.body.description, price: req.body.price, sku: 'ABC', modelLink: file, modelImage: newPath, mainImage: prevImage, user_id: req.session.userId,
  });
  res.redirect('/');
});

module.exports = router;
