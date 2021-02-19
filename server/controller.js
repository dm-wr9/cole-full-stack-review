const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    //! Step 1
    let foundUser = await db.check_email(email);
    //# foundUser will either be the user with the email we
    //# gave it or it will be undefined
    foundUser = foundUser[0];

    if (foundUser) {
      //# this means someone already registered with
      //# that email
      //! Step 2
      res.status(500).send("User already exists");
    } else {
      //# this means we can go ahead and register them
      //! Step 3
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      //! Step 4
      let user = await db.register([email, hash]);
      user = user[0];
      //! Step 5
      req.session.user = { ...user };
      //! Step 6
      res.status(200).send({ ...user });
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    //! Step 1
    let foundUser = await db.check_email(email);
    foundUser = foundUser[0];
    //! Step 2
    if (foundUser) {
      //! Step 3
      const hash = foundUser.password;
      const authenticated = bcrypt.compareSync(password, hash);
      if (authenticated) {
        //! Step 5
        delete foundUser.password;
        //! Step 6
        req.session.user = { ...foundUser };
        //! Step 7
        res.status(200).send({ ...foundUser });
      } else {
        //! Step 4
        res.status(500).send("Invalid email or password");
      }
    } else {
      res.status(500).send("Invalid email or password");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getCart: async (req, res) => {},
  addToCart: async (req, res) => {},
  deleteFromCart: async (req, res) => {},
};
