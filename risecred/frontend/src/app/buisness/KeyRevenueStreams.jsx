import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Collapse, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const KeyRevenueStreams = () => {
  const [openVendor, setOpenVendor] = useState(false);
  const [openCommission, setOpenCommission] = useState(false);
  const [openFinancial, setOpenFinancial] = useState(false);
  const [openDataInsights, setOpenDataInsights] = useState(false);
  const [openCSR, setOpenCSR] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case 'vendor':
        setOpenVendor(!openVendor);
        break;
      case 'commission':
        setOpenCommission(!openCommission);
        break;
      case 'financial':
        setOpenFinancial(!openFinancial);
        break;
      case 'dataInsights':
        setOpenDataInsights(!openDataInsights);
        break;
      case 'csr':
        setOpenCSR(!openCSR);
        break;
      default:
        break;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      style={{ padding: '2rem 0' }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Innovation That Pays. For Everyone.
      </Typography>

      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Vendor Subscription Plans */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Vendor Subscription Plans
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Vendors hosting RiseCred hardware operate as micro-ATMs and job facilitators...
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Over 80% of rural India remains underbanked — RiseCred Vendors provide direct financial access.
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => toggleSection('vendor')}
              color="primary"
            >
              {openVendor ? 'Hide Details' : 'See More Details'}
            </Button>
            <Collapse in={openVendor}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Detailed info about the Vendor Subscription Plans and how they help connect rural India to financial systems...
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>

        {/* Commission from Task Completion */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Commission from Task Completion
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Every time an NGO, MSME, or independent user assigns a task via RiseCred...
            </Typography>
            <Typography variant="body2" color="textSecondary">
              With over 450 million informal workers in India, RiseCred taps into a massive workforce...
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => toggleSection('commission')}
              color="primary"
            >
              {openCommission ? 'Hide Details' : 'See More Details'}
            </Button>
            <Collapse in={openCommission}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  More detailed info about the revenue generated from task completion and how it benefits the ecosystem...
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>

        {/* Financial Partnerships */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Financial Partnerships
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              We collaborate with banks and fintech providers to facilitate seamless payments...
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Micro-ATM usage in rural India has grown by 150% in the past two years...
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => toggleSection('financial')}
              color="primary"
            >
              {openFinancial ? 'Hide Details' : 'See More Details'}
            </Button>
            <Collapse in={openFinancial}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Further insights into our financial partnerships and the growth of micro-ATM usage across rural India...
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>

        {/* Data Insights & Impact Reports */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Data Insights & Impact Reports
            </Typography>
            <Typography variant="body2" color="textSecondary">
              With aggregated, anonymized data, RiseCred generates valuable insights...
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => toggleSection('dataInsights')}
              color="primary"
            >
              {openDataInsights ? 'Hide Details' : 'See More Details'}
            </Button>
            <Collapse in={openDataInsights}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Insights on how data-driven decisions lead to more impactful community development...
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>

        {/* Corporate Social Responsibility (CSR) Partnerships */}
        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Corporate Social Responsibility (CSR) Partnerships
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Corporations looking to meet CSR goals can directly fund RiseCred projects...
            </Typography>
            <Typography variant="body2" color="textSecondary">
              India mandates that companies spend 2% of their net profits on CSR initiatives...
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => toggleSection('csr')}
              color="primary"
            >
              {openCSR ? 'Hide Details' : 'See More Details'}
            </Button>
            <Collapse in={openCSR}>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  How CSR partnerships help fund RiseCred's initiatives and contribute to social good...
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      </Box>
    </motion.section>
  );
};

export default KeyRevenueStreams;
