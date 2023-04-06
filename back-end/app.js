const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const controllers = require("./db/controllers");
const login = require("./login");
//const admin = require("./adminFunctions")
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', (req, res) => {
  controllers.getAllItems()
    .then(data => {
      res.status(200).send(data);
    })
});

app.get("/login", (req, res) => {
  auth.loginUser(req, res);
});

module.exports = app;