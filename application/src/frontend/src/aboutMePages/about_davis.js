import React from 'react';
import './outline.css'; // Make sure the CSS file is in the correct directory

const AboutDavis = () => {
  return (
    <div>

      {/* Individual Name and Role */}
      <section id="individual-section">
        <div id="individual-div">
          <h1 id="name">Davis Rosenstein</h1>
          <h4 id="role">Frontend Lead</h4>
        </div>
      </section>

      {/* Individual About Me Section */}
      <section id="individual-about">
        <div id="about-div">
          <img id="img" src="/Images/davis.jpg" alt="Davis's photo" />
          
          <div id="about-stack">
            <h3 id="about-name">Davis Rosenstein</h3>
            <h5 id="about-role">Frontend Lead</h5>
            
            <p id="description">
              Hi, I'm Davis and I am a Computer Science student at San Francisco State University interested in
              software development and problem-solving. I am excited to graduate this semester and get my degree. I
              always like a challenge, which is one of the reasons that I enjoy computer science. Outside of school
              and work, I like to read, play video games, spend time with my friends, and watch anime.
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

export default AboutDavis;
