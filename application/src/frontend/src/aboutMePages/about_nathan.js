import React from 'react';
import './outline.css'; // Make sure the CSS file is in the correct directory

const AboutNathan = () => {
  return (
    <div>

      {/* Individual Name and Role */}
      <section id="individual-section">
        <div id="individual-div">
          <h1 id="name">Nathan Donat-Filliod</h1>
          <h4 id="role">Github Master</h4>
        </div>
      </section>

      {/* Individual About Me Section */}
      <section id="individual-about">
        <div id="about-div">
          <img id="img" src="/Images/nathan_profile.jpeg" alt="Nathan's Profile" />

          <div id="about-stack">
            <h3 id="about-name">Nathan Donat-Filliod</h3>
            <h5 id="about-role">Github Master</h5>

            <p id="description">
              Hey! My name is <b>Nathan</b> and I've been a developer for 4 years now. My role in this project is <b>Github Master</b>.
              <br />
              So I hope I can help my teammates and teach them a lot of things.
              <br /><br />
              When I'm free, I like to <b>do sport</b> and <b>code</b> original projects. I love to learn new things in general!
              <br /><br />
              Since I am in San Francisco, I've also discovered a new passion: <b>Travels</b>. So I'm taking advantage of this year to travel as much as possible and meet new people.
              <br /><br />
              PS: I'm also an International Student from France ;)
            </p>

            <div style={{ marginBottom: '200px' }}>
            <pre style={{ fontFamily: 'Courier New', whiteSpace: 'pre' }}>
{`
                      ~.    v
                v     /|\\
                     / | \\     v
                    /__|__\\
                  \\--------/
~~~~~~~~~~~~~~~~~~~\`~~~~~~'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`}
</pre>

            </div>
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

export default AboutNathan;
