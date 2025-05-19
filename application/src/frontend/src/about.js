/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: about.js
*
* Description:: 
* Displays an overview of the project team for CSC 648-848.
* Shows information and profile photos for each team member,
* with navigation links to individual member pages.
*
**************************************************************/
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const About = () => {
  return (
    <div>
      <div className="welcome-box">
        <h2>Meet Team 02!</h2>
        <p>
          We are a group of students from SFSU, working on a software engineering project for our CSC 648-848 class.
        </p>
      </div>

      <div id="mainBody">
        <h2>Team Members</h2>
        <div className="about-cards">
          <div className="about-card">
            <Link to="/claudia">
              <img src="/Images/cj_profile.jpeg" alt="Claudia's photo" />
              <h3>Cj</h3>
            </Link>
          </div>
          <div className="about-card">
            <Link to="/daniel">
              <img src="/Images/Daniel.jpg" alt="Daniel's photo" />
              <h3>Daniel</h3>
            </Link>
          </div>
          <div className="about-card">
            <Link to="/nathan">
              <img src="/Images/nathan_profile.jpeg" alt="Nathan with pizza wings" />
              <h3>Nathan</h3>
            </Link>
          </div>
        </div>
        <div className="about-cards">
          <div className="about-card">
            <Link to="/fatimah">
              <img src="/Images/Fatimah.jpg" alt="Fatimah's photo" />
              <h3>Fatimah</h3>
            </Link>
          </div>
          <div className="about-card">
            <Link to="/davis">
              <img src="/Images/davis.jpg" alt="Davis's photo" />
              <h3>Davis</h3>
            </Link>
          </div>
        </div>
      </div>

      <hr />

      <footer>
        <div id="footer">
          <h5>Use cases</h5>
          <h5>Explore</h5>
          <h5>Logo credit: <a href="https://www.vecteezy.com/free-png/green">Green PNGs by Vecteezy</a></h5>
        </div>
      </footer>
    </div>
  );
}

export default About;
