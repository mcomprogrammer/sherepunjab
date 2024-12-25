import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

    const handleDelete = async (customerId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/customers/${customerId}`);
                alert("Customer deleted successfully!");
                fetchCustomers(); // Refresh customer list
            } catch (err) {
                setError("Error deleting customer. Please try again later.");
                console.error("Error deleting customer:", err);
            }
        }
    };

    return (
        <div>
            <h2>Delete Customer</h2>
            {loading && <p>Loading customers...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && customers.length === 0 && !error && (
                <p>No customers available to delete.</p>
            )}
            {customers.length > 0 && (
                <table border="1" style={{ width: "100%", marginTop: "20px" }}>
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
                                <td>
                                    {customer.first_name} {customer.last_name}
                                </td>
                                <td>{customer.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(customer.c_id)}
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DeleteCustomer;
