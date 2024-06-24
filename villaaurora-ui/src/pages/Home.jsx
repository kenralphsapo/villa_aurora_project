import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button, Drawer
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "../hoc/checkAuth";

import logo from "./images/logo.jpg";
import bgmockup from "./images/background.jpg";
import event from "./images/event.jpg";
import balcony from "./images/balcony.jpg";
import room from "./images/room.jpg";
import karaoke from "./images/karaoke.jpg";
import kiddiepool from "./images/kiddiepool.jpg";
import billiard from "./images/billiard.jpg";
import catering from "./images/catering.jpg";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "./css/bootstrap-resort.css";
import {
    faArrowUp, faEnvelope,
    faPhone, faSun
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showAllServices } from "../api/service";
import Navigation from "../components/Navigation";
import { login } from "../api/auth";
import BookingForm from "../components/BookingForm";

function Home() {
    const user = useSelector((state) => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [scrollVisible, setScrollVisible] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [serviceRows, setServiceRows] = useState([]);

    const logout = () => {
        removeCookie("AUTH_TOKEN");
        toast.success(res?.message ?? "Logged out successfully.");
        navigate("/");
        dispatch(login(res.data));
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleScrollUpButton = () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                setScrollVisible(true);
            } else {
                setScrollVisible(false);
            }
        };

        const handleScroll = () => {
            toggleScrollUpButton();
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const SrefreshData = () => {
        showAllServices().then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(SrefreshData, []);

    return (
        <Box id="homebg">
            <Box className="row">
                <Button
                    className="navbar-toggler d-md-none collapsed position-fixed"
                    id="btnchange"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleDrawer}
                >
                    <Box variant="span" className="navbar-toggler-icon"></Box>
                </Button>
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                    <Navigation logout={logout} toggleDrawer={toggleDrawer} />
                </Drawer>
                <Box
                    id="sidebarMenu"
                    className="col-md-4 col-lg-2 d-md-block sidebar collapse p-0 "
                >
                    <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
                        <Link to="/" id="link" className="navbar-brand">
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo-image img-fluid"
                            />
                            <h5 id="customheader">
                                Villa Aurora Private Resort
                            </h5>
                        </Link>
                        {user ? (
                            <Typography variant="h6" className="mt-2">
                                {user?.username}
                            </Typography>
                        ) : null}
                        <Box id="nav-column" className="nav flex-column">
                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_1"
                                    className="nav-link click-scroll text-black"
                                >
                                    Home
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_2"
                                    className="nav-link click-scroll text-black"
                                >
                                    Services
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_3"
                                    className="nav-link click-scroll text-black"
                                >
                                    Features
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_4"
                                    className="nav-link click-scroll text-black"
                                >
                                    Price List
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_5"
                                    className="nav-link click-scroll text-black"
                                >
                                    Contact
                                </a>
                            </Box>
                            {user ? (
                                <>
                                    {user?.role !== "admin" && (
                                        <Box variant="li" className="nav-item">
                                            <Link
                                                to="/guest"
                                                className="nav-link click-scroll text-black"
                                            >
                                                Myaccount
                                            </Link>
                                        </Box>
                                    )}

                                    {user?.role == "admin" && (
                                        <Box variant="li" className="nav-item">
                                            <Link
                                                to="/admin"
                                                className="nav-link click-scroll text-black"
                                            >
                                                {user?.role}
                                            </Link>
                                        </Box>
                                    )}

                                    <Box variant="li" className="nav-item">
                                        <Link
                                            onClick={logout}
                                            className="nav-link click-scroll text-black"
                                        >
                                            Logout
                                        </Link>
                                    </Box>
                                </>
                            ) : (
                                <Box variant="li" className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-link click-scroll text-black"
                                    >
                                        Login
                                    </Link>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="col-md-8 ms-sm-auto col-lg-10 p-0">
                <Button
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        display: scrollVisible ? "block" : "none",
                    }}
                    id="custom-arrowupbtn"
                    onClick={handleScrollToTop}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </Button>
                {/* Hero Section */}
                <section
                    id="section_1"
                    className="hero-section d-flex justify-content-center align-items-center"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-8 col-12">
                                <h1 id="custom-header">
                                    Villa Aurora Private Resort
                                </h1>
                                <Typography id="custom-text-big">
                                    Don't miss out! Reserve your spot at our
                                    luxurious resort today.
                                </Typography>

                                <a
                                    href="#section_2"
                                    className="custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2 fs-5 text-decoration-none"
                                >
                                    About Us
                                </a>

                                <a
                                    href="#section_3"
                                    className="custom-btn smoothscroll mb-2 fs-5 text-decoration-none"
                                >
                                    What we have
                                </a>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="custom-block d-lg-flex flex-column justify-content-center align-items-center">
                        <img
                            src={bgmockup}
                            className="custom-block-image"
                            alt="Background"
                        />

                        <Typography variant="h4" className="text-white sz-20px">
                            <strong>Reserve your spot at paradise.</strong>
                        </Typography>

                        <a
                            href="#booking-section"
                            className="smoothscroll btn custom-btn-italic mt-3 custom-btn"
                        >
                            Make a Reservation
                        </a>
                    </Box>
                </section>

                {/* Service Section */}
                <section
                    className="service-section section-padding"
                    id="section_2"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-12 col-12 mx-auto">
                                <h2 className="mb-4">Services</h2>

                                <Box className="border-bottom pb-3 mb-5">
                                    <p>
                                        Perfect place for you to{" "}
                                        <strong>
                                            rest, relax, recharge, and enjoy!
                                        </strong>
                                    </p>
                                    <p>
                                        Also, celebrate birthdays, baptisms,
                                        weddings, reunions, and other special
                                        occasions with us. We are located in
                                        Angono, Rizal.
                                    </p>
                                </Box>
                            </Box>
                            {user ? (
                                <>
                                    {serviceRows.map((service, index) => (
                                        <Box
                                            key={index}
                                            className="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0"
                                        >
                                            {service.image && (
                                                <img
                                                    src={service.image}
                                                    alt="Service Image"
                                                    className="custom-block-bg-overlay-image"
                                                />
                                            )}

                                            <Box className="team-info d-flex align-items-center flex-wrap">
                                                <p className="mb-0">
                                                    {service.name}
                                                </p>
                                            </Box>
                                        </Box>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
                                        <img
                                            src={catering}
                                            className="custom-block-bg-overlay-image"
                                            alt="Catering"
                                        />

                                        <Box className="team-info d-flex align-items-center flex-wrap">
                                            <p className="mb-0">Birthday</p>
                                        </Box>
                                    </Box>

                                    <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
                                        <img
                                            src={event}
                                            className="custom-block-bg-overlay-image"
                                            alt="Event"
                                        />

                                        <Box className="team-info d-flex align-items-center flex-wrap">
                                            <p className="mb-0">Wedding</p>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </section>

                {/* Mockup Section */}
                <section className="mockup-section section-padding">
                    <Box className="section-overlay"></Box>

                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-10 col-12 mx-auto">
                                <Typography
                                    variant="h2"
                                    className="mb-3 text-white"
                                >
                                    Puro drawing parin ba?
                                </Typography>

                                <Typography>
                                    Arat na! Beat the Summer Heat{" "}
                                    <FontAwesomeIcon icon={faSun} />
                                </Typography>

                                <a
                                    href="https://www.facebook.com/VAPRII/"
                                    className="trans-scale text-white"
                                    target="_blank"
                                >
                                    <strong className="text-black">
                                        For inquiries, please check our Facebook
                                        page for details.
                                    </strong>
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </section>

                {/* Features Section */}
                <section
                    className="features-section section-padding"
                    id="section_3"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-12 col-12">
                                <Typography variant="h2" className="mb-5">
                                    Features
                                </Typography>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4">
                                <Box className="features-thumb">
                                    <img
                                        src={room}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Bedroom</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4">
                                <Box className="features-thumb">
                                    <img
                                        src={karaoke}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Karaoke</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4 mb-lg-0">
                                <Box className="features-thumb">
                                    <img
                                        src={billiard}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Billiards</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12">
                                <Box className="features-thumb">
                                    <img
                                        src={kiddiepool}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Kiddiepool</h4>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </section>

                {/* Booking Section */}

                <BookingForm />

                {/* Price Section */}
                <section
                    className="price-list-section section-padding"
                    id="section_4"
                >
                    <Box className="container">
                        <Box className="row">
                            {/* Price List */}
                            <Box className="col-lg-8 col-12">
                                <Box className="price-list-thumb-wrap">
                                    <Box className="mb-4">
                                        <Typography
                                            variant="h2"
                                            className="mb-2"
                                        >
                                            Price List
                                        </Typography>
                                    </Box>

                                    <Box className="price-list-thumb">
                                        <h6 className="custom-fontweight-bold">
                                            10 hour stay:
                                            .........................................
                                            P3,000
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb">
                                        <h6 className="custom-fontweight-bold">
                                            22 hours stay:
                                            .........................................
                                            P5,000
                                        </h6>
                                    </Box>
                                </Box>
                            </Box>
                            {/* ============================== */}
                            <Box className="col-lg-3 col-12 custom-block-bg-overlay-wrap mt-5 mb-5 mb-lg-0 mt-lg-0 pt-3 pt-lg-0">
                                <img
                                    src={balcony}
                                    className="custom-block-bg-overlay-image img-fluid"
                                    alt="balcony"
                                />
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
                                    <h2 className="text-center">
                                        What are you waiting for?
                                    </h2>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="section-padding">
                        <Box className="container">
                            <Box className="row">
                                <Box className="col-lg-6 col-12">
                                    <Typography variant="h5" className="mb-3">
                                        Contact Us
                                    </Typography>

                                    <Box className="text-white d-flex mb-1">
                                        <Box className="site-footer-link">
                                            <ul>
                                                <li className="text-black">
                                                    {" "}
                                                    <Link to="tel:+639453200320">
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className="text-black custom-marginright"
                                                        />
                                                        0945 3200 320
                                                    </Link>
                                                    <span className="custom-marginleft">
                                                        (Globe)
                                                    </span>
                                                </li>
                                                <li className="text-black">
                                                    <Link to="tel:+639955185002">
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className="text-black custom-marginright"
                                                        />
                                                        0995 5185 002
                                                    </Link>
                                                    <span className="custom-marginleft">
                                                        (Globe/Viber)
                                                    </span>
                                                </li>
                                                <li className="text-black">
                                                    <Link to="example@gmail.com">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className="text-black custom-marginright"
                                                        />
                                                        villaarurora@gmail.com
                                                    </Link>
                                                    <span className="custom-marginleft">
                                                        (Email)
                                                    </span>
                                                </li>
                                            </ul>
                                        </Box>
                                    </Box>

                                    <ul className="social-icon">
                                        <li className="social-icon-item">
                                            <Link
                                                className="social-icon-link"
                                                to="https://www.facebook.com/profile.php?id=100070173077878"
                                            >
                                                <i className="fab fa-facebook-f"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-twitter"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-instagram"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-youtube"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                    <Box className="col-lg-9 col-12 contact-block-wrap mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                        <Box className="contact-block mt-5">
                                            <Typography
                                                variant="h6"
                                                className="mb-0 text-black"
                                            >
                                                <Box className="custom-icon">
                                                    <i className="fas fa-store"></i>
                                                </Box>
                                                Open Daily{" "}
                                                <span className="ms-auto">
                                                    10:00 AM - 8:00 PM,{" "}
                                                </span>
                                                <span>
                                                    Located at: Angono,
                                                    Calabarzon, Philippines
                                                </span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="col-lg-5 col-12 mt-5 mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                    <Box className="iframe-container">
                                        <iframe
                                            className="google-map"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.135607282014!2d121.1004689148258!3d14.533207089826607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c75ea60f9533%3A0x5c7ae1dbd8f8ab5a!2sVilla%20Aurora%20Private%20Resort%2C%20G4MR%2B7P2%2C%20Lakeview%20subd%20Baytown%20Coastal%20Road%2C%201930%20Rizal!5e0!3m2!1sen!2sph!4v1647605421232!5m2!1sen!2sph"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            id="custom-iframe"
                                        ></iframe>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </section>
            </Box>
        </Box>
    );
}

export default checkAuth(Home);
