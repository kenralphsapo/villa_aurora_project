import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { destroy, update } from '../api/user';
import { toast } from 'react-toastify';
import checkAuth from '../hoc/checkAuth';

function Myaccount() {
  const user = useSelector(state => state.auth.user);

  
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState({});
  const [cookies] = useCookies(['AUTH_TOKEN']);

  const onEdit = (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true);
      update({
        username: user.username,
        mobile: user.mobile,
        email: user.email,
      }, user.id, cookies.AUTH_TOKEN).then(res => {
        if (res?.ok) {
          toast.success(res?.message ?? 'Account has updated');
          setEditDialog(null);
          refreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }
  
  return(
    <Box>
    <Box>
    {user ? (
  <Box className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Box sx={{boxShadow: '0 0 10px black', borderRadius: '10px', width: '400px'}} component="form" onSubmit={onEdit}>
      <Typography variant='h3' sx={{textAlign:'center'}}>EDIT</Typography>
      <Box sx={{mt: 1}}>
        <TextField value={user?.username ?? ""} size="small" label="Username" type="text" fullWidth />
      </Box>
      <Box sx={{mt: 1}}>
        <TextField value={user?.mobile ?? ""} size="small" label="Mobile" type="mobile" fullWidth/>
      </Box>
      <Box sx={{mt: 1}}>
        <TextField value={user?.email ?? ""} size="small" label="Email" type="email" fullWidth/>
      </Box>
      <Button id="edit-btn" type="submit" color='success' disabled={loading}>Submit</Button>
      <Button type="submit" color='info' href="/">Cancel</Button>
    </Box>
  </Box> 
) : null}
    </Box>

    </Box>
    
    
  );
}

export default checkAuth(Myaccount);


