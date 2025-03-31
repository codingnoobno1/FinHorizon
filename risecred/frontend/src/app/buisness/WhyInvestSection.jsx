import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styling components with Material-UI's styled API
const Section = styled('section')({
  padding: '40px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const SectionHeading = styled(Typography)({
  fontSize: '2rem',
  color: '#333',
  fontWeight: 700,
});

const IntroText = styled(Typography)({
  fontSize: '1.2rem',
  color: '#555',
  marginBottom: '20px',
});

const HighlightList = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 0,
  marginBottom: '20px',
});

const ListItem = styled('li')({
  fontSize: '1.1rem',
  color: '#333',
  marginBottom: '10px',
  '&:hover': {
    color: '#007bff',
    cursor: 'pointer',
  },
});

const CtaButton = styled(Button)({
  padding: '12px 30px',
  backgroundColor: '#007bff',
  color: 'white',
  fontSize: '1.1rem',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const WhyInvestSection = () => {
  return (
    <Section>
      <SectionHeading variant="h2">Invest in Dignity. Invest in Progress.</SectionHeading>
      <IntroText variant="body1">
        Backing RiseCred means supporting a future where financial growth and social good go hand in hand.
        By joining us, you're not just investing in profits — you're investing in people and progress.
      </IntroText>
      <Box>
        <HighlightList>
          <ListItem><strong>Projected ROI:</strong> 47x in 10 years</ListItem>
          <ListItem><strong>Innovation:</strong> First-of-its-Kind Offline Blockchain Integration</ListItem>
          <ListItem><strong>Expansion:</strong> 200,000 Vendors by Year 5</ListItem>
          <ListItem><strong>Growth Potential:</strong> Targeting 50 Million Laborers by Year 7</ListItem>
        </HighlightList>
      </Box>
      <CtaButton variant="contained">Become a Partner in Change</CtaButton>
    </Section>
  );
};

export default WhyInvestSection;
