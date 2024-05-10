import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import checkAuth from '../hoc/checkAuth';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { destroy, index, store, update } from '../api/user';
import { toast } from 'react-toastify';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
import { addService, deleteService, showAllServices, updateService } from "../api/service";
import { addRoom, deleteRoom, showAllRooms, updateRoom} from "../api/room";
import { showAllTransactions } from "../api/transaction";
import { deleteTestimonial, showAllTestimonials } from "../api/testimonial";
import { onRoomNav, onServiceNav, onTestimonialNav, onTransactionNav, onUserNav } from './js/custom-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBriefcase, faCoffee, faComment, faHome, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons'

function Admin() {
  const user = useSelector(state => state.auth.user);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [editDialog, setEditDialog] = useState(null);


  // For Services
  const [createServDialog, setCreateServDialog] = useState(false);
  const [deleteServiceDialog, setServiceDeleteDialog] = useState(null);
  const [editServiceDialog, setEditServiceDialog] = useState(null);

  // For Rooms
  const [deleteRoomDialog, setRoomDeleteDialog] = useState(null);
  const [editRoomDialog, setEditRoomDialog] = useState(null);
  

  //For Testimonials
  const [deleteTestimonialDialog, setTestimonialDeleteDialog] = useState(null);

  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState({});
  const [cookies] = useCookies(['AUTH_TOKEN']);

  //Retrieve all rows
  const [rows, setRows] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);
  const [roomRows, setRoomRows] = useState([]);
  const [transactionRows, setTransactionRows] = useState([]);
  const [testiomonialRows, setTestimonialRows] = useState([]);

  // For Testimonials
  const testimonialcolumns = [
    { field: 'id', headerName: 'Transaction ID', width: 200 },
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
          <Button variant="contained" color="error" onClick={() => setTestimonialDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

  
  const TestrefreshData = () => {
    showAllTestimonials().then(res => {
      if (res?.ok) {
        setTestimonialRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };
  useEffect(TestrefreshData, []);



  const onDeleteTestimonial = (e) => {
    if(!loading){
      setLoading(true);
      deleteTestimonial(deleteTestimonialDialog).then(res => {
        if (res?.ok) {
         
          toast.success(res?.message ?? 'Room has deleted');
          setTestimonialDeleteDialog(null);
          TestrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };


  // For Transactions
  const transactioncolumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'user_id', headerName: 'User ID', width: 130  },
    { field: 'room_id', headerName: 'Room ID', width: 130 },
    { field: 'rent_start', headerName: 'Rent Start', width: 160  },
    { field: 'rent_end', headerName: 'Rent End', width: 160  },
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

  const onEditTransaction = (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true);
      updateTransaction({
        name: editTransactionDialog.name,
      }, editTransactionDialog.id).then(res => {
        console.log(res);
        if (res?.ok) {
          toast.success(res?.message ?? 'Transaction has updated');
          setEditTransactionDialog(null);
          TrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }

  const TrefreshData = () => {
    showAllTransactions().then(res => {
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
    { field: 'name', headerName: 'Room Name', width: 160 },
    { field: 'created_at', headerName: 'Create At', width: 200 },
    { field: 'updated_at', headerName: 'Update At', width: 200 },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Button variant="contained" color="warning" onClick={() => setEditRoomDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setRoomDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];
  
  const RrefreshData = () => {
    showAllRooms().then(res => {
      if (res?.ok) {
        setRoomRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };

  const onEditRoom = (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true);
      updateRoom({
        name: editRoomDialog.name,
      }, editRoomDialog.id).then(res => {
        console.log(res);
        if (res?.ok) {
          toast.success(res?.message ?? 'Room has updated');
          setEditRoomDialog(null);
          RrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }

  useEffect(RrefreshData, []);
  

  // For Services
  const servicecolumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Service Name', width: 160 },
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
          <Button variant="contained" color="warning" onClick={() => setEditServiceDialog({...params.row})}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => setServiceDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
      width: 200,
    },
  ];

    const SrefreshData = () => {
      showAllServices().then(res => {
        if (res?.ok) {
          setServiceRows(res.data);
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      });
    };
  
  useEffect(SrefreshData, []);

  const onCreateService = (e) => {
    e.preventDefault();
    if (!loading) {
      const body = {
        name: $("#name").val(),
        price: $("#price").val(),
      };

      addService(body).then(res => {
        console.log(res);
        if (res?.ok) {
          toast.success(res?.message ?? 'Service has been created');
          setCreateServDialog(false);
          SrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');;
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const onDeleteService = (e) => {
    if(!loading){
      setLoading(true);
      deleteService(deleteServiceDialog).then(res => {
        if (res?.ok) {
          toast.success(res?.message ?? 'Service has deleted');
          setServiceDeleteDialog(null);
          SrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  
  const onEditService = (e) => {
    e.preventDefault();
    if(!loading){
      setLoading(true);
      updateService({
        name: editServiceDialog.name,
        price: editServiceDialog.price,
      }, editServiceDialog.id).then(res => {
        console.log(res);
        if (res?.ok) {
          toast.success(res?.message ?? 'Service has updated');
          setEditServiceDialog(null);
          SrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }

  const onDeleteRoom = (e) => {
    if(!loading){
      setLoading(true);
      deleteRoom(deleteRoomDialog).then(res => {
        if (res?.ok) {
         
          toast.success(res?.message ?? 'Room has deleted');
          setRoomDeleteDialog(null);
          RrefreshData();
        } else {
          toast.error(res?.message ?? 'Something went wrong.');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };



  
 


  

  


  //For Users
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
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
        name: $("#name").val(),
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
    <Box id="custom-admin">
      <Box>
          <Box>
            <Typography variant='h2'>Hello {user?.username ?? 'Who are you??'}</Typography>
          </Box>
          <Box id="custom-navbar">
          {user ? (
            <Box>
            <Link className="list" to="/"><Typography  sx={{m: 1, color: 'white'}} id="home">Home <FontAwesomeIcon icon={faHome} /></Typography></Link>
            <Link className="list" onClick={onUserNav}><Typography  sx={{m: 1, color: 'white'}}  id="usernav">Users <FontAwesomeIcon icon={faUser} /></Typography></Link>
            <Link className="list" onClick={onServiceNav}><Typography  sx={{m: 1, color: 'white'}}  id="servicenav">Services <FontAwesomeIcon icon={faBriefcase} /></Typography></Link>
            <Link className="list" onClick={onRoomNav}><Typography  sx={{m: 1, color: 'white'}}  id="roomnav">Rooms <FontAwesomeIcon icon={faBed} /></Typography></Link>
            <Link className="list" onClick={onTransactionNav}><Typography  sx={{m: 1, color: 'white'}}   id="transactionnav">Transactions <FontAwesomeIcon icon={faReceipt} /></Typography></Link>
            <Link className="list" onClick={onTestimonialNav}><Typography  sx={{m: 1, color: 'white'}}  id="testimonialnav">Testimonials <FontAwesomeIcon icon={faComment} /></Typography></Link>
           
          </Box>
          ) : null}
          </Box>
      </Box>
      {user ? (
        <Box>
          <Box sx={{ mt: 2 }} id="section1">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
            <Typography variant="h2">Users</Typography>
            <Button sx={{ mr: 5 }} onClick={() => setCreateDialog(true)}>Create User</Button>
          </Box>
          <DataGrid autoHeight columns={columns} rows={rows} />

          {/* CREATE USER FORM DIALOG */}
          <Dialog open={!!createDialog}>
            <DialogTitle>Create Form</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={onCreate}>
                <Box>
                  <TextField
                    id="name"
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
          
          {/* DELETE USER FORM DIALOG */}
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

          {/* EDIT USER FORM DIALOG */}
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

    
        </Box>
        <Box id="table">
            <Box id="section2">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
              <Typography variant='h2'>Services</Typography>
              <Button sx={{ mr: 5 }} onClick={() => setCreateServDialog(true)}>Create Service</Button>
            </Box>
              <DataGrid autoHeight columns={servicecolumns} rows={serviceRows} />
            {/* Create Service */}
            <Dialog open={!!createServDialog}>
            <DialogTitle>Create Service Form</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={onCreateService}>
                <Box>
                  <TextField
                    id="name"
                    label="Service Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                </Box>
                <Box>
                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    fullWidth
                    required
                  />
                </Box>
                <Box className="d-flex justify-content-center align-items-center">
                  <Button id="submitbtn" disabled={loading} type="submit">
                    Submit
                  </Button>
                  <Button color="info" onClick={() => setCreateServDialog(false)}>Close</Button>
                </Box>
              </Box>
            </DialogContent>
            </Dialog>

            {/* Delete Service */}
            <Dialog open={!!deleteServiceDialog}>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogContent>
                <Typography>
                  Do you want to delete this Service ID: {deleteServiceDialog}
                </Typography>
              </DialogContent>
              <DialogActions sx={{display: !!deleteServiceDialog ? "flex" : 'none'}}>
                <Button onClick={() => setServiceDeleteDialog(null)}>Cancel</Button>
                <Button disabled={loading} onClick={onDeleteService}>Confirm</Button>
              </DialogActions>
            </Dialog>
            
            {/* Edit Service */}
            <Dialog open={!!editServiceDialog}>
                <DialogTitle>
                  Edit User
                </DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{p: 1}} onSubmit={onEditService}>
                  <Box sx={{mt: 1}}>
                    <TextField onChange={e => setEditServiceDialog({...editServiceDialog, name: e.target.value})} value={editServiceDialog?.name ?? ""} size="small" label="Service name" type="text" fullWidth />
                    </Box>
                    <Box sx={{mt: 1}}>
                    <TextField onChange={e => setEditServiceDialog({...editServiceDialog, price: e.target.value})} value={editServiceDialog?.price ?? ""} size="small" label="Price" type="number" fullWidth/>
                    </Box>
                    <Button id="service-btn" type="submit" sx={{display: 'none'}}>Submit</Button>
                  </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setEditServiceDialog(null)}>Cancel</Button>
                <Button disabled={loading} onClick={() => { $("#service-btn").trigger("click")}}>Update</Button>
                </DialogActions>
            </Dialog>
            </Box>

            <Box id="section3">
              <Typography variant='h2'>Rooms</Typography>
              <DataGrid autoHeight columns={roomcolumns} rows={roomRows} />
              {/* Delete Room */}
              <Dialog open={!!deleteRoomDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                  <Typography>
                    Do you want to delete this Room ID: {deleteRoomDialog}
                  </Typography>
                </DialogContent>
                <DialogActions sx={{display: !!deleteRoomDialog ? "flex" : 'none'}}>
                  <Button onClick={() => setRoomDeleteDialog(null)}>Cancel</Button>
                  <Button disabled={loading} onClick={onDeleteRoom}>Confirm</Button>
                </DialogActions>
              </Dialog>

              {/* Edit Room */}
              <Dialog open={!!editRoomDialog}>
                <DialogTitle>
                  Edit Room
                </DialogTitle>
                <DialogContent>
                  <Box component="form" sx={{p: 1}} onSubmit={onEditRoom}>
                  <Box sx={{mt: 1}}>
                    <TextField onChange={e => setEditRoomDialog({...editRoomDialog, name: e.target.value})} value={editRoomDialog?.name ?? ""} size="small" label="Room name" type="text" fullWidth />
                    </Box>
                    <Button id="room-btn" type="submit" sx={{display: 'none'}}>Submit</Button>
                  </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setEditRoomDialog(null)}>Cancel</Button>
                <Button disabled={loading} onClick={() => { $("#room-btn").trigger("click")}}>Update</Button>
                </DialogActions>
              </Dialog>
            </Box>

            <Box id="section4">
              <Typography variant='h2'>Transactions</Typography>
              <DataGrid autoHeight columns={transactioncolumns} rows={transactionRows} />
            </Box>
            
            <Box id="section5">
              <Typography variant='h2'>Testimonials</Typography>
              <DataGrid autoHeight columns={testimonialcolumns} rows={testiomonialRows} />
              {/* Delete Testimonial */}
              <Dialog open={!!deleteTestimonialDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                  <Typography>
                    Do you want to delete this Testimonial ID: {deleteTestimonialDialog}
                  </Typography>
                </DialogContent>
                <DialogActions sx={{display: !!deleteTestimonialDialog ? "flex" : 'none'}}>
                  <Button onClick={() => setTestimonialDeleteDialog(null)}>Cancel</Button>
                  <Button disabled={loading} onClick={onDeleteTestimonial}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      ) : null}
         
    </Box>
  );
}

export default checkAuth(Admin);