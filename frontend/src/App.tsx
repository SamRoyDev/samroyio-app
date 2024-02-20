import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
//import ResumeSection from "../components/ResumeSection";
//import Navigation from "./Navigation";
import GithubRepositories from "./components/GithubRepositories";
import StatusOrb from "./components/StatusOrb";

const App: React.FC = () => {
  const [health, setHealth] = useState<boolean | null>(null);
  const [healthMesssage, setHealthMessage] = useState<string>("");
  const [count, setCount] = useState<string>("");

  // Effect for getting a welcome message - runs only once on mount
  useEffect(() => {
    axios
      .get("https://backend.app.samroy.io/health_check")
      .then((response) => {
        setHealth(response.data.data);
        setHealthMessage(response.data.message);
      })
      .catch((error) => {
        setHealth(false);
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
        <p>
          API Health Check: <StatusOrb status={health} />
        </p>
        <p>API Health Message: {healthMesssage || "Loading..."}</p>
      </main>
    </div>
  );
};

export default App;
