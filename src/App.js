import React from "react";
import logo from "./logo.svg";
import "./App.css";

// Dummy function for the visitor counter - in a real app this would be dynamic
const useVisitorCounter = () => {
  return 10 + 10; // This would be replaced by the actual count from a backend service
};

function App() {
  const visitorCount = useVisitorCounter();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sam Roy</h1>
        <h2>Head of Technology</h2>
        <section className="Resume-section">
          <h3>Experience</h3>
          <p>Position at Company</p>
          <p>More details about experience, projects, etc.</p>
        </section>
        <section className="Resume-section">
          <h3>Education</h3>
          <p>BS in Computer Science from State University</p>
        </section>
        <section className="Resume-section">
          <h3>Skills</h3>
          <p>JavaScript, React, Node.js, etc.</p>
        </section>
        <footer className="App-footer">
          <p>Visitors: {visitorCount}</p>
        </footer>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
