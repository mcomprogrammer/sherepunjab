import React, { useState } from "react";
import axios from "axios";

const InsertCustomer = () => {
    const [formData, setFormData] = useState({
        First_name: "",
        Middle_name: "",
        Last_name: "",
        DOB: "",
        Contact: "",
        Email: "",
        Pan_no: "",
        Age: "",
        Address_area: "",
        Address_city: "",
        Address_pincode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/customers", formData)
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Insert Customer</h2>
            {Object.keys(formData).map((key) => (
                <div key={key}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default InsertCustomer;
