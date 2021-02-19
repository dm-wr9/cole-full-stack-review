require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const ctrl = require("./controller");

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("database connected");
  })
  .catch((err) => console.log(`Massive error: ${err}`));

//# login, register, add_to_cart, get_cart, delete_from _cart

//# Auth endpoints
app.post("/api/register", ctrl.register);
app.post("/api/login", ctrl.login);
app.delete("/api/logout", ctrl.logout);
//# Cart endpoints
app.get("/api/cart");
app.post("/api/cart");
app.delete("/api/cart");

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`server running on port ${port}`));
