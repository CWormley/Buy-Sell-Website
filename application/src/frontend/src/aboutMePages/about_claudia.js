import React from 'react';
import './outline.css'; // Ensure your CSS is in the correct directory

const AboutClaudia = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      {/* Individual Name and Role */}
      <section id="individual-section">
        <div id="individual-div">
          <h1 id="name">Cj</h1>
          <h4 id="role">Team Lead</h4>
        </div>
      </section>

      {/* Individual About Me Section */}
      <section id="individual-about">
        <div id="about-div">
          <img id="img" src="/Images/cj_profile.jpeg" alt="Description of Cj's photo" />
          
          <div id="about-stack">
            <h3 id="about-name">Name</h3>
            <h5 id="about-role">Role</h5>
            
            <p id="description">
              Hi, my name is Cj and I am the team lead for this project. I am a computer science major at SFSU. 
              I have experience in web and mobile development and I am excited to work on this project with my team. 
              I am looking forward to learning more about software engineering and working with my team to create 
              a great project. I am excited to see what we can accomplish together.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* Footer */}
      <footer>
        <div id="footer">
          <h5>Use cases</h5>
          <h5>Explore</h5>
          <h5>Resources</h5>
        </div>
      </footer>
    </div>
  );
};

export default AboutClaudia;
