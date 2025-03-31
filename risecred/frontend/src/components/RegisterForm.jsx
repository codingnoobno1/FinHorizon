'use client';
import { useState } from "react";
import FaceRecognition from "@components/FaceRecognition";
import FingerprintScan from "@components/FingerprintScan";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    aadhaar: "",
    pan: "",
    annualIncome: "",
    rationCard: "no",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    // API call to store user data
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Create an Account</h2>
      <p className="text-gray-500 mb-6">Sign up with your details or use biometric authentication.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Aadhaar Number */}
        <input
          type="text"
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          placeholder="Aadhaar Number (12 digits)"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* PAN Card */}
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="PAN Card Number"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Annual Income */}
        <input
          type="number"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleChange}
          placeholder="Annual Income (in ₹)"
          className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Ration Card (BPL) */}
        <label className="text-gray-600">
          Do you have a BPL/Ration Card?
          <select
            name="rationCard"
            value={formData.rationCard}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ml-2"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {/* Register Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      {/* Biometric Authentication */}
      <div className="mt-6">
        <p className="text-gray-600">Or register with biometrics:</p>
        <div className="flex justify-center gap-4 mt-3">
          <FingerprintScan setLoading={setLoading} />
          <FaceRecognition setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
