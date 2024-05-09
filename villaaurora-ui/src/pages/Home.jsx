import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, TextField, TextareaAutosize, Autocomplete } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import checkAuth from '../hoc/checkAuth';


import logo from './images/logo.jpg';
import bgmockup from './images/background.jpg';
import event from './images/event.jpg';
import balcony from './images/balcony.jpg';
import room from './images/room.jpg';
import karaoke from './images/karaoke.jpg';
import kiddiepool from './images/kiddiepool.jpg';
import billiard from './images/billiard.jpg';
import catering from './images/catering.jpg';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import './css/bootstrap-resort.css';
import './css/bootstrap-min.css';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid } from '@mui/x-data-grid';
import { showAllServices } from '../api/service';
import { showAllRooms } from '../api/room';



function Home() {
  const user = useSelector(state => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(null);
  const [serviceRows, setServiceRows] = useState([]);

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
  
  const [roomRows, setRoomRows] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const RrefreshData = () => {
    showAllRooms().then(res => {
      if (res?.ok) {
        setRoomRows(res.data);
      } else {
        toast.error(res?.message ?? 'Something went wrong.');
      }
    });
  };

  useEffect(RrefreshData, []);


  
  const logout = () => {
    removeCookie("AUTH_TOKEN");
    toast.success("Logged out successfully.");
    navigate("/");
    dispatch();
  };


  
  
  return (
    <Box id="homebg"> 
      <Box className="row">
        <Button className="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <Box variant="span" className="navbar-toggler-icon"></ Box>
        </Button>

        
        <Box id="sidebarMenu" className="col-md-4 col-lg-3 d-md-block sidebar collapse p-0">

          <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
            <Link to="/" id="link" className="navbar-brand">
              <img src={logo}  alt="Logo" className="logo-image img-fluid"/>
              <Typography variant="h5" sx={{color: 'white'}}> Villa Aurora Private Resort</Typography>
            </Link>
          
          {user ? (
            <Typography variant="h6" sx={{color: 'gray', mt: 2}}>{user?.username}</Typography>
          ) : null}
          <Box id="nav-column" className="nav flex-column">
            <Box variant="li" className="nav-item">
              <a href="#section_1" className="nav-link click-scroll">Home</a>
            </Box>

            <Box variant="li" className="nav-item">
              <a href="#section_2" className="nav-link click-scroll"> Services</a>
            </Box>

            <Box variant="li" className="nav-item">
              <a href="#section_3" className="nav-link click-scroll">Features</a>
            </Box>

            <Box variant="li" className="nav-item">
              <a href="#section_4" className="nav-link click-scroll">Price List</a>
            </Box>

            <Box variant="li" className="nav-item">
              <a href="#section_5" className="nav-link click-scroll">Contact</a>
            </Box>
            {user ? (
                <>
                    {user?.role !== 'guest' && user?.role !== 'scheduler' && (
                    <Box variant="li" className="nav-item">
                        <Link to="/admin" className="nav-link click-scroll">
                        {user?.role}
                        </Link>
                    </Box>
                    )}

                    {user?.role !== 'admin' && (
                    <Box variant="li" className="nav-item">
                        <Link to="/guest" className="nav-link click-scroll">
                        Myaccount
                        </Link>
                    </Box>
                    )}

                    <Box variant="li" className="nav-item">
                    <Link onClick={logout} className="nav-link click-scroll">
                        Logout
                    </Link>
                    </Box>
                </>
                ) : (
                <Box variant="li" className="nav-item">
                    <Link to="/login" className="nav-link click-scroll">
                    Login
                    </Link>
                </Box>
                )}
          </Box>
        </Box>
        </Box>
      </Box>
      <Box className="col-md-8 ms-sm-auto col-lg-9 p-0">
        {/* Hero Section */}
        <section id="section_1" className="hero-section d-flex justify-content-center align-items-center">
            <Box className="container">
                <Box className="row">
                    <Box className="col-lg-8 col-12">
                        <Typography variant="h1" sx={{color: 'white'}} className="text-white mb-lg-3 mb-4 sz-60px">Villa Aurora Private Resort</Typography> 
                        <Typography id="custom-text-big">Don't miss out! Reserve your spot at our luxurious resort today.</Typography>

                        <Link href="#section_2" className="custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2" style={{textDecoration:'none', fontSize:'20px'}}>About Us</Link>

                        <Link href="#section_3" className="custom-btn smoothscroll mb-2" style={{textDecoration:'none', fontSize:'20px'}}>What we have</Link>
                    </Box>
                </Box>
            </Box>

            <Box className="custom-block d-lg-flex flex-column justify-content-center align-items-center">
                <img src={bgmockup} className="custom-block-image" alt="Background" />

                <Typography variant='h4' className="text-white sz-20px"><strong>Reserve your spot at paradise.</strong></Typography>

                <a href="#booking-section" className="smoothscroll btn custom-btn-italic mt-3 custom-btn">Make a Reservation</a>
            </Box>
        </section>
      
        {/* Service Section */}
        <section className="service-section section-padding" id="section_2">
                        <Box className="container">
                            <Box className="row">

                                <Box className="col-lg-12 col-12 mx-auto">
                                    <h2 className="mb-4">Services</h2>

                                    <Box className="border-bottom pb-3 mb-5">
                                        <p>Perfect place for you to <strong>rest, relax, recharge, and enjoy!</strong></p>
                                        <p>Also, celebrate birthdays, baptisms, weddings, reunions, and other special occasions with us. We are located in Angono, Rizal.</p>
                                        
                                    </Box>
                                </Box>

                                        <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
                                        <img src={catering} className="custom-block-bg-overlay-image" alt="Catering" />

                                            <Box className="team-info d-flex align-items-center flex-wrap">
                                                <p className="mb-0">Birthday</p>
                                            </Box>
                                        </Box>

                                        <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
                                        <img src={event} className="custom-block-bg-overlay-image" alt="Event" />

                                            <Box className="team-info d-flex align-items-center flex-wrap">
                                                <p className="mb-0">Wedding</p>
                                            </Box>
                                </Box>
                            </Box>
                        </Box>
        </section>

        {/* Mockup Section */}
        <section className="mockup-section section-padding">
                        <Box className="section-overlay"></Box>

                        <Box className="container">
                            <Box className="row">

                                <Box className="col-lg-10 col-12 mx-auto">
                                    <Typography variant='h2' className="mb-3 text-white">Puro drawing parin ba?</Typography>

                                    <Typography>Arat na Beat the Summer Heat <FontAwesomeIcon icon={faSun} /></Typography>

                                    <a href="https://www.facebook.com/VAPRII/" className="trans-scale"><strong>For inquiries please check our fb page for details.</strong></a>
                                </Box>

                            </Box>
                        </Box>
        </section>

        {/* Features Section */}
        <section className="features-section section-padding" id="section_3">
                        <Box className="container">
                            {
                                user ? (
                                    <Box className="row">
                                        <Box className="col-lg-12 col-12">
                                            <Typography variant='h2' className="mb-5">Features</Typography>
                                        </Box>
                                        <Box className="col-lg-6 col-12 mb-4">
                                            <Box className="features-thumb">
                                                <Box className="features-info d-flex align-items-end">
                                                    <h4 className="mb-0">Bedroom</h4>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ): 
                                    <Box className="row">

                                <Box className="col-lg-12 col-12">
                                    <Typography variant='h2' className="mb-5">Features</Typography>
                                </Box>

                                <Box className="col-lg-6 col-12 mb-4">
                                    <Box className="features-thumb">
                                    <img src={room} className="service-image img-fluid" alt="Event" />

                                        <Box className="features-info d-flex align-items-end">
                                            <h4 className="mb-0">Bedroom</h4>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="col-lg-6 col-12 mb-4">
                                    <Box className="features-thumb">
                                    <img src={karaoke} className="service-image img-fluid" alt="Event" />

                                        <Box className="features-info d-flex align-items-end">
                                            <h4 className="mb-0">Karaoke</h4>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="col-lg-6 col-12 mb-4 mb-lg-0">
                                    <Box className="features-thumb">
                                    <img src={billiard} className="service-image img-fluid" alt="Event" />

                                        <Box className="features-info d-flex align-items-end">
                                            <h4 className="mb-0">Billiards</h4>

                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="col-lg-6 col-12">
                                    <Box className="features-thumb">
                                    <img src={kiddiepool} className="service-image img-fluid" alt="Event" />

                                        <Box className="features-info d-flex align-items-end">
                                            <h4 className="mb-0">Kiddiepool</h4>

                                        </Box>
                                    </Box>
                                </Box>

                                    </Box>
                            }
                        </Box>
        </section>

        {/* Booking Section */}
        <section className="booking-section section-padding" id="booking-section">
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-10 col-12 mx-auto">
                                <form action="#" method="post" className="custom-form booking-form" id="bb-booking-form" role="form">
                                    <Box className="text-center mb-5">
                                        <h2 className="mb-1">Make a Reservation</h2>

                                        <p>Please fill out the form and we get back to you</p>
                                    </Box>

                                    <Box className="booking-form-body">
                                        <Box className="row">
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="name"
                                              label="Fullname"
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              required
                                              value={user?.username ?? null}
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="mobile"
                                              label="Mobile"
                                              type="number"
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              required
                                              value={user?.mobile ?? null}
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="date-start"
                                              type="date"
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              required
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="date-end"
                                              type="date"
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              required
                                            />
                                          </Grid>
                                        <Grid item xs={12} lg={6} style={{marginBottom: '10px', marginTop: '5px'}}    >
                                        <Autocomplete
                                            options={serviceRows.map(row => row.name)}
                                            value={selectedService}
                                            onChange={(event, newValue) => {
                                            setSelectedService(newValue);
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Service Name"
                                                variant="outlined"
                                            />
                                            )}
                                        />
                                        </Grid>
                                          <Grid item xs={12} lg={6} style={{marginBottom: '10px', marginTop: '5px'}}>
                                          <Autocomplete
                                              options={roomRows.map(row => row.name)}
                                              value={selectedRoom}
                                              onChange={(event, newValue) => {
                                              setSelectedRoom(newValue);
                                              }}
                                              renderInput={(params) => (
                                              <TextField
                                                  {...params}
                                                  label="Room Name"
                                                  variant="outlined"
                                              />
                                              )}
                                            />
                                          </Grid>
                                        </Grid>
                                        <TextareaAutosize name="message" rows="3" className="form-control" id="message" placeholder="Comment (Optionals)"></TextareaAutosize>
                                        </Box>

                                        <Box className="col-lg-4 col-md-10 col-8 mx-auto">
                                            <Button sx={{mt:5}} type="submit" className="form-control">Submit</Button>
                                        </Box>
                                    </Box>
                                </form>
                        </Box>
                    </Box>
                    </Box>
        </section>

        {/* Price Section */}
        <section className="price-list-section section-padding" id="section_4">
                        <Box className="container">
                            <Box className="row">
                                {/* Price List */}
                                <Box className="col-lg-8 col-12">
                                    <Box className="price-list-thumb-wrap">
                                        <Box className="mb-4">
                                            <Typography variant='h2' className="mb-2">Price List</Typography>

                                        </Box>

                                        <Box className="price-list-thumb">
                                            <Typography variant='h6' className="d-flex">
                                                10hour stay: 
                                                <span className="price-list-thumb-Boxider"></span>

                                                <strong>P3,000</strong>
                                            </Typography>
                                        </Box>

                                        <Box className="price-list-thumb">
                                            <Typography variant='h6' className="d-flex">
                                                22hours stay:
                                                <span className="price-list-thumb-Boxider"></span>

                                                <strong>P5,000</strong>
                                            </Typography>
                                        </Box>

                                       
                                    </Box>
                                </Box>
                                {/* ============================== */}
                                <Box className="col-lg-4 col-12 custom-block-bg-overlay-wrap mt-5 mb-5 mb-lg-0 mt-lg-0 pt-3 pt-lg-0">
                                <img src={balcony} className="custom-block-bg-overlay-image img-fluid" alt="balcony" />
                                </Box>

                            </Box>
                        </Box>
        </section>
                    
        {/* Contact Section */}
        <section className="contact-section" id="section_5">
                    <Box className="section-padding section-bg">
                        <Box className="container">
                            <Box className="row">   

                                <Box className="col-lg-8 col-12 mx-auto">
                                    <h2 className="text-center">What are you waiting for?</h2>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="section-padding">
                        <Box className="container">
                            <Box className="row">

                                <Box className="col-lg-6 col-12">
                                    <Typography variant='h5' className="mb-3"><strong>Contact</strong> Information</Typography>

                                    <Box className="text-white d-flex mb-1">
                                    <Link href="" className="site-footer-link" style={{textDecoration: 'none'}}>
                                            <ul>
                                                <li>for inquries Call or msg us </li>
                                                <li> Globe 09453200320 </li>
                                                <li>  Globe/Viber 09955185002</li>
                                            </ul>
                                        </Link>
                                    </Box>

                                    <p className="text-white d-flex">
                                        <Link to="example@gmail.com" style={{textDecoration: 'none'}}>
                                            villaarurora@gmail.com
                                        </Link>
                                    </p>

                                    <ul className="social-icon">
                                        <li className="social-icon-item">
                                            <Link className="social-icon-link" to="https://www.facebook.com/profile.php?id=100070173077878">
                                            <i className="fab fa-facebook-f"></i>
                                            </Link>
                                        </li>
            
                                        <li className="social-icon-item">
                                            <Link href="#" className="social-icon-link">
                                                <i className="fab fa-twitter"></i>
                                            </Link>
                                        </li>
            
                                        <li className="social-icon-item">
                                            <Link href="#" className="social-icon-link">
                                                <i className="fab fa-instagram"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item">
                                            <Link href="#" className="social-icon-link">
                                                <i className="fab fa-youtube"></i>
                                            </Link>
                                        </li>
                                        <li className="social-icon-item">
                                            <Link href="#" className="social-icon-link">
                                            <i className="fab fa-whatsapp"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>

                                <Box className="col-lg-5 col-12 contact-block-wrap mt-5 mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                    <Box className="contact-block">
                                        <Typography variant='h6' className="mb-0">
                                            <Box className="custom-icon text-white">
                                                <i className="fas fa-store"></i>
                                            </Box>

                                            <strong>Open Daily</strong>

                                            <span className="ms-auto">10:00 AM - 8:00 PM</span>
                                            <span className='text-white'>Located at: Angono, Calabarzon, Philippines</span>
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="col-lg-12 col-12 mx-auto mt-5 pt-5">
                                    <Box className="iframe-container">
                                        <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.135607282014!2d121.1004689148258!3d14.533207089826607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c75ea60f9533%3A0x5c7ae1dbd8f8ab5a!2sVilla%20Aurora%20Private%20Resort%2C%20G4MR%2B7P2%2C%20Lakeview%20subd%20Baytown%20Coastal%20Road%2C%201930%20Rizal!5e0!3m2!1sen!2sph!4v1647605421232!5m2!1sen!2sph" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </Box>
                                </Box>                
                                

                            </Box>
                        </Box>
                    </Box>
        </section>
        
        {/* Footer Section */}
        <footer className="site-footer">
            <Box className="site-footer-bottom">
                <Box className="container">
                    <Box className="row align-items-center">

                        <Box className="col-lg-2 col-md-3 col-3 mt-lg-4 ms-auto">
                        <span className="fs-6">Back to the top</span>
                            <a href="#section_1" className="back-top-icon smoothscroll" title="Back Top">
                                <i className="bi-arrow-up-circle"></i>
                            </a>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </footer>
      
      </Box>
    </Box>
  );
}

export default checkAuth(Home);
