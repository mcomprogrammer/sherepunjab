import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteCustomer = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const handleDelete = async (customerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/customers/${customerId}`);
                alert("Customer deleted successfully!");
                fetchCustomers(); // Refresh customer list
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    return (
        <div>
            <h2>Delete Customer</h2><br/>
            <table border="1" style={{ width: "100%" }}>
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
                            <td>{customer.first_name}{" "}{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => handleDelete(customer.c_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteCustomer;
