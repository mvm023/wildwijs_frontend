import React, { useEffect } from 'react';
import { Card, CardActionArea, CardContent, Grid2, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router';
import colors from '../../theme/colors'; 
import '../../styles/styles.css';

const Home = ({categories, GetSubcategories}) => {
  const navigate = useNavigate();

  const MoveToCategory = async (category_id) => {
    try {
      await GetSubcategories(category_id);
      navigate('/StudyMode');
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <Grid2 container spacing={2} sx={{ paddingTop: '64px', alignItems: 'center', height: 'calc(100vh - 132px)'}}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant='h2' sx={{ fontWeight: 500, marginBottom: '50px'}}>
            Wordt{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>wijs</span>{' '}
            in het{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>wild!</span>
          </Typography>
          <Grid2 container spacing={2}>
            {categories.slice(0,3).map((category) => (
            <Grid2 size={{ xs: 12, sm: 4 }} key={category.name}>
              <Card>
                <CardActionArea onClick={() => MoveToCategory(category.id)} sx={{
                    '&:hover .category-text': {
                      color: colors.accent,
                    },
                  }}
                >
                  <img 
                    src={category.image_url}
                    alt={`Placeholder ${category.name}`} 
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }} 
                  />
                  <CardContent sx={{height: '50px'}}>
                    <Typography variant="body" align="center" sx={{ fontWeight: 600}} className="category-text">{category.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
            ))}
            <Card sx={{width: '100%'}}>
              <CardActionArea component={Link} to={`/StudyMode`}>
                <CardContent>
                  <Typography variant="body" align="center" sx={{ fontWeight: 600}}>Meer categorieën</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        </Grid2>
        <Grid2 xs={12} md={6}></Grid2>
      </Grid2>
    </div>
  );
};

export default Home;