<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Villa Aurora Private Resort</title>

        <!-- CSS FILES -->        
        @include('connection.styles')

    </head>
    
    <body>

        <div class="container-fluid">
            <div class="row">

                <button class="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Navigation -->
                <nav id="sidebarMenu" class="col-md-4 col-lg-3 d-md-block sidebar collapse p-0">

                    <div class="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
                        <a class="navbar-brand" href="index.html">
                            <img src="images/logo.jpg" class="logo-image img-fluid">
                        </a>

                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_1">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link click-scroll" href="#section_2">Services</a>
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
                                <a class="nav-link click-scroll" href="">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <!-- ====================================================== -->
                <div class="col-md-8 ms-sm-auto col-lg-9 p-0">
                    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">

                            <div class="container">
                                <div class="row">

                                    <div class="col-lg-8 col-12">
                                        <h1 class="text-white mb-lg-3 mb-4 sz-60px" >Villa Aurora Private Resort</h1>
                                        <p class="text-black">Don't miss out! Reserve your spot at our luxurious resort today.</p>
                                        <br>
                                        <a class="btn custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2" href="#section_2">About Us</a>

                                        <a class="btn custom-btn smoothscroll mb-2" href="#section_3">What we have</a>
                                    </div>
                                </div>
                            </div>

                            <div class="custom-block d-lg-flex flex-column justify-content-center align-items-center">
                                <img src="images/background.jpg" class="custom-block-image img-fluid" alt="">

                                <h4><strong class="text-white sz-20px">Reserve your spot at paradise.</strong></h4>

                                <a href="#booking-section" class="smoothscroll btn custom-btn custom-btn-italic mt-3">Make a Reservation</a>
                            </div>
                    </section>


                    <section class="about-section section-padding" id="section_2">
                        <div class="container">
                            <div class="row">

                                <div class="col-lg-12 col-12 mx-auto">
                                    <h2 class="mb-4">Services</h2>

                                    <div class="border-bottom pb-3 mb-5">
                                        <p>Perfect place for you to <strong>rest, relax, recharge, and enjoy!</strong></p>
                                        <p>Also, celebrate birthdays, baptisms, weddings, reunions, and other special occasions with us. We are located in Angono, Rizal.</p>
                                        
                                    </div>
                                </div>

                                        <div class="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
                                            <img src="images/catering.jpg" class="custom-block-bg-overlay-image img-fluid" alt="">

                                            <div class="team-info d-flex align-items-center flex-wrap">
                                                <p class="mb-0">Birthday</p>
                                            </div>
                                        </div>

                                        <div class="col-lg-5 col-12 custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
                                            <img src="images/event.jpg" class="custom-block-bg-overlay-image img-fluid" alt="">

                                            <div class="team-info d-flex align-items-center flex-wrap">
                                                <p class="mb-0">Wedding</p>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="featured-section section-padding">
                        <div class="section-overlay"></div>

                        <div class="container">
                            <div class="row">

                                <div class="col-lg-10 col-12 mx-auto">
                                    <h2 class="mb-3" id="color-w">Puro drawing parin ba?</h2>

                                    <p>arat na Beat the Summer Heat 🌞😎</p>

                                    <a href="https://www.facebook.com/VAPRII/" id="color-w" class="trans-scale"><strong>For inquiries please check our fb page for details.</strong></a>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section class="services-section section-padding" id="section_3">
                        <div class="container">
                            <div class="row">

                                <div class="col-lg-12 col-12">
                                    <h2 class="mb-5">Features</h2>
                                </div>

                                <div class="col-lg-6 col-12 mb-4">
                                    <div class="services-thumb">
                                        <img src="images/room.jpg" class="services-image img-fluid" alt="">

                                        <div class="services-info d-flex align-items-end">
                                            <h4 class="mb-0">Bedroom</h4>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-12 mb-4">
                                    <div class="services-thumb">
                                        <img src="images/karaoke.jpg" class="services-image img-fluid" alt="">

                                        <div class="services-info d-flex align-items-end">
                                            <h4 class="mb-0">Karaoke</h4>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                                    <div class="services-thumb">
                                        <img src="images/pool.jpg" class="services-image img-fluid" alt="">

                                        <div class="services-info d-flex align-items-end">
                                            <h4 class="mb-0">Billiards</h4>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-12">
                                    <div class="services-thumb">
                                        <img src="images/kiddiepool.jpg" class="services-image img-fluid" alt="">

                                        <div class="services-info d-flex align-items-end">
                                            <h4 class="mb-0">Kiddiepool</h4>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section class="booking-section section-padding" id="booking-section">
                    <div class="container">
                        <div class="row">

                            <div class="col-lg-10 col-12 mx-auto">
                                <form action="#" method="post" class="custom-form booking-form" id="bb-booking-form" role="form">
                                    <div class="text-center mb-5">
                                        <h2 class="mb-1">Make a Reservation</h2>

                                        <p>Please fill out the form and we get back to you</p>
                                    </div>

                                    <div class="booking-form-body">
                                        <div class="row">

                                            <div class="col-lg-6 col-12">
                                                <input type="text" name="bb-name" id="bb-name" class="form-control" placeholder="Full name" required>
                                            </div>

                                            <div class="col-lg-6 col-12">
                                                <input type="tel" class="form-control" name="bb-phone" placeholder="Mobile 0945 320 0320" required="">
                                            </div>

                                            <div class="col-lg-6 col-12">
                                                <label for="">Date Start</label>
                                                <input type="date" name="bb-date" id="bb-date" class="form-control" placeholder="Date Start" required>
                                            </div>
                                            <div class="col-lg-6 col-12">
                                                <label for="">Date End</label>
                                                <input type="date" name="bb-date" id="bb-date" class="form-control" placeholder="Date End" required>
                                            </div>
                                            <div class="col-lg-6 col-12">
                                                <input class="form-control" type="time" name="bb-time" value="00:00" />
                                            </div>

                                            <div class="col-lg-6 col-12">
                                                <input type="number" name="bb-number" id="bb-number" class="form-control" placeholder="Number of People" required>
                                            </div>
                                        </div>

                                        <textarea name="bb-message" rows="3" class="form-control" id="bb-message" placeholder="Comment (Optionals)"></textarea>

                                        <div class="col-lg-4 col-md-10 col-8 mx-auto">
                                            <button type="submit" class="form-control">Submit</button>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </section>


                    <section class="price-list-section section-padding" id="section_4">
                        <div class="container">
                            <div class="row">
                                <!-- =============Price list=============== -->
                                <div class="col-lg-8 col-12">
                                    <div class="price-list-thumb-wrap">
                                        <div class="mb-4">
                                            <h2 class="mb-2">Price List</h2>

                                        </div>

                                        <div class="price-list-thumb">
                                            <h6 class="d-flex">
                                                10hour stay: 
                                                <span class="price-list-thumb-divider"></span>

                                                <strong>P3,000</strong>
                                            </h6>
                                        </div>

                                        <div class="price-list-thumb">
                                            <h6 class="d-flex">
                                                22hours stay:
                                                <span class="price-list-thumb-divider"></span>

                                                <strong>P5,000</strong>
                                            </h6>
                                        </div>

                                       
                                    </div>
                                </div>
                                <!-- ================================= -->
                                <div class="col-lg-4 col-12 custom-block-bg-overlay-wrap mt-5 mb-5 mb-lg-0 mt-lg-0 pt-3 pt-lg-0">
                                    <img src="images/balcony.jpg" class="custom-block-bg-overlay-image img-fluid" alt="">
                                </div>

                            </div>
                        </div>
                    </section>


                <section class="contact-section" id="section_5">
                    <div class="section-padding section-bg">
                        <div class="container">
                            <div class="row">   

                                <div class="col-lg-8 col-12 mx-auto">
                                    <h2 class="text-center">What are you waiting for?</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-padding">
                        <div class="container">
                            <div class="row">

                                <div class="col-lg-6 col-12">
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
                                </div>

                                <div class="col-lg-5 col-12 contact-block-wrap mt-5 mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                    <div class="contact-block">
                                        <h6 class="mb-0">
                                            <i class="custom-icon bi-shop me-3"></i>

                                            <strong>Open Daily</strong>

                                            <span class="ms-auto">10:00 AM - 8:00 PM</span>
                                            <span id="color-w">Located at: Angono, Calabarzon, Philippines</span>
                                        </h6>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-12 mx-auto mt-5 pt-5">
                                    <div class="iframe-container">
                                        <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.135607282014!2d121.1004689148258!3d14.533207089826607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c75ea60f9533%3A0x5c7ae1dbd8f8ab5a!2sVilla%20Aurora%20Private%20Resort%2C%20G4MR%2B7P2%2C%20Lakeview%20subd%20Baytown%20Coastal%20Road%2C%201930%20Rizal!5e0!3m2!1sen!2sph!4v1647605421232!5m2!1sen!2sph" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>                
                                

                            </div>
                        </div>
                    </div>
                </section>

                <footer class="site-footer">


                    <div class="site-footer-bottom">
                        <div class="container">
                            <div class="row align-items-center">

                                <div class="col-lg-2 col-md-3 col-3 mt-lg-4 ms-auto">
                                    <span id="szten">Back to the top</span>
                                    <a href="#section_1" class="back-top-icon smoothscroll" title="Back Top">
                                        <i class="bi-arrow-up-circle"></i>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </footer>
                </div>
                <!-- ====================================================== -->

        <!-- JAVASCRIPT FILES -->
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/click-scroll.js"></script>
        <script src="js/custom.js"></script>

    </body>
</html>