import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Undead() {
  // Function to handle smooth scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Typography>Hello</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Box className="bg-black" style={{ height: 'auto' }}>
          <Box onClick={() => scrollToSection('section_1')}>
            <Link to="#">Home</Link>
          </Box>
          <Box onClick={() => scrollToSection('section_2')}>
            <Link to="#">Service</Link>
          </Box>
          <Box onClick={() => scrollToSection('section_3')}>
            <Link to="#">Feature</Link>
          </Box>
          <Box onClick={() => scrollToSection('section_4')}>
            <Link to="#">Room</Link>
          </Box>
          <Box onClick={() => scrollToSection('section_5')}>
            <Link to="#">Footer</Link>
          </Box>
        </Box>
        <Box className="bg-warning">
          <section id="section_1" style={{ height: '100vh' }}>
            <Box>Home</Box>
          </section>
          <section id="section_2" style={{ height: '100vh' }}>
            <Box>Service</Box>
          </section>
          <section id="section_3" style={{ height: '100vh' }}>
            <Box>Feature</Box>
          </section>
          <section id="section_4" style={{ height: '100vh' }}>
            <Box>Room</Box>
          </section>
          <section id="section_5" style={{ height: '100vh' }}>
            <Box>Footer</Box>
          </section>
        </Box>
      </div>
    </>
  );
}
