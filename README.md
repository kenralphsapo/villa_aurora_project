![Background Image](https://github.com/kenralphsapo/villa_aurora_project/blob/featurebranch/public/images/background.jpg?raw=true)

# Booking Management System for Villa Aurora Private Resort

## Group 1 (System Analysis and Design)
[![PHP](https://img.shields.io/badge/PHP-%3E%3D%208.0-8892BF.svg)](https://www.php.net/)
[![React](https://img.shields.io/badge/React-%3E%3D%2016-61DAFB.svg)](https://reactjs.org/)
[![Blade](https://img.shields.io/badge/Blade-Laravel%20Template%20Engine-orange.svg)](https://laravel.com/docs/blade)
[![Laravel](https://img.shields.io/badge/Laravel-%5E11.x-red.svg)](https://laravel.com/)

### Purpose
The purpose of this project is to provide a comprehensive solution to enhance the visibility of Villa Aurora Private Resort by implementing a functional booking management system.

### Features
- **Feature 1:** Registration and Login
- **Feature 2:** Admin, Guest, Scheduler roles
- **Feature 3:** Booking confirmation sent via Email
- **Feature 4:** Ability to rate the site
- **Feature 5:** Purchase options include in-person and via GCash

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
bash
Copy code
# Navigate to the UI directory and install Node.js dependencies
cd villaaurora-ui
npm install

# If any issues arise, install necessary packages
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @mui/material @mui/x-data-grid react-toastify react-redux react-cookie react-big-calendar moment react-dom-confetti react-google-recaptcha
Example
Here's an example of how to use the project:

# Insert sample code or usage example
Contributing
We welcome contributions from the community. If you'd like to contribute to this project, please follow our contribution guidelines.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Acknowledgements
We would like to thank the following contributors for their valuable input and feedback:

William B Jr. Adornado
Ken Ralph Sapo
Sir Jeco Conception
Sir Mark Elrey De Vera
