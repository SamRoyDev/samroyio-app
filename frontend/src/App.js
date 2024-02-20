import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
// import ResumeSection from "./ResumeSection";
// import Navigation from "./Navigation";
import GithubRepositories from "./GithubRepositories";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState("");

  // Effect for getting a welcome message - runs only once on mount
  useEffect(() => {
    axios
      .get("https://backend.app.samroy.io/health_check")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        setMessage(false)
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

  // Effect for posting visitor count - runs only once on mount
  useEffect(() => {
    axios.post("https://backend.app.samroy.io/post_visitor").catch((error) => {
      console.error("There was an error posting to visitor count api:", error);
    });
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="App">
      <header className="App-header">
        <div className="brand">
          <p>samroy.io</p>
        </div>
      </header>
      {/* <Navigation /> */}
      <main className="App-main">
        <br></br>
        <GithubRepositories />
        {/* <ResumeSection /> */}
        <p>Visitors: {count || "Loading Visitor Count..."}</p>
        <p>Backend API: {message || "Loading API Response..."}</p>
      </main>
    </div>
  );
}

export default App;
