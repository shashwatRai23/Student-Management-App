import React, { useEffect, useState } from "react";
import "./AddUpdate.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase.js";

const AddUpdate = () => {
  // Inital State of the form
  const initialState = {
    firstName: "",
    lastName: "",
    middleName: "",
    class: "",
    division: "",
    rollNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    pincode: "",
  };
  // fetching id
  const { id } = useParams();
  const navigate = useNavigate();


  const [data, setData] = useState({ initialState });
 
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    db.child("students").on("value", (snapshot) => {
      if (snapshot.val() != null) setData({ ...snapshot.val() });
      else setData({});
    });
    return () => {
      setData({});
    };
  }, []);

  useEffect(() => {
    if (id) {
      setFormData({ ...data[id] });
    } else {
      setFormData({ ...initialState });
    }
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.class ||
      !formData.division ||
      !formData.rollNumber ||
      !formData.addressLine1 ||
      !formData.addressLine2 ||
      !formData.landmark ||
      !formData.pincode ||
      !formData.city
    ) {
      toast.error("All Credential required");
    } else {
      if (formData.pincode.length != 6) {
        toast.error("Please enter a valid pincode");
        return;
      }
      if (!id) {
        db.child("students").push(formData, (err) => {
          if (err) toast.error(err);
        });
        toast.success("Student added successfully");
        navigate("/");
      } else {
        db.child(`students/${id}`).set(formData, (err) => {
          if (err) toast.error(err);
        });
        toast.success("Updated successfully");
        navigate("/");
      }
    }
  };
  return (
    <div className="add_student">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Middle Name"
            name="middleName"
            onChange={handleChange}
            value={formData.middleName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <div>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option selected>Select Class</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <select
            name="division"
            onChange={handleChange}
            value={formData.division}
          >
            <option selected>Select Division</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <input
            type="number"
            placeholder="Enter roll no."
            onChange={handleChange}
            name="rollNumber"
            value={formData.rollNumber}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address Line 1"
            onChange={handleChange}
            name="addressLine1"
            value={formData.addressLine1}
          />
          <input
            type="text"
            placeholder="Address Line 2"
            onChange={handleChange}
            name="addressLine2"
            value={formData.addressLine2}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Landmark"
            onChange={handleChange}
            value={formData.landmark}
            name="landmark"
          />
          <input
            type="text"
            placeholder="City"
            onChange={handleChange}
            value={formData.city}
            name="city"
          />
          <input
            type="number"
            placeholder="Pincode"
            onChange={handleChange}
            value={formData.pincode}
            name="pincode"
          />
        </div>
        <button type="submit">{id ? "Update" : "Add Student"}</button>
      </form>
    </div>
  );
};

export default AddUpdate;
