import React, { useState } from 'react';
import { Box, TextField, Button, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/auth';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/authSlice';
import './css/bootstrap-resort.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    loginAPI({
      username,
      password,
    }).then(res => {
      if(res?.ok){
        setCookie("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
        navigate("/");
        toast.success(res?.message ?? "Logged in successfully.");
      }else{
        toast.error(res?.message ?? "Something went wrong.");
      }
    });
  };

  return (
    <Box
      id="bglogin"
    >
       <Typography id="login-logo" variant="h2" sx={{ textAlign: 'center', color:'white' }}>
          Welcome Villa Aurora
        </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ p: 2, maxWidth: 300, width: '100%', border: '2px solid black',
        borderRadius: '10px', backgroundColor: 'white',}}>
        <Typography id="font" variant="h2" sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
          label="Username or Email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <Box  sx={{ textAlign: 'center', cursor: 'pointer', mt: 1}}>
        <Link to="/forgotpass" id="custompass">
          <Typography>
            <b>Forgot Password?</b>
          </Typography>
        </Link>
        </Box>
        <Box id="breakLine"></Box>
        <Box  sx={{ textAlign: 'center', cursor: 'pointer', mt: 1}}>
        <Link to="/register" id="customlink">
          <Typography>
            Don't have an account yet?
          </Typography>
        </Link>
        </Box>
      </Box>
    </Box>
  );
}
