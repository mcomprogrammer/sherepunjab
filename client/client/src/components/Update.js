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
        age: "",
        address_area: "",
        address_city: "",
        address_pincode: "",
    });

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

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer.c_id);
        setFormData({ ...customer });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/customers/${selectedCustomer}`, formData);
            alert("Customer updated successfully!");
            fetchCustomers(); // Refresh customer list
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div>
            <h2>Update Customer</h2><br/>
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
                            <td>{customer.first_name}{" "}{customer.last_name}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => handleSelectCustomer(customer)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedCustomer && (
                <form onSubmit={handleSubmit}>
                    <h3>Update Details for Customer ID: {selectedCustomer}</h3>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default UpdateCustomer;
