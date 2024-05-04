import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Myaccount(props) {
  const { username } = props;
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleEdit = () => {
    setOpen(true);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log(`New username: ${newUsername}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <Box>
      <Typography variant="body1">Username: {username}</Typography>
      <Button onClick={handleEdit}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            fullWidth
            value={newUsername}
            onChange={handleUsernameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
      }
