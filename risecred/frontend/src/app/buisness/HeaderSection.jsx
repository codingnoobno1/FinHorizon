import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const HeaderSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #00bcd4, #00acc1)', // Cyan gradient
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        Following Societal Order and Earning Money, Side by Side.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontWeight: '300', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        RiseCred isn’t just a movement for fair labor — it’s a sustainable business model that generates revenue while uplifting the underserved. A true win-win for communities and investors.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          padding: '12px 30px',
          fontSize: '1.2rem',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#00bcd4', // Cyan hover color
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        See How RiseCred Powers Progress
      </Button>
    </motion.header>
  );
};

export default HeaderSection;
