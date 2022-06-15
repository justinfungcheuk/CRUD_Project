require("./models/db");

const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const studentController = require("./controllers/studentController");

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(express.static("public"));

app.engine("handlebars", engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("view engine", "handlebars");
app.set('views', './views');
app.use(morgan("tiny"));


app.use("/student", studentController);


app.listen(3333, () => {
    console.log("Express server started at port: 3333");
});
