import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material'; // Import MUI components
import { resetPassword } from '../api/auth';


const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send reset password request to backend
    try {
      const response = await resetPassword({
        email: formData.email,
        token: new URLSearchParams(window.location.search).get('token'), // Assuming token is in query params
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      alert(response.message); // Show success message
      // Redirect to login or another page
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="password"
              label="New Password"
              variant="outlined"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ResetPassword;
