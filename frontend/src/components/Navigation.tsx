import React from "react";

const Navigation: React.FC = () => {
  return (
    <>
      <nav className="App-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#api">API</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
