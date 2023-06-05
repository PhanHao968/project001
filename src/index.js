const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const hbs = require("express-handlebars");
require("dotenv").config();
const db = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// url db ->
//connect to db
db.connect();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(methodOverride("_method"));
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control_Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,");
    return res.status(200).json({});
  }
  next();
});

const route = require("./routes");

//Route init
route(app);

//server.listen(port);
app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});