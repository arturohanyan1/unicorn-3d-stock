
const router = require('express').Router();

router.get('/', async (req, res) => {
  if (req.session.user) {
    await req.session.destroy();
    res.clearCookie('MyCookieName');
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
