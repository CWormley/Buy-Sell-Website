import React from 'react';
import './outline.css'; // Make sure the CSS file is in the correct directory

const AboutFatimah = () => {
  return (
    <div>

      {/* Individual Name and Role */}
      <section id="individual-section">
        <div id="individual-div">
          <h1 id="name">Fatimah Abdolcader</h1>
          <h4 id="role">Front-End Engineer</h4>
        </div>
      </section>

      {/* Individual About Me Section */}
      <section id="individual-about">
        <div id="about-div">
          <img id="img" src="/Images/Fatimah.jpg" alt="Fatimah's Picture" />
          
          <div id="about-stack">
            <h3 id="about-name">Fatimah</h3>
            <h5 id="about-role">Front-End Engineer</h5>
            
            <p id="description">
              <br />
              Hello, my name is <b>Fatimah</b> and I am a <b>third-year Computer Science major</b> working on the <b>front-end</b> team.
              <br />
              <br />
              Previously, I worked at a tech start-up as an <b>Information Technologist</b>, where I learned more about problem-solving and customer service.
              <br />
              <br />
              I am currently working on creating a <b>Pomodoro Timer App project</b> to improve the UI over the other apps I currently use.
              <br />
              <br />
              In front-end development, I look forward to <b>learning more about how to collaborate on a team with GitHub</b> and expanding my skills in the front-end domain.
              <br />
              <br />
              In my free time, I enjoy <b>rock climbing, hanging out with friends, learning new coding skills, and playing with my cats</b>.
              <br />
              <br />
              My most recent obsession has been <b>winning plushies with my cousins at Round 1</b>.
              <br /><br />
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

export default AboutFatimah;
