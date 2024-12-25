const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pranav", // Ensure this password is correct
    database: "bank_management",
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: ", err.stack);
        process.exit(1); // Exit process if connection fails
    }
    console.log("Connected to MySQL database");
});

// Function to generate a random customer ID
const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Fetch all customers
app.get("/customers", (req, res) => {
    const query = "SELECT * FROM customer";
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching customers: ", err);
            return res.status(500).send({ error: "Error fetching customers." });
        }
        res.json(result);
    });
});

// Add new customer
app.post("/customers", (req, res) => {
    const { first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode } = req.body;

    // Validate the required fields
    if (!first_name || !last_name || !dob || !contact || !email || !address_area || !address_city || !address_pincode) {
        return res.status(400).send({ error: "All fields are required." });
    }

    const c_id = generateRandomId();
    const query = "INSERT INTO customer (c_id, first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [c_id, first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode], (err, result) => {
        if (err) {
            console.error("Error adding customer: ", err);
            return res.status(500).send({ error: "Error adding customer. Please try again later." });
        }
        res.send({ message: "Customer added successfully", c_id });
    });
});

// Update customer details
app.put("/customers/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, middle_name, last_name, dob, contact, email, pan_no, age, address_area, address_city, address_pincode } = req.body;

    // Validate the required fields
    if (!first_name || !last_name || !dob || !contact || !email || !address_area || !address_city || !address_pincode) {
        return res.status(400).send({ error: "All fields are required." });
    }

    // Format dob (ensure it's in the correct format: YYYY-MM-DD)
    const formattedDob = new Date(dob).toISOString().split('T')[0];

    // Check if customer exists before updating
    const checkQuery = "SELECT * FROM customer WHERE c_id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) {
            console.error("Error checking if customer exists: ", err);
            return res.status(500).send({ error: "Error checking customer existence." });
        }

        if (result.length === 0) {
            return res.status(404).send({ error: "Customer not found." });
        }

        // Proceed with the update query if customer exists
        const query = "UPDATE customer SET first_name = ?, middle_name = ?, last_name = ?, dob = ?, contact = ?, email = ?, pan_no = ?, age = ?, address_area = ?, address_city = ?, address_pincode = ? WHERE c_id = ?";
        db.query(query, [first_name, middle_name, last_name, formattedDob, contact, email, pan_no, age, address_area, address_city, address_pincode, id], (err, result) => {
            if (err) {
                console.error("Error updating customer: ", err);
                return res.status(500).send({ error: "Error updating customer. Please try again later." });
            }
            res.send({ message: "Customer updated successfully" });
        });
    });
});

// Delete a customer
app.delete("/customers/:id", (req, res) => {
    const { id } = req.params;

    // Check if customer exists before deleting
    const checkQuery = "SELECT * FROM customer WHERE c_id = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) {
            console.error("Error checking if customer exists: ", err);
            return res.status(500).send({ error: "Error checking customer existence." });
        }

        if (result.length === 0) {
            return res.status(404).send({ error: "Customer not found." });
        }

        // Proceed with deletion if customer exists
        const query = "DELETE FROM customer WHERE c_id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error deleting customer: ", err);
                return res.status(500).send({ error: "Error deleting customer. Please try again later." });
            }
            res.send({ message: "Customer deleted successfully" });
        });
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
