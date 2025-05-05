import React from 'react'
import { Card, CardContent, Grid2, Typography } from '@mui/material'
import colors from '../../theme/colors'; 

const Home = () => {
  return (
    <div className='container'>
      <Grid2 container spacing={2} style={{ paddingTop: 64 }}>
        <Grid2 xs={12} md={6} sx={{ alignItems: 'center'}}>
          <Typography variant='h2' sx={{ fontWeight: 500}}>
            Wordt{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>wijs</span>{' '}
            in het{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>wild!</span>
          </Typography>
          <Grid2 container spacing={2} sx={{ marginTop: 4 }}>
            {[1, 2, 3].map((item, index) => (
              <Grid2 xs={12} md={4} key={index}>
                <Card>
                  <img 
                    src="https://via.placeholder.com/300x200" 
                    alt={`Placeholder ${index + 1}`} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">Naam {index + 1}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
        <Grid2 xs={12} md={6}></Grid2>
      </Grid2>
    </div>
  );
};

export default Home;