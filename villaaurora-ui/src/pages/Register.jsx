import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import $ from 'jquery';
import { register } from '../api/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import './css/bootstrap-resort.css';

export default function Register() {
  const [warnings, setWarning] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      const body = {
        username: $("#username").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        mobile: $("#mobile").val(),
        email: $("#email").val(),
      };

      setLoading(true);
      register(body)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been registered.");
            setCookie("AUTH_TOKEN", res.data.token);
            navigate("/");
            dispatch(login(res.data));
            
          } else {
            toast.error(res?.message ?? "Something went wrong.");
            setWarning(res?.errors);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box id="bglogin" className="d-flex flex-column justify-content-center align-items-center"
    >
      <Box sx={{}}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          p: 2,
          maxWidth: 300,
          width: '100%',
          border: '2px solid black',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px black',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Typography variant="h2" sx={{ textAlign: 'center', color: 'black' }}>
          Register
        </Typography>
        <Box>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          {
            warnings?.username ? (
              <Typography component="small" color="error">{warnings.username}</Typography>
            ): null
          }
          
        </Box>
        <Box>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            required
          />
           {
            warnings?.password ? (
              <Typography component="small" color="error">{warnings.password}</Typography>
            ): null
          }
        </Box>
        <Box>
          <TextField
            id="password_confirmation"
            label="Repeat Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            required
          />
           {
            warnings?.password_confirmation ? (
              <Typography component="small" color="error">{warnings.password_confirmation}</Typography>
            ): null
          }
        </Box>
        <Box>
          <TextField
            id="mobile"
            label="Mobile No."
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
           {
            warnings?.mobile ? (
              <Typography component="small" color="error">{warnings.mobile}</Typography>
            ): null
          }
        </Box>
        <Box>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          {
            warnings?.email ? (
              <Typography component="small" color="error">{warnings.email}</Typography>
            ): null
          }
        </Box>

        <Box>
          <Button disabled={loading} type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', cursor: 'pointer', mt: 1}}>
          <Link to="/login" id="customlink">
            <Typography>Already have an account? <b>Login</b></Typography>
          </Link>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
