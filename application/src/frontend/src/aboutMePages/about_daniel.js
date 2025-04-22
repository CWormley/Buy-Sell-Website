import React from 'react';
import './outline.css'; // Ensure your CSS is in the correct directory

const AboutDaniel = () => {
  return (
    <div>

      {/* Individual Name and Role */}
      <section id="individual-section">
        <div id="individual-div">
          <h1 id="name">Daniel</h1>
          <h4 id="role">Role</h4>
        </div>
      </section>

      {/* Individual About Me Section */}
      <section id="individual-about">
        <div id="about-div">
          <img id="img" src="/Images/Daniel.jpg" alt="Description of Daniel's photo" />
          
          <div id="about-stack">
            <h3 id="about-name">Daniel</h3>
            <h5 id="about-role">Frontend Lead</h5>
            
            <p id="description">
              Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite 
              perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, 
              essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute 
              quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter 
              destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
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

export default AboutDaniel;
