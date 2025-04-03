import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation within the app
import './style.css'; // Make sure your CSS is in the correct directory

const About = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <header>
        <h1>Software Engineering class SFSU</h1>
        <h6>Spring 2025 <br /> Section 3 <br /> Team 2</h6>
      </header>

      <div id="mainBody">
        <h2>Team Members</h2>
        <div className="cards">
          <div className="card">
            <Link to="/claudia">
              <img src="/Images/cj_profile.jpeg" alt="Claudia's photo" />
              <h3>Cj</h3>
            </Link>
          </div>
          <div className="card">
            <Link to="/daniel">
              <img src="/Images/Daniel.jpg" alt="Daniel's photo" />
              <h3>Daniel</h3>
            </Link>
          </div>
          <div className="card">
            <Link to="/nathan">
              <img src="/Images/nathan_profile.jpeg" alt="Nathan with pizza wings" />
              <h3>Nathan</h3>
            </Link>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <Link to="/fatimah">
              <img src="/Images/Fatimah.jpg" alt="Fatimah's photo" />
              <h3>Fatimah</h3>
            </Link>
          </div>
          <div className="card">
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
          <h5>Resources</h5>
        </div>
      </footer>
    </div>
  );
}

export default About;
