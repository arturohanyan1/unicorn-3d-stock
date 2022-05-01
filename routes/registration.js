const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const nodeMailer = require("../nodeMailer");

router.get("/", (req, res) => {
  res.render("entries/registrationForm");
});

router.post("/new", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const addUser = await User.create({ name, password: hashPassword, email });
    req.session.user = addUser.name;
    req.session.userId = addUser.id;
    req.session.basket = [];

    if (!addUser.name || !addUser.password || !addUser.email)
      return res.sendStatus(400);

    const message = {
      to: addUser.email,
      subject: "Registration credentials",
      html: `
      <h2>Thank you for your recent registration with Galactic Miniatures!</h2>
      
      <ul>
          <li>Your login: ${addUser.name}</li>
          <li>Your password: ${password}</li>
      </ul>
      
      <p>We kindly remind you to keep this information confidential.</p>

      <p>Once again we would like to thank you for doing business with us and to extend our best wishes.</p>

      <p>Galactic Miniatures Team.</p>`,
    };

    nodeMailer(message);

    res.json(addUser);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});
module.exports = router;
