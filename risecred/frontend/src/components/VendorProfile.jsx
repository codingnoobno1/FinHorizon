import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

const VendorProfile = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex justify-center items-center"
    >
      {/* Circular Profile Card */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetails(!showDetails)}
        className="cursor-pointer"
      >
        <Avatar
          src="/images/ram-prasad.jpg"
          alt="Ram Prasad"
          sx={{
            width: 50,
            height: 50,
            border: "3px solid #D1D5DB",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </motion.div>

      {/* Details Popup (Shown on Hover or Click) */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-14 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-60 z-50"
        >
          <Card className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
            <CardContent className="text-center">
              <Typography variant="h6" className="text-gray-900 dark:text-white font-bold">
                Ram Prasad
              </Typography>
              <Typography variant="body2" className="text-gray-600 dark:text-gray-300 mt-1">
                RiseCred Agent ensuring fair wages & transparency.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VendorProfile;
