import React from 'react';
import { Box, TextField, Button, Typography} from '@mui/material';
import { Link} from 'react-router-dom';
import './css/bootstrap-resort.css';
import './css/bootstrap-min.css';
import './css/bootstrap-icons.css'
import logo from './images/logo.jpg';

export default function Welcome() {
  return (
<Box id="sidebarMenu" className="col-md-4 col-lg-3 d-md-block sidebar collapse p-0">
  <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
    <Link href="index.html" className="navbar-brand">
      <img src={logo} className="logo-image img-fluid" alt="Logo" />
    </Link>

    <Box component="ul" className="nav flex-column">
      <Box component="li" className="nav-item">
        <Link href="#section_1" className="nav-link click-scroll">
          Home
        </Link>
      </Box>

      <Box component="li" className="nav-item">
        <Link href="#section_2" className="nav-link click-scroll">
          Services
        </Link>
      </Box>

      <Box component="li" className="nav-item">
        <Link href="#section_3" className="nav-link click-scroll">
          Features
        </Link>
      </Box>

      <Box component="li" className="nav-item">
        <Link href="#section_4" className="nav-link click-scroll">
          Price List
        </Link>
      </Box>

      <Box component="li" className="nav-item">
        <Link href="#section_5" className="nav-link click-scroll">
          Contact
        </Link>
      </Box>

      <Box component="li" className="nav-item">
        <Link to="/login" className="nav-link click-scroll">
          Login
        </Link>
      </Box>
    </Box>
  </Box>
</Box>

  );
};
