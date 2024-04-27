import React from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
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
import './css/resort.css'

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
    <Box class="container-fluid">
            <Box class="row">
                {/* <Button class="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </Button> */}
                {/* Navigation */}
                <Box id="sidebarMenu" class="col-md-4 col-lg-3 d-md-block sidebar collapse p-0">

                    <Box id="logoTitle">
                        <a class="navbar-brand" href="index.html">
                        <img src={logo} className="logo-image img-fluid" alt="Logo" />
                        <Typography>Villa Aurora Private Resort</Typography>
                        </a>
                    </Box>
                    <Box id="navcolumn">
                        <ul>
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_1">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_2">features</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_3">Features</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_4">Price List</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_5">Contact</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="{{ route('login') }}">Login</a>
                            </li>
                        </ul>
                    </Box>
                </Box>
                {/* ======================================================== */}
                <Box class="col-md-8 ms-sm-auto col-lg-9 p-0">
                  {/* Hero Section */}
                    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
                            <Box class="container">
                                <Box class="row">

                                    <Box class="col-lg-8 col-12">
                                        <Typography variant="h1">Villa Aurora Private Resort</Typography> 
                                        <p class="text-black">Don't miss out! Reserve your spot at our luxurious resort today.</p>

                                        <a class="btn custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2" href="#section_2">About Us</a>

                                        <a class="btn custom-btn smoothscroll mb-2" href="#section_3">What we have</a>
                                    </Box>
                                </Box>
                            </Box>

                            <Box class="custom-block d-lg-flex flex-column justify-content-center align-items-center">
                            {/* <img src={bgmockup} className="logo-image img-fluid" alt="Background" /> */}

                                <h4><strong class="text-white sz-20px">Reserve your spot at paradise.</strong></h4>

                                <a href="#booking-section" class="smoothscroll btn custom-btn custom-btn-italic mt-3">Make a Reservation</a>
                            </Box>
                    </section>
                  {/* About Section */}
                    <section class="about-section section-padding" id="section_2">
                        <Box class="container">
                            <Box class="row">

                                <Box class="col-lg-12 col-12 mx-auto">
                                    <h2 class="mb-4">Services</h2>

                                    <Box class="border-bottom pb-3 mb-5">
                                        <p>Perfect place for you to <strong>rest, relax, recharge, and enjoy!</strong></p>
                                        <p>Also, celebrate birthdays, baptisms, weddings, reunions, and other special occasions with us. We are located in Angono, Rizal.</p>
                                        
                                    </Box>
                                </Box>

                                        <Box class="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
                                        {/* <img src={catering} className="logo-image img-fluid" alt="Catering" /> */}

                                            <Box class="team-info d-flex align-items-center flex-wrap">
                                                <p class="mb-0">Birthday</p>
                                            </Box>
                                        </Box>

                                        <Box class="col-lg-5 col-12 custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
                                        {/* <img src={event} className="logo-image img-fluid" alt="Event" /> */}

                                            <Box class="team-info d-flex align-items-center flex-wrap">
                                                <p class="mb-0">Wedding</p>
                                            </Box>
                                </Box>
                            </Box>
                        </Box>
                    </section>
                  {/* Mockup Section */}
                    <section class="mockup-section section-padding">
                        <Box class="section-overlay"></Box>

                        <Box class="container">
                            <Box class="row">

                                <Box class="col-lg-10 col-12 mx-auto">
                                    <h2 class="mb-3" id="color-w">Puro drawing parin ba?</h2>

                                    <p>arat na Beat the Summer Heat 🌞😎</p>

                                    <a href="https://www.facebook.com/VAPRII/" id="color-w" class="trans-scale"><strong>For inquiries please check our fb page for details.</strong></a>
                                </Box>

                            </Box>
                        </Box>
                    </section>
                  {/* Features Section */}
                    <section class="features-section section-padding" id="section_3">
                        <Box class="container">
                            <Box class="row">

                                <Box class="col-lg-12 col-12">
                                    <h2 class="mb-5">Features</h2>
                                </Box>

                                <Box class="col-lg-6 col-12 mb-4">
                                    <Box class="features-thumb">
                                    {/* <img src={room} className="logo-image img-fluid" alt="Event" /> */}

                                        <Box class="features-info d-flex align-items-end">
                                            <h4 class="mb-0">Bedroom</h4>

                                        </Box>
                                    </Box>
                                </Box>

                                <Box class="col-lg-6 col-12 mb-4">
                                    <Box class="features-thumb">
                                    {/* <img src={karaoke} className="logo-image img-fluid" alt="Event" /> */}

                                        <Box class="features-info d-flex align-items-end">
                                            <h4 class="mb-0">Karaoke</h4>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box class="col-lg-6 col-12 mb-4 mb-lg-0">
                                    <Box class="features-thumb">
                                    {/* <img src={billiard} className="logo-image img-fluid" alt="Event" /> */}

                                        <Box class="features-info d-flex align-items-end">
                                            <h4 class="mb-0">Billiards</h4>

                                        </Box>
                                    </Box>
                                </Box>

                                <Box class="col-lg-6 col-12">
                                    <Box class="features-thumb">
                                    {/* <img src={kiddiepool} className="logo-image img-fluid" alt="Event" /> */}

                                        <Box class="features-info d-flex align-items-end">
                                            <h4 class="mb-0">Kiddiepool</h4>

                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </section>
                  {/* Booking Section */}
                    <section class="booking-section section-padding" id="booking-section">
                    <Box class="container">
                        <Box class="row">
                            <Box class="col-lg-10 col-12 mx-auto">
                                <form action="#" method="post" class="custom-form booking-form" id="bb-booking-form" role="form">
                                    <Box class="text-center mb-5">
                                        <h2 class="mb-1">Make a Reservation</h2>

                                        <p>Please fill out the form and we get back to you</p>
                                    </Box>

                                    <Box class="booking-form-body">
                                        <Box class="row">
                                        <Grid container spacing={2}>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-name"
                                              label="Full name"
                                              placeholder="Full name"
                                              required
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-phone"
                                              label="Mobile"
                                              placeholder="Mobile 0945 320 0320"
                                              required
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-date-start"
                                              label="Date Start"
                                              type="date"
                                              required
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-date-end"
                                              label="Date End"
                                              type="date"
                                              required
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-time"
                                              label="Time"
                                              type="time"
                                              defaultValue="00:00"
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={12} lg={6}>
                                            <TextField
                                              id="bb-number"
                                              label="Number of People"
                                              type="number"
                                              placeholder="Number of People"
                                              required
                                              fullWidth
                                            />
                                          </Grid>
                                        </Grid>
                                        </Box>
                                        <textarea name="bb-message" rows="3" class="form-control" id="bb-message" placeholder="Comment (Optionals)"></textarea>

                                        <Box class="col-lg-4 col-md-10 col-8 mx-auto">
                                            <button type="submit" class="form-control">Submit</button>
                                        </Box>
                                    </Box>
                                </form>
                        </Box>
                    </Box>
                    </Box>
                    </section>
                    {/* Price Section */}
                    <section class="price-list-section section-padding" id="section_4">
                        <Box class="container">
                            <Box class="row">
                                {/* Price List */}
                                <Box class="col-lg-8 col-12">
                                    <Box class="price-list-thumb-wrap">
                                        <Box class="mb-4">
                                            <h2 class="mb-2">Price List</h2>

                                        </Box>

                                        <Box class="price-list-thumb">
                                            <h6 class="d-flex">
                                                10hour stay: 
                                                <span class="price-list-thumb-Boxider"></span>

                                                <strong>P3,000</strong>
                                            </h6>
                                        </Box>

                                        <Box class="price-list-thumb">
                                            <h6 class="d-flex">
                                                22hours stay:
                                                <span class="price-list-thumb-Boxider"></span>

                                                <strong>P5,000</strong>
                                            </h6>
                                        </Box>

                                       
                                    </Box>
                                </Box>
                                {/* ============================== */}
                                <Box class="col-lg-4 col-12 custom-block-bg-overlay-wrap mt-5 mb-5 mb-lg-0 mt-lg-0 pt-3 pt-lg-0">
                                {/* <img src={balcony} className="logo-image img-fluid" alt="balcony" /> */}
                                </Box>

                            </Box>
                        </Box>
                    </section>
                    {/* Contact Section */}
                    <section class="contact-section" id="section_5">
                    <Box class="section-padding section-bg">
                        <Box class="container">
                            <Box class="row">   

                                <Box class="col-lg-8 col-12 mx-auto">
                                    <h2 class="text-center">What are you waiting for?</h2>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box class="section-padding">
                        <Box class="container">
                            <Box class="row">

                                <Box class="col-lg-6 col-12">
                                    <h5 class="mb-3"><strong>Contact</strong> Information</h5>

                                    <p class="text-white d-flex mb-1">
                                        <a href="" class="site-footer-link">
                                            <ul>
                                                <li>for inquries Call or msg us </li>
                                                <li> Globe 09453200320 </li>
                                                <li>  Globe/Viber 09955185002</li>
                                            </ul>
                                        </a>
                                    </p>

                                    <p class="text-white d-flex">
                                        <a href="example@yourgmail.com" class="site-footer-link">
                                            villaarurora@gmail.com
                                        </a>
                                    </p>

                                    <ul class="social-icon">
                                        <li class="social-icon-item">
                                            <a href="https://www.facebook.com/profile.php?id=100070173077878" class="social-icon-link bi-facebook">
                                            </a>
                                        </li>
            
                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-twitter">
                                            </a>
                                        </li>
            
                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-instagram">
                                            </a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-youtube">
                                            </a>
                                        </li>

                                        <li class="social-icon-item">
                                            <a href="#" class="social-icon-link bi-whatsapp">
                                            </a>
                                        </li>
                                    </ul>
                                </Box>

                                <Box class="col-lg-5 col-12 contact-block-wrap mt-5 mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                    <Box class="contact-block">
                                        <h6 class="mb-0">
                                            <i class="custom-icon bi-shop me-3"></i>

                                            <strong>Open Daily</strong>

                                            <span class="ms-auto">10:00 AM - 8:00 PM</span>
                                            <span id="color-w">Located at: Angono, Calabarzon, Philippines</span>
                                        </h6>
                                    </Box>
                                </Box>

                                <Box class="col-lg-12 col-12 mx-auto mt-5 pt-5">
                                    <Box class="iframe-container">
                                        <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.135607282014!2d121.1004689148258!3d14.533207089826607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c75ea60f9533%3A0x5c7ae1dbd8f8ab5a!2sVilla%20Aurora%20Private%20Resort%2C%20G4MR%2B7P2%2C%20Lakeview%20subd%20Baytown%20Coastal%20Road%2C%201930%20Rizal!5e0!3m2!1sen!2sph!4v1647605421232!5m2!1sen!2sph" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </Box>
                                </Box>                
                                

                            </Box>
                        </Box>
                    </Box>
                    </section>
                    {/* Footer Section */}
                    <footer class="site-footer">
                    <Box class="site-footer-bottom">
                        <Box class="container">
                            <Box class="row align-items-center">

                                <Box class="col-lg-2 col-md-3 col-3 mt-lg-4 ms-auto">
                                    <span id="szten">Back to the top</span>
                                    <a href="#section_1" class="back-top-icon smoothscroll" title="Back Top">
                                        <i class="bi-arrow-up-circle"></i>
                                    </a>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                    </footer>
                </Box>
            </Box>
        </Box>
  );
}

export default checkAuth(Home);
