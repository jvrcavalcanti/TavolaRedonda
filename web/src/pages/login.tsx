import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignIn from "../components/SignIn";

export default function Login() {
  return (
    <main>
      <Head>
        <title>Távola Redonda - Login</title>
      </Head>
      <Header />
      <div className="container">
        <SignIn />
      </div>
      <Footer />
    </main>
  )
}