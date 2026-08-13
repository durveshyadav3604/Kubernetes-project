import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;

