'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const router = useRouter();

  const handleJoinMovement = () => {
    router.push('/aboutmovement'); // Navigate to /aboutmovement route
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="p-12 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white"
    >
      <h2 className="text-4xl font-bold">Rise Against Exploitation. Rise for Dignity. RiseCred.</h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={handleJoinMovement} // Attach the click handler
        className="mt-6 bg-white text-blue-800 px-6 py-3 rounded-lg shadow-lg"
      >
        Join the Movement
      </motion.button>
    </motion.div>
  );
};

export default CTASection;
