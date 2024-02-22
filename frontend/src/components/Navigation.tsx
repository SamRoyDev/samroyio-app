import React from "react";

const Navigation: React.FC = () => {
  return (
    <>
      <div className="App-nav">
        <nav className="App-nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#documentation">Docs</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#api">API</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
