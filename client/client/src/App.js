import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import InsertCustomer from "./components/Insert";
import UpdateCustomer from "./components/Update";
import DeleteCustomer from "./components/Delete";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/insert">Insert Customer</Link></li>
                        <li><Link to="/update">Update Customer</Link></li>
                        <li><Link to="/delete">Delete Customer</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/insert" element={<InsertCustomer />} />
                    <Route path="/update" element={<UpdateCustomer />} />
                    <Route path="/delete" element={<DeleteCustomer />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
