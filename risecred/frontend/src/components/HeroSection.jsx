import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";

const HeroSection = () => {
  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Hero Section with Soft Blue-Red Tint */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center text-center px-6 py-16 
                   bg-gradient-to-br from-blue-100 via-white to-red-100 min-h-screen"
      >
        {/* Main Content */}
        <div className="flex flex-col items-center bg-white bg-opacity-90 p-8 rounded-lg 
                        shadow-md border border-blue-200 max-w-3xl">
          
          {/* Title */}
          <h1 className="text-4xl font-semibold text-gray-800">
            The Silent Backbone of India,<br /> Broken by Exploitation.
          </h1>

          {/* Image */}
          <div className="my-6">
            <Image
              src="http://www.milwaukeeindependent.com/wp-content/uploads/2022/09/090422_LaborUnion_01_JohnGomez.jpg"
              alt="Labor Union Protest"
              width={400}
              height={250}
              className="rounded-md shadow-md border border-gray-300"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mt-2 leading-relaxed">
            Millions of laborers are underpaid, overworked, and unrecognized.
            <br />
            It's time to rise for them. It's time for <strong>RiseCred</strong>.
          </p>

          {/* Call to Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-red-600 text-white font-medium px-6 py-3 rounded-md 
                       shadow-sm hover:bg-red-700 transition duration-300"
          >
            Join the Movement
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;
