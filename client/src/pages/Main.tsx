import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero/Hero";
import LoginForm from "../components/LoginForm/LoginForm";
import Section from "../components/Section/Section";

const Main = () => {
  return (
    <div className="mainPage">
      <Hero />
      <div className="loginContainer">
        <LoginForm />
        <Section />
      </div>
    </div>
  );
};

export default Main;
