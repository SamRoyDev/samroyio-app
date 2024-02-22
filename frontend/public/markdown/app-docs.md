## General Project Overview

The SamRoyIO web application is a modern, interactive website designed to showcase projects, provide API documentation, and present a professional portfolio. The front-end is built using React and TypeScript, while the back-end leverages AWS services such as Lambda, API Gateway, and DynamoDB for serverless architecture.

## Frontend Components

### `App.tsx`
The `App` component serves as the main layout of the website, including navigation and various sections like projects and API documentation.

```tsx
import React from "react";
import "./css/App.css";
import Navigation from "./components/Navigation";
import Api from "./components/Api";
import GithubRepositories from "./components/GithubRepositories";
import TopButton from "./components/TopButton";

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
        <section id="projects">
          <GithubRepositories />
        </section>
        <Api />
      </main>
    </div>
  );
};

export default App;
```

### `GithubRepositories.tsx`
This component fetches and displays GitHub repositories, including commit counts and languages used.

```tsx
import { useState, useEffect } from "react";
import { RepositoryProps } from "../interfaces/ComponentProps";

function GithubRepositories() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  // ... (fetching and state management logic)
  return (
    <>
      <section id="github-repos">
        {repos.map((repo) => (
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" key={repo.id}>
            {/* ... */}
          </a>
        ))}
      </section>
    </>
  );
}

export default GithubRepositories;
```

### `TopButton.tsx`
A button that allows users to scroll back to the top of the page smoothly.

```tsx
import { useState, useEffect } from "react";
import {ReactComponent as TopButtonSvg} from "../graphics/topbutton.svg";

function TopButton() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  // ... (scroll event listener and state management logic)
  return (
    <>
      {showTopBtn && (
        <button className="top-btn" onClick={goToTop}>
          <TopButtonSvg />
        </button>
      )}
    </>
  );
}

export default TopButton;
```

## Backend Infrastructure Overview
```
- AWS::Serverless::Api
  - StageName: prod
  - Cors Configuration

- AWS::CloudFront::Distribution
  - Enabled: true
  - Aliases: backend.app.samroy.io

- AWS::Serverless::Function
  - HealthCheckFunction
  - PostVisitorFunction
  - GetVisitorCountFunction
  - GetSelfDocumentationResults

- AWS::DynamoDB::Table
  - TableName: VisitorCount
```

## API Documentation

### Health Check Endpoint

- **GET** `/health_check`
- Example Request: `GET https://backend.app.samroy.io/health_check`
- Example Response:
```json
{
  "status": "success",
  "message": "API is online.",
  "data": true
}
```

### Get Visitor Count Endpoint

- **GET** `/get_visitor_count`
- Example Request: `GET https://backend.app.samroy.io/get_visitor_count`
- Example Response:
```json
{
  "count": 1234
}
```

### Post Visitor Endpoint

- **POST** `/post_visitor`
- Example Request: `POST https://backend.app.samroy.io/post_visitor`
- Example Response:
```json
{
  "message": "Visitor recorded successfully."
}
```

## Future Plans for the Website

- Implement user authentication to provide a personalized experience.
- Add a blog section to share insights and updates.
- Integrate a contact form for direct communication.
- Enhance the portfolio section with case studies and testimonials.
- Improve accessibility and implement internationalization for wider reach.
- Optimize performance and implement progressive web app (PWA) features for offline access.
- Expand the API documentation to include interactive examples and versioning.