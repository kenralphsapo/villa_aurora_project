import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { destroy, update } from '../api/user';
import { toast } from 'react-toastify';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../hoc/checkAuth';

function Myaccount() {
  const user = useSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['AUTH_TOKEN']);
  const navigate = useNavigate();

  const [editDialog, setEditDialog] = useState(null);
  

  const onEdit = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      update(
        {
          username: editDialog.username,
          mobile: editDialog.mobile,
          email: editDialog.email,
        },
        editDialog.id, cookies.AUTH_TOKEN )
        .then((res) => {
          console.log(res)
          if (res?.ok) {
            toast.success(res?.message ?? 'Account has updated');
            navigate('/');
          } else {
            toast.error(res?.message ?? 'Something went wrong.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box>
      <Box>
        {user ? (
          <Box className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Box sx={{ boxShadow: '0 0 10px black', borderRadius: '10px', width: '400px' }} component="form" onSubmit={onEdit}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                EDIT
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField value={user.username} size="small" label="Username" type="text" fullWidth />
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField value={user.mobile} size="small" label="Mobile" type="text" fullWidth />
              </Box>
              <Box sx={{ mt: 1 }}>
                <TextField value={user.email} size="small" label="Email" type="email" fullWidth />
              </Box>
              <Button id="edit-btn" type="submit" color="success" disabled={loading}>
                Submit
              </Button>
              <Button type="submit" color="info" href="/">
                Cancel
              </Button>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default checkAuth(Myaccount);
