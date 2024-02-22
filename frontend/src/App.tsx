import React from "react";
import "./css/App.css";
import "./css/Navigation.css";
import "./css/GithubRepositories.css";
import "./css/ApiSection.css";
import "./css/Markdown.css";
//import ResumeSection from "./components/ResumeSection";
import Navigation from "./components/Navigation";
import Api from "./components/Api";
import GithubRepositories from "./components/GithubRepositories";
import TopButton from "./components/TopButton";
import MarkdownRenderer from "./components/MarkdownRenderer";

const App: React.FC = () => {
  return (
    <div className="App">
      <TopButton />
      <header className="App-header">
        <div className="brand">
          <p>sam roy</p>
        </div>
        <Api />
      </header>
      <Navigation />
      <main className="App-main">
        <br></br>
        <section id="documentation">
          <h1>Documentation</h1>
          <div className="markdown-body">
            <MarkdownRenderer filePath="./markdown/app-docs.md" />
          </div>
        </section>
        <section id="projects">
        <hr />
        <h1>Projects</h1>
          <GithubRepositories />
        </section>
        {/* <ResumeSection /> */}
        <section id="api">
        <hr />
        <h1>API</h1>
          <Api />
        </section>
      </main>
    </div>
  );
};

export default App;
