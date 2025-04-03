import React from 'react';
const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      <header>
        <h1>Welcome to Team 2's Web Page!</h1>
      </header>

      <div id="mainBody">
        <p>This is our project homepage.</p>
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

export default Home;
