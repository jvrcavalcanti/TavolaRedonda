import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import AuthContext, { AuthProvider } from './contexts/auth';
import Header from './components/Header';
import Footer from './components/Footer';

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
