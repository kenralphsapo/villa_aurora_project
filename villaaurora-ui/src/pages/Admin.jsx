import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import checkAuth from '../hoc/checkAuth';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { destroy, index, store, update } from '../api/user';
import { toast } from 'react-toastify';
import $ from 'jquery'; 
import { Link, useNavigate } from 'react-router-dom';
import { showAllServices } from "../api/service";
import { showAllRooms} from "../api/room";
import { showAllTransactions } from "../api/transaction";
import { showAllTestimonials } from "../api/testimonial";

function Admin() {
  const user = useSelector(state => state.auth.user);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);

  
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState({});
  const [cookies] = useCookies(['AUTH_TOKEN']);


  const [rows, setRows] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);
  const [roomRows, setRoomRows] = useState([]);
  const [transactionRows, setTransactionRows] = useState([]);
  const [testiomonialRows, setTestimonialRows] = useState([]);

  // For Testimonials

  const testimonialcolumns = [
    { field: 'id', headerName: 'Transaction ID' },
    { field: 'feedback', headerName: 'Feedback', width: 200 },
    { field: 'rating', headerName: 'Rating' },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

  
  const TestrefreshData = () => {
    showAllTestimonials().then(res => {
      console.log(res)
      if (res?.ok) {
        setTestimonialRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };
  useEffect(TestrefreshData, []);


  // For Transactions
  const transactioncolumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'user_id', headerName: 'User ID' },
    { field: 'room_id', headerName: 'Room ID' },
    { field: 'rent_start', headerName: 'Rent Start' },
    { field: 'rent_end', headerName: 'Rent End' },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

  
  const TrefreshData = () => {
    showAllTransactions().then(res => {
      console.log(res)
      if (res?.ok) {
        setTransactionRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };
  useEffect(TrefreshData, []);
  

  // For Rooms
  const roomcolumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Room Name' },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

  
  const RrefreshData = () => {
    showAllRooms().then(res => {
      console.log(res)
      if (res?.ok) {
        setRoomRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };
  useEffect(RrefreshData, []);
  

  // For Services
  const servicecolumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Service Name' },
    { field: 'price', headerName: 'Price' },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

  const SrefreshData = () => {
    showAllServices().then(res => {
      console.log(res)
      if (res?.ok) {
        setServiceRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };
  

  useEffect(SrefreshData, []);
  


  //For Users
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'username', headerName: 'Username' },
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];
  
  
  const refreshData = () => {
    index(cookies.AUTH_TOKEN).then(res => {
      console.log(res)
      if (res?.ok) {
        setRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };

  

  useEffect(refreshData, []);

  const onCreate = (e) => {
    e.preventDefault();
    if (!loading) {
      const body = {
        username: $("#username").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
        mobile: $("#mobile").val(),
        email: $("#email").val(),
      };

      store(body, cookies.AUTH_TOKEN).then(res => {
        if (res?.ok) {
          toast.success(res?.message ?? 'Account has been created');
          setCreateDialog(false);
          setWarnings({});
          refreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
          setWarnings(res?.errors);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const onDelete = (e) => {
    if(!loading){
      setLoading(true);
      destroy(deleteDialog, cookies.AUTH_TOKEN).then(res => {
        if (res?.ok) {
          toast.success(res?.message ?? 'Account has deleted');
          setDeleteDialog(null);
          refreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const onEdit = (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true);
      update({
        username: editDialog.username,
        mobile: editDialog.mobile,
        email: editDialog.email,
        role: editDialog.role,
      }, editDialog.id, cookies.AUTH_TOKEN).then(res => {
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

  return (
    <Box>
      <Box>
          <Box>
          <Typography variant='h2'>Hello {user?.username ?? 'Who are you??'}</Typography>
          </Box>
          <Box id="custom-navbar">
          {user ? (
            <Box>
            <Link id="list" to="/"><Typography  sx={{m: 1, color: 'white'}}>Home</Typography></Link>
            <a id="list" href="#section_2"><Typography  sx={{m: 1, color: 'white'}}>Services</Typography></a>
            <a id="list" href="#section_3"><Typography  sx={{m: 1, color: 'white'}}>Rooms</Typography></a>
            <a id="list" href="#section_4"><Typography  sx={{m: 1, color: 'white'}}>Transaction</Typography></a>
            <a id="list" href="#section_5"><Typography  sx={{m: 1, color: 'white'}}>Testimonials</Typography></a>
          </Box>
          ) : null}
          </Box>
      </Box>
      {user ? (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
            <Button sx={{ mr: 5 }} onClick={() => setCreateDialog(true)}>Create User</Button>
          </Box>
          <DataGrid sx={{ height: '500px' }} columns={columns} rows={rows} />

          {/* CREATE FORM DIALOG */}
          <Dialog open={!!createDialog}>
            <DialogTitle>Create Form</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={onCreate}>
                <Box>
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                  {warnings?.username ? (
                    <Typography component="small" color="error">{warnings.username}</Typography>
                  ) : null}
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
                  {warnings?.password ? (
                    <Typography component="small" color="error">{warnings.password}</Typography>
                  ) : null}
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
                  {warnings?.password_confirmation ? (
                    <Typography component="small" color="error">{warnings.password_confirmation}</Typography>
                  ) : null}
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
                  {warnings?.mobile ? (
                    <Typography component="small" color="error">{warnings.mobile}</Typography>
                  ) : null}
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
                  {warnings?.email ? (
                    <Typography component="small" color="error">{warnings.email}</Typography>
                  ) : null}
                </Box>
                <Box>
                  <Button id="submit_btn" disabled={loading} type="submit" sx={{display: 'none'}}>
                    Submit
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button color="info" onClick={() => setCreateDialog(false)}>Close</Button>
              <Button onClick={() => { $("#submit_btn").trigger("click")}}>Create</Button>
            </DialogActions>
          </Dialog>
          
          {/* DELETE FORM DIALOG */}
          <Dialog open={!!deleteDialog}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <Typography>
                Do you want to delete this user ID: {deleteDialog}
              </Typography>
            </DialogContent>
            <DialogActions sx={{display: !!deleteDialog ? "flex" : 'none'}}>
              <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
              <Button disabled={loading} onClick={onDelete}>Confirm</Button>
            </DialogActions>
          </Dialog>

          {/* EDIT FORM DIALOG */}
          <Dialog open={!!editDialog}>
              <DialogTitle>
                Edit User
              </DialogTitle>
              <DialogContent>
                <Box component="form" sx={{p: 1}} onSubmit={onEdit}>
                <Box sx={{mt: 1}}>
                  <TextField onChange={e => setEditDialog({...editDialog, username: e.target.value})} value={editDialog?.username ?? ""} size="small" label="Username" type="text" fullWidth />
                  </Box>
                  <Box sx={{mt: 1}}>
                  <TextField onChange={e => setEditDialog({...editDialog, mobile: e.target.value})} value={editDialog?.mobile ?? ""} size="small" label="Mobile" type="mobile" fullWidth/>
                  </Box>
                  <Box sx={{mt: 1}}>
                  <TextField onChange={e => setEditDialog({...editDialog, email: e.target.value})} value={editDialog?.email ?? ""} size="small" label="Email" type="email" fullWidth/>
                  </Box>
                  <Box sx={{mt: 1}}>
                  <TextField onChange={e => setEditDialog({...editDialog, role: e.target.value})} value={editDialog?.role ?? ""} size="small" label="Role" type="text" fullWidth/>
                  </Box>
                  <Button id="edit-btn" type="submit" sx={{display: 'none'}}>Submit</Button>
                </Box>
              </DialogContent>
              <DialogActions>
              <Button onClick={() => setEditDialog(null)}>Cancel</Button>
              <Button disabled={loading} onClick={() => { $("#edit-btn").trigger("click")}}>Update</Button>
              </DialogActions>
          </Dialog>

          <Box id="table">
            <section id="#section_2">
            <Typography variant='h2'>Services</Typography>
            <DataGrid autoHeight columns={servicecolumns} rows={serviceRows} />
            </section>

            <section id="#section_3">
            <Typography variant='h2'>Rooms</Typography>
            <DataGrid autoHeight columns={roomcolumns} rows={roomRows} />
            </section>

            <section id="#section_4">
            <Typography variant='h2'>Transactions</Typography>
            <DataGrid autoHeight columns={transactioncolumns} rows={transactionRows} />
            </section>
            
            <section id="#section_5">
            <Typography variant='h2'>Testimonials</Typography>
            <DataGrid autoHeight columns={testimonialcolumns} rows={testiomonialRows} />
            </section>
          </Box>
        </Box>
      ) : null}
         
    </Box>
  );
}

export default checkAuth(Admin);