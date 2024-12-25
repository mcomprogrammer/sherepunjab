import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        contact: "",
        email: "",
        pan_no: "",
        address_area: "",
        address_city: "",
        address_pincode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch customers data from the server
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/customers");
            setCustomers(response.data);
        } catch (err) {
            setError("Error fetching customers. Please try again later.");
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle customer selection to update
    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer.c_id);
        setFormData({ ...customer }); // Set formData from the selected customer
    };

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission to update customer details
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Format the dob to MySQL compatible date format (YYYY-MM-DD)
            const { dob, ...updateData } = formData;
            const formattedDob = new Date(dob).toISOString().split('T')[0];
            updateData.dob = formattedDob;

            // Send the update request to the backend
            const response = await axios.put(`http://localhost:5000/customers/${selectedCustomer}`, updateData);

            alert("Customer updated successfully!");
            fetchCustomers(); // Refresh customer list
            setSelectedCustomer(null); // Deselect customer after update
        } catch (err) {
            console.error("Error updating customer:", err);

            if (err.response) {
                setError(`Error: ${err.response.data.error || "An unexpected error occurred."}`);
            } else {
                setError("Error updating customer. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Customer</h2>
            {loading && <p>Loading customers...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && customers.length === 0 && !error && (
                <p>No customers available to update.</p>
            )}

            {customers.length > 0 && (
                <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.c_id}>
                                <td>{customer.c_id}</td>
                                <td>{customer.first_name} {customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleSelectCustomer(customer)}
                                        style={{
                                            backgroundColor: "blue",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedCustomer && (
                <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                    <h3>Update Details for Customer ID: {selectedCustomer}</h3>
                    {Object.keys(formData).map((key) => (
                        key !== "c_id" && (
                            <div key={key} style={{ marginBottom: "10px" }}>
                                <label style={{ display: "block", marginBottom: "5px" }}>
                                    {key.replace("_", " ").toUpperCase()}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        )
                    ))}
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                        }}
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateCustomer;
