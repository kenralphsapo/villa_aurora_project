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
        margin: 0,
        padding: 0,
      }}
    >
      <Typography variant='h2' >
        Welcome to Villa Aurora {user?.username ?? "Guest"}
      </Typography>
      <Typography variant='h4' >
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
