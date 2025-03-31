'use client';
import React from 'react';
import { Container, Typography, Card, CardContent, Button, Collapse, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Import individual sections
import HeaderSection from './HeaderSection';
import RevenueModelSection from './RevenueModelSection';
import KeyRevenueStreams from './KeyRevenueStreams';
import SocioEconomicImpact from './SocioEconomicImpact';
import WhyInvestSection from './WhyInvestSection';

const Page = () => {
  const [openDetails, setOpenDetails] = React.useState(false);

  const toggleDetails = () => setOpenDetails((prev) => !prev);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <RevenueModelSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <KeyRevenueStreams />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <SocioEconomicImpact />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <WhyInvestSection />
      </motion.div>

      {/* Detail Cards Section */}
      <Box sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5">Details Section</Typography>
              <Button onClick={toggleDetails} variant="contained" color="primary">
                {openDetails ? 'Close Details' : 'Open Details'}
              </Button>
            </CardContent>
            <Collapse in={openDetails}>
              <CardContent>
                <Typography variant="body1">
                  Here are the details about this section. You can add more information here, such as
                  explanations, images, or charts.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Page;
