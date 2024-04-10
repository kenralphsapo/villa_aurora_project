import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        height: '100vh',
      }}
    >
      <Box sx={{ p: 2, maxWidth: 300, width: '100%' }}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
        />
        <Button variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
}
