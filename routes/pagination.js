const router = require('express').Router();
const { Listing } = require('../db/models');

router.get('/:id', async (req, res) => {
  const allCards = await Listing.findAll({ order: [['createdAt', 'DESC']], raw: true });
  const notesOnPage = 8;
  const pageNum = req.params.id;
  const start = (pageNum - 1) * notesOnPage;
  const end = start + notesOnPage;
  allCards.map((elem) => elem.modelImage = elem.modelImage.split(', ')[0]);
  const currNote = allCards.slice(start, end);

  const arrLength = Math.ceil(allCards.length / notesOnPage);
  const btnArr = [];
  for (let i = 0; i < arrLength; i++) {
    btnArr.push({ href: `/page/${i + 1}`, name: i + 1 });
  }
  console.log(currNote, btnArr);
  res.render('entries/main', { currNote, btnArr });
});

module.exports = router;
