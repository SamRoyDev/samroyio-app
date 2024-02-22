// ResumeSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusOrb from "./StatusOrb";

const ResumeSection: React.FC = () => {
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
    <div className="api-dashboard">
      <div className="dashboard-item">
        <span className="dashboard-label">Visitors: </span>
        <span className="dashboard-value">{count || "Loading..."}</span>
      </div>
      <div className="dashboard-item">
        <StatusOrb status={health} />
        <span className="dashboard-value">
          {health ? " Healthy" : " Issues Detected"}
        </span>
      </div>
      <div className="dashboard-item">
        <span className="dashboard-label">API Health Message: </span>
        <span className="dashboard-value">
          {healthMesssage || "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default ResumeSection;
