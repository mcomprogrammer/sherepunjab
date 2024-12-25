const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bank_management",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});


const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};


app.get("/customers", (req, res) => {
    const query = "SELECT * FROM customer";
    db.query(query, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});


app.post("/customers", (req, res) => {
    const { first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode } = req.body;
    const c_id = generateRandomId();
    const query = "INSERT INTO customer (c_id, first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [c_id, first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send({ message: "Customer added successfully", c_id });
    });
});


app.put("/customers/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode } = req.body;
    const query = "UPDATE customer SET first_name = ?, middle_name = ?, last_name = ?, dob = ?, contact = ?, email = ?, pan_no = ?, age = ?, address_area = ?, address_city = ?, address_pincode = ? WHERE c_id = ?";
    db.query(query, [first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode, id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send({ message: "Customer updated successfully" });
    });
});


app.delete("/customers/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM customer WHERE c_id = ?";
    db.query(query, [id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send({ message: "Customer deleted successfully" });
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
