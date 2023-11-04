import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

// Dummy function for the visitor counter - in a real app this would be dynamic
const useVisitorCounter = () => {
  return 10 + 10; // This would be replaced by the actual count from a backend service
};

function App() {
  const visitorCount = useVisitorCounter();

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://134zz2i5of.execute-api.us-west-1.amazonaws.com/Prod/hello")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Visitors: {visitorCount}</p>
        <p>API Response: {message || "Loading..."}</p>
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
        <footer className="App-footer"></footer>
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
