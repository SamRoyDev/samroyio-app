import React from "react";
import "./css/App.css";
import "./css/Navigation.css";
import "./css/GithubRepositories.css";
//import ResumeSection from "../components/ResumeSection";
import Navigation from "./components/Navigation";
import ApiSection from "./components/ApiSection";
import GithubRepositories from "./components/GithubRepositories";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="brand">
          <p>sam roy</p>
        </div>
      </header>
      <Navigation />
      <main className="App-main">
        <br></br>
        <section id="projects">
          <GithubRepositories />
        </section>
        {/* <ResumeSection /> */}
        <ApiSection />
      </main>
    </div>
  );
};

export default App;
