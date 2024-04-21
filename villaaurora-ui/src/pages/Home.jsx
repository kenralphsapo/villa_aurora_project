import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import checkAuth from '../hoc/checkAuth';
import './css/bootstrap-resort.css';
import './css/bootstrap-min.css';
import './css/bootstrap-icons.css';
import logo from './images/logo.jpg';
import bgmockup from './images/background.jpg';

function Home() {
  const user = useSelector(state => state.auth.user)

  return (
    <Box className="container-fluid">
      <Box className="row">
        <Button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Typography className="navbar-toggler-icon"></Typography>
        </Button>

        {/* Navigation */}
        <Box
          id="sidebarMenu"
          className="col-md-4 col-lg-3 d-md-block sidebar collapse p-0"
        >
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
                {user?.username ?? "Login"}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="col-md-8 ms-sm-auto col-lg-9 p-0">
          <Box variant="section"
            className="hero-section d-flex justify-content-center align-items-center"
            id="section_1"
          >
            <Box className="container">
              <Box className="row">
                <Box className="col-lg-8 col-12">
                  <Typography variant="h1" className="text-white mb-lg-3 mb-4 sz-60px">
                    Villa Aurora Private Resort
                  </Typography>
                  <p className="text-black">
                    Don't miss out! Reserve your spot at our luxurious resort today.
                  </p>
                  <br />
                  <Link
                    className="btn custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2"
                    href="#section_2"
                  >
                    About Us
                  </Link>

                  <Link className="btn custom-btn smoothscroll mb-2" href="#section_3">
                    What we have
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box className="custom-block d-lg-flex flex-column justify-content-center align-items-center">
              <img
                src={bgmockup}
                className="custom-block-image img-fluid"
                alt="background-mockup"
              />

              <h4>
                <strong className="text-white sz-20px">Reserve your spot at paradise.</strong>
              </h4>

              <Link href="#booking-section" className="smoothscroll btn custom-btn custom-btn-italic mt-3">
                Make a Reservation
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default checkAuth(Home);
