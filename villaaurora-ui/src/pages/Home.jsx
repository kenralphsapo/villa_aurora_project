import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import checkAuth from '../hoc/checkAuth';

function Home() {
  const user = useSelector(state => state.auth.user)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography sx={{ marginBottom: '2rem' }}>
        Welcome to Villa Aurora {user?.username ?? "Guest"}
      </Typography>
      <Typography sx={{ marginBottom: '2rem' }}>
        Discover amazing things here!
      </Typography>
      <Link to="/login">
      <Button variant="contained" color="primary">
        Get Started
      </Button>
      </Link>
    </Box>
  );
}

export default checkAuth(Home)
