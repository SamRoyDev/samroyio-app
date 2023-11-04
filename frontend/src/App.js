import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState("");

  // Effect for posting visitor count - runs only once on mount
  useEffect(() => {
    axios.post("https://backend.app.samroy.io/post_visitor").catch((error) => {
      console.error("There was an error posting to visitor count api:", error);
    });
  }, []); // Empty dependency array means this effect runs once on component mount

  // Effect for getting a welcome message - runs only once on mount
  useEffect(() => {
    axios
      .get("https://backend.app.samroy.io/hello")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  // Effect for getting visitor count - runs only once on mount
  useEffect(() => {
    axios
      .get("https://backend.app.samroy.io/get_visitor_count")
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="App">
      <header className="App-header">
        <p>Visitors: {count || "Loading count..."}</p>
        <p>API Response: {message || "Loading..."}</p>
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
