import React from "react";
import "../styles.css";
import aboutImage from "../assets/about.png"; // Use any image

function About() {
  return (
    <div className='about'>
      <h2>About SmartCodeHub</h2>
      <img src={aboutImage} alt='About SmartCodeHub' />
      <p>
        SmartCodeHub is an AI-enhanced code snippet manager designed to
        streamline code organization and boost developer productivity. Powered
        by OpenAI, it provides intelligent tagging, code suggestions, and
        real-time optimizations, making it a must-have tool for reactive
        programming and beyond.
      </p>
    </div>
  );
}

export default About;
