// biometrics/FingerprintScan.js
import { useState } from "react";
import axios from "axios";

const FingerprintScan = ({ setLoading }) => {
  const [biometricStatus, setBiometricStatus] = useState(null);

  const handleFingerprintScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/fingerprint-scan", {
        // Send fingerprint scan data if needed
      });
      setBiometricStatus(response.data.message);
    } catch (error) {
      setBiometricStatus("Fingerprint Scan Failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleFingerprintScan}
        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
      >
        {biometricStatus === "Scanning..." ? "Scanning..." : "Fingerprint Scan"}
      </button>
      <p className="mt-3 text-blue-600">{biometricStatus}</p>
    </div>
  );
};

export default FingerprintScan;
