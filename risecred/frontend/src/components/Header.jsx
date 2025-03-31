'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Switch, FormControlLabel } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";
import VendorProfile from "@/components/VendorProfile";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Load dark mode preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      if (storedDarkMode === "true") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const handleToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
    }
  };

  return (
    <header
      className={clsx(
        "fixed w-full p-4 shadow-md flex justify-between items-center transition-colors duration-300",
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      )}
    >
      {/* Logo & Title */}
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        RiseCred
      </h1>

      {/* Right Side: Dark Mode, Register, Profile */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          {darkMode ? <Sun className="mr-2 text-yellow-400" /> : <Moon className="mr-2 text-gray-500" />}
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleToggle} />}
            label=""
          />
        </div>

        {/* Register Button */}
        <button
          onClick={() => router.push("/register")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Vendor Profile */}
        <VendorProfile />
      </div>
    </header>
  );
};

export default Header;
