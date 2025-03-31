import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

const SocioEconomicImpact = () => {
  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f7f7f7' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" color="primary" gutterBottom>
          Revenue That Regenerates. Impact That Multiplies.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card elevation={4} style={{ borderRadius: '12px' }}>
              {/* Add an infographic or visual here */}
              <CardMedia
                component="img"
                alt="Economic Impact Visual"
                height="200"
                image="https://via.placeholder.com/400x200" // Placeholder image, replace with your own
                style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  RiseCred’s revenue isn’t just a number — it’s a force that powers local economies. Every transaction directly uplifts communities, turning financial activity into meaningful social change.
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body2" color="textSecondary">
                      For every ₹1 earned by a laborer using RiseCred, ₹3.50 is added to the local economy.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="textSecondary">
                      Empowering 1 million workers through RiseCred can contribute ₹5,000 crore to India’s economy in the next decade.
                    </Typography>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default SocioEconomicImpact;
