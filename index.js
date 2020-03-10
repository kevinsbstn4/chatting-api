const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "kevin",
  password: "0000",
  database: "appchatingv1"
});

//connect to database
conn.connect(err => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//show all products
app.get("/api/pesan", (req, res) => {
  let sql = "SELECT * FROM pesan";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(({ 
        "status": 200,
        "error": null,
        "response": results }));
  });
});

//show single product
app.get("/api/pesan/:id", (req, res) => {
  let sql = "SELECT * FROM pesan WHERE id_pesan=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(({
        "status": 200,
        "error": null,
        "response": results }));
  });
});

//add new product
app.post("/api/pesan", (req, res) => {
  let data = {
    isi_pesan: req.body.isi_pesan,
    pengirim: req.body.pengirim
  };
  let sql = "INSERT INTO pesan SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.json(({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//update product
app.put("/api/pesan/:id", (req, res) => {
  let sql =
    "UPDATE pesan SET isi_pesan='" +
    req.body.isi_pesan +
    "', pengirim='" +
    req.body.pengirim +
    "' WHERE id_pesan=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(({ 
        "status": 200,
        "error": null,
        "response": results }));
  });
});

//Delete product
app.delete("/api/pesan/:id", (req, res) => {
  let sql = "DELETE FROM pesan WHERE id_pesan=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(({ 
        "status": 200, 
        "error": null, 
        "response": results }));
  });
});

//Server listening
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
