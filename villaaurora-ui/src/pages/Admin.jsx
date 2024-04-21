import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import checkAuth from '../hoc/checkAuth';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { index } from '../api/user';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { toast } from 'react-toastify';

function Admin() {
    const user = useSelector(state => state.auth.user);
const [createDialog ,setCreateDialog] = useState(false);
const [deleteDialog, setDeleteDialog] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [warnings, setWarning] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies();
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'Username' },
        { field: 'mobile', headerName: 'Mobile' },
        { field: 'email', headerName: 'Email' },
{field: 'actions', headerName: '', sortable: false, filterable:false renderCell: params => (
<Box sx={{display: 'flex', gap: 1, justify content: 'center', alignItems: 'center', height: '100%'}}>
<Button variant="contained" color="warning">
Edit
</Button>
<Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id) }>
Delete
</Button>
</Box>
) , width: 200},

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
if (!loading) {
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
}).finally(() => {
          setLoading(false);
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
                        <DialogTitle>Create Form</DialogTitle>
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
<Dialog open={deleteDialog}>
<DialogTitle> 
Are you sure?
</DialogTitle>
<DialogContent>
<Typography>
Do you want to delete this user ID: {deleteDialog}
<Typography>
</DialogContent>
<DialogActions>
<Button onClick={() => setCreateDialog(null) }>
Cancel
</Button>
<Button>
Confirm
</Button>
</DialogActions>
</Dialog>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default checkAuth(Admin);
