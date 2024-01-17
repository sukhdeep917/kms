const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../conn/db");

const hash = require("./hash");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
userRoutes.route("/record").get(async function (req, res) {
  try {
    let db_connect = await dbo.getDb();
    let result = await db_connect.collection("records").find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you get a single record by id
userRoutes.route("/record/:id").get(async function (req, res) {
  let db_connect = await dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  try {
    let result = await db_connect.collection("records").findOne(myquery);
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you create a new record.
userRoutes.route("/record/add").post(async function (req, res) {
  // console.log(dbo);

  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    description: req.body.description,
  };
  try {
    let result = await db_connect.collection("records").insertOne(myobj);
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you delete a record
userRoutes.route("/record/:id").delete(async function (req, res) {
  let db_connect = await dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };

  try {
    result = await db_connect.collection("records").deleteOne(myquery);
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you delete a record
userRoutes.route("/user/validate").post(async function (req, res) {
  let db_connect = await dbo.getDb();
  let myquery = { name: req.body.name };
  try {
    let user = await db_connect.collection("users").findOne(myquery);
    console.log(user);
    if (user) {
      hash.comparePassword(
        req.params.password,
        user.password,
        function (err, isPasswordMatch) {
          console.log(isPasswordMatch);
          if (isPasswordMatch) {
            res.json(user);
          } else {
            res.json(user);
            // res.status(401).send({ message: "Password is invalid" });
          }
        }
      );
    } else {
      res.status(401).send({ message: "Username not found" });
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you delete a record
userRoutes.route("/user/create").post(async function (req, res) {
  let db_connect = await dbo.getDb();
  hash.cryptPassword(req.body.password, async function (err, pass) {
    let myquery = {
      name: req.body.name,
      fullName: req.body.fullName,
      email: req.body.email,
      password: pass,
    };
    try {
      let result = await db_connect.collection("users").insertOne(myquery);
      res.json(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  });
});

// This section will help you get a list of all the records.
userRoutes.route("/projects").get(async function (req, res) {
  try {
    let db_connect = await dbo.getDb();
    let result = await db_connect.collection("projects").find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you create a new record.
userRoutes.route("/project/add").post(async function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    description: req.body.description,
  };
  try {
    let result = await db_connect.collection("projects").insertOne(myobj);
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you get a single record by id
userRoutes.route("/project/:id").get(async function (req, res) {
  let db_connect = await dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  try {
    let result = await db_connect.collection("projects").findOne(myquery);
    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you create a new record.
userRoutes.route("/project/:id").post(async function (req, res) {
  // console.log(dbo);
  let db_connect = dbo.getDb();
  var myobj = {
    $set: { title: req.body.title, description: req.body.description },
  };

  let myquery = { _id: new ObjectId(req.params.id) };
  try {
    let result = await db_connect
      .collection("projects")
      .updateOne(myquery, myobj);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = userRoutes;
