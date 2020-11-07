const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Declaration = require("./models/Declaration.model");
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected Successfuly To DB!");
});

mongoose.connection.on("error", () => {
  console.log("Failed Connect To DB!!!");
});

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.get("/data", (req, res) => {
  Declaration.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.post("/send-data", (req, res) => {
  const declaration = new Declaration({
    name: req.body.name,
    photo: req.body.photo,
    person: req.body.person,
    place: req.body.place,
    cin: req.body.cin,
    phone: req.body.phone,
  });
  declaration
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.post("/delete-data", (req, res) => {
  Declaration.findByIdAndRemove(req.body._id)
    .then((data) => {
      console.log(data);
      res.send("Deleted");
    })
    .catch((err) => console.log(err));
});

app.post("/update-data", (req, res) => {
  Declaration.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    photo: req.body.photo,
    person: req.body.person,
    place: req.body.place,
    cin: req.body.cin,
    phone: req.body.phone,
  })
    .then((data) => {
      console.log(data);
      res.send("Updated");
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("Server Running!");
});
