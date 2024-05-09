import React, { useState } from 'react';
import { Box, Typography, Button, Grid, TextField, TextareaAutosize, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import checkAuth from '../hoc/checkAuth';


import logo from './images/logo.jpg';

import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import './css/bootstrap-resort.css';
import './css/bootstrap-min.css';
import { destroy, update } from '../api/user';



function Myaccout() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [cookies] = useCookies(['AUTH_TOKEN']);
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
  
    if(!loading){
      update({
        username,
        mobile,
        email,
      }, user.id, cookies.AUTH_TOKEN).then(res => {
        if(res?.ok){
          navigate("/");
          dispatch();
          toast.success(res?.message ?? "Updated in successfully.");
        }else{
          toast.error(res?.message ?? "Something went wrong.");
        }
      });
    }
  };

  const onDelete = (e) => {
    if(!loading){
      setLoading(true);
      destroy(deleteDialog, cookies.AUTH_TOKEN).then(res => {
        if (res?.ok) {
          console.log(res)
          toast.success(res?.message ?? 'Account has deleted');
          setDeleteDialog(null);
          navigate("/");
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };


  

  return (
    <Box id="homebg"> 
    <Box className="row">

      
      <Button className="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <Box variant="span" className="navbar-toggler-icon"></ Box>
      </Button>

      
      <Box id="sidebarMenu" className="col-md-4 col-lg-3 d-md-block sidebar collapse p-0">

        <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
          <Link to="/" id="link" className="navbar-brand">
            <img src={logo}  alt="Logo" className="logo-image img-fluid"/>
            <Typography variant="h5" sx={{color: 'white'}}> Villa Aurora Private Resort</Typography>
          </Link>
        
        {user ? (
          <Typography variant="h6" sx={{color: 'gray', mt: 2}}>@Username:{user?.username}</Typography>
        ) : null}
      
      </Box>
      </Box>
    </Box>
    {user ? (
              <Box className="col-md-8 ms-sm-auto col-lg-9 p-0">
              <Box className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Box sx={{ boxShadow: '0 0 10px black', borderRadius: '10px', width: '400px' }} component="form" onSubmit={onSubmit}>
                  <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    EDIT
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField  
                    size="small" 
                    label="Username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    fullWidth />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    size="small"
                    label="Mobile"
                    type="text"
                    fullWidth />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    size="small"
                    label="Email"
                    type="email"
                    fullWidth />
                  </Box>
                  <Button id="edit-btn" type="submit" color="success" disabled={loading}>
                    Submit
                  </Button>
                  <Button type="submit" color="info" href="/" >
                    Cancel
                  </Button>
                  <Button color="error" onClick={() => setDeleteDialog(user.id)}>Delete</Button>
                  <Dialog open={!!deleteDialog}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                      <Typography>
                        Do you want to delete this Account
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{display: !!deleteDialog ? "flex" : 'none'}}>
                      <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
                      <Button disabled={loading} onClick={onDelete}>Confirm</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
          </Box>
        ) : null}

  </Box>
  );
  
}

export default checkAuth(Myaccout);
