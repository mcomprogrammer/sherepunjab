import React, { useState } from "react";
import axios from "axios";

const InsertCustomer = () => {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/customers", formData)
            .then((response) => {
                alert(response.data.message);
                setFormData({
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
            })
            .catch((error) => {
                console.error("Error adding customer:", error);
                alert("Failed to add customer. Please try again.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Insert Customer</h2>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Middle Name</label>
                <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Contact</label>
                <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>PAN Number</label>
                <input
                    type="text"
                    name="pan_no"
                    value={formData.pan_no}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address Area</label>
                <input
                    type="text"
                    name="address_area"
                    value={formData.address_area}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address City</label>
                <input
                    type="text"
                    name="address_city"
                    value={formData.address_city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address Pincode</label>
                <input
                    type="number"
                    name="address_pincode"
                    value={formData.address_pincode}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default InsertCustomer;
