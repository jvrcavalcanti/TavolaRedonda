import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import Header from './components/Header';
import Footer from './components/Footer';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header/>
        <Routes/>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
