import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import checkAuth from '../hoc/checkAuth';
import './css/bootstrap-resort.css';
import './css/bootstrap-min.css';
import './css/bootstrap-icons.css';
import logo from './images/logo.jpg';
import bgmockup from './images/background.jpg';
import event from './images/event.jpg';
import catering from './images/catering.jpg';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';


function Home() {
  const user = useSelector(state => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("AUTH_TOKEN");
    toast.success("Logged out successfully.");
    navigate("/");
    dispatch();
  };
  
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
            {user ? (
                  <Typography variant='h6'>
                    {user?.username}
                  </Typography>
                ) : null}
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
                {user ? (
                  <Box>
                    <Box>
                      <Link to="/admin" className="nav-link click-scroll">
                        Admin
                      </Link>
                    </Box>
                    <Box>
                      <Link onClick={logout} className="nav-link click-scroll">
                        Logout
                      </Link>
                    </Box>
                  </Box>
                ) : 
                <Link to="/login" className="nav-link click-scroll">
                    Login
                  </Link>}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="col-md-8 ms-sm-auto col-lg-9 p-0">
          <Box
            variant="section"
            className="hero-section d-flex justify-content-center align-items-center"
            id="section_1"
          >
            <Box className="container">
              <Box className="row">
                <Box className="col-lg-8 col-12">
                  <Typography
                    variant="h1"
                    className="text-white mb-lg-3 mb-4 sz-60px"
                  >
                    Villa Aurora Private Resort
                  </Typography>
                  <Typography className="text-black">
                    Don't miss out! Reserve your spot at our luxurious resort today.
                  </Typography>
                  <br />
                  <Link
                    className="btn custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2"
                    href="#section_2"
                  >
                    About Us
                  </Link>

                  <Link
                    className="btn custom-btn smoothscroll mb-2"
                    href="#section_3"
                  >
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

              <Typography variant="h4">
                <strong className="text-white sz-20px">
                  Reserve your spot at paradise.
                </strong>
              </Typography>

              <Link
                href="#booking-section"
                className="smoothscroll btn custom-btn custom-btn-italic mt-3"
              >
                Make a Reservation
              </Link>
            </Box>
          </Box>
        </Box>
    {/* <section class="about-section section-padding" id="section_2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 mx-auto">
            <h2 class="mb-4">Services</h2>
            <div class="border-bottom pb-3 mb-5">
              <p>Perfect place for you to <strong>rest, relax, recharge, and enjoy!</strong></p>
              <p>Also, celebrate birthdays, baptisms, weddings, reunions, and other special occasions with us. We are located in Angono, Rizal.</p>
            </div>
          </div>
            <Box className="custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
              <img src={catering} className="custom-block-bg-overlay-image img-fluid" alt="" />
              <div className="team-info d-flex align-items-center flex-wrap">
                <p className="mb-0">Birthday</p>
              </div>
            </Box>
            <Box className="custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
              <img src={event} className="custom-block-bg-overlay-image img-fluid" alt="" />
              <div className="team-info d-flex align-items-center flex-wrap">
                <p className="mb-0">Wedding</p>
              </div>
            </Box>
        </div>
      </div>
    </section> */}
    </Box>
    </Box>
  );
}

export default checkAuth(Home);
