import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import checkAuth from '../hoc/checkAuth';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { index, store } from '../api/user';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { toast } from 'react-toastify';

function Admin() {
    const user = useSelector(state => state.auth.user);
const [createDialog ,setCreateDialog] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [warnings, setWarning] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies();
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'Username' },
        { field: 'mobile', headerName: 'Mobile' },
        { field: 'email', headerName: 'Email' },
    ];
    const refreshData = () => {
        index(cookies.AUTH_TOKEN).then(res => {
            if(res?.ok){
                setRows(res.data)
              }else{
                toast.error(res?.message ?? "Something went wrong.");
              }
        })
    }
    useEffect(refreshData, []);

    const onCreate = (e) => {
        e.preventDefault();
const body = {
        username: $("#username").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        mobile: $("#mobile").val(),
        email: $("#email").val(),
      };
       store(body, cookies.AUTH_TOKEN).then(res => {
if (res?.ok) {
            toast.success(res?.message ?? "Account has been created);
setCreateDialog(false);
setWarning({});
refreshData();
          } else {
            toast.error(res?.message ?? "Something went wrong.");
            setWarning(res?.errors);
          }
});
      };
    return (
        <Box>
            <Typography>Hello {user?.username ?? "Who are you??"}</Typography>
            {
                user ? (
                   <Box sx=((mt: 2}}>
setCreateDialog(value: React.SetStateAction<boolean>):
<Box sx={{display: 'flex', justifyContent: 'end', py: 2}}>
void
<Button sx=((mr:5}} onClick={() => setCreateDialog(true) }>Create User</Button>
</Box>
                        <DataGrid sx={{height: '500px'}} columns={columns} rows={rows} />
                        <Dialog open={createDialog}>
                        <DialogTitle>Edit Form</DialogTitle>
                        <DialogContent>
      <Box
        component="form"
        onSubmit={onCreate}
      >
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
          <Button id="submit_btn" disabled={loading} type="submit"  sx=<{{display: 'none'}}>
            Submit
          </Button>
        </Box>
    </Box>
                            
                        </DialogContent>
                        <DialogActions>
                            <Button color="info" onClick={() => setCreateDialog(false) }>Close</Button>
                            <Button onClick={() => {$("#submit_btn").trigger ("click")}}>Create</Button>
                        </DialogActions>
                        </Dialog>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default checkAuth(Admin);
