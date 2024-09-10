![Background Image](https://github.com/kenralphsapo/villa_aurora_project/blob/main/villaaurora-ui/src/pages/images/background.jpg?raw=true)

# Booking Management System for Villa Aurora Private Resort

## Group 1 (System Analysis and Design)

## To Navigate the Ui React just type

### cd villaaurora-ui

or just go to the villaaurora-ui folder

## And to see the complete output just go to the ("finaloutputbranch")

[![PHP](https://img.shields.io/badge/PHP-%3E%3D%208.0-8892BF.svg)](https://www.php.net/)
[![React](https://img.shields.io/badge/React-%3E%3D%2018-61DAFB.svg)](https://reactjs.org/)
[![Blade](https://img.shields.io/badge/Blade-Laravel%20Template%20Engine-orange.svg)](https://laravel.com/docs/blade)
[![Laravel](https://img.shields.io/badge/Laravel-%5E11.x-red.svg)](https://laravel.com/)

### Purpose

The purpose of this project is to provide a comprehensive solution to enhance the visibility of Villa Aurora Private Resort by implementing a functional booking management system.

### Features

-   **Feature 1:** Registration and Login with cookie
-   **Feature 2:** Admin, Guest, Scheduler roles
-   **Feature 3:** Booking confirmation sent via Email
-   **Feature 4:** Ability to rate the site
-   **Feature 5:** Purchase options include in-person and via GCash
-   **Feature 6:** Has a recaptcha for the security
-   **Feature 7:** Also has calendar that show the transaction id of the user who booked that day
-   **Feature 8:** And has an https for security purposes

### Installation

To use this project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/kenralphsap/villa_aurora_project.git
cd villa_aurora_project

# Install dependencies
composer install

# Before running `composer install`, ensure you have Composer, MySQL, and Node.js installed.

# Set up the database and seed
php artisan migrate:fresh --seed

# Generate Passport keys
php artisan passport:keys
php artisan passport:client --personal

# Start the server
php artisan serve

# Navigate to the UI directory and install Node.js dependencies
cd villaaurora-ui
npm install

# If any issues arise, install necessary packages
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @mui/material @mui/x-data-grid react-toastify react-redux react-cookie react-big-calendar moment react-dom-confetti react-google-recaptcha

Example
Here's an example of how to use the project:
--Step 1: You have to login first if you do no have account just press register
--Step 2: After you finish register there is a message sent to your email and saying as a welcome mesage
--Step 3: Then you can now book in you website but simply filling all needing in data
--Step 4: And once you sucessfully booke there is another email sent to you for the total price and how do you want to pay also below the qrcode there is a link that go to our testimonial to rate our site

# Insert sample code or usage example
Contributing
We welcome contributions from the community. If you'd like to contribute to this project, please follow our contribution guidelines.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.


```
