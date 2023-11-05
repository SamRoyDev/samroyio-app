import React, { useState, useEffect } from "react";

function GithubRepositories() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const username = "SamRoyDev"; // Replace with your actual GitHub username
    const apiURL = `https://api.github.com/users/${username}/repos`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((repos) => {
        // Fetch the contributors for each repository to get the commit count
        const repoPromises = repos.map(
          (repo) =>
            fetch(`${repo.contributors_url}`)
              .then((response) => response.json())
              .then((contributors) => {
                // Calculate the total number of contributions by summing up the contributions from each contributor
                const commitCount = contributors.reduce(
                  (acc, contributor) => acc + contributor.contributions,
                  0
                );
                return { ...repo, commit_count: commitCount };
              })
              .catch(() => ({ ...repo, commit_count: "N/A" })) // Handle any errors, perhaps the repo is empty or private
        );

        // Wait for all the commit counts to be fetched
        Promise.all(repoPromises).then((reposWithCommitCount) => {
          // Now we have all the repositories with commit counts
          const sortedRepos = reposWithCommitCount.sort((a, b) => {
            return b.commit_count - a.commit_count;
          });
          setRepos(sortedRepos); // Set the sorted repositories in state
        });
      })
      .catch((error) => console.error("Error fetching GitHub repos:", error));
  }, []);

  return (
    <>
      <section id="github-repos">
        {repos.map((repo) => (
          <div className="repo" key={repo.id}>
            <h2>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h2>
            <p>{repo.description}</p>
            {/* <span>Stars: {repo.stargazers_count}</span>
            <span>Forks: {repo.forks_count}</span> */}
            <span>
              Commits:{" "}
              {typeof repo.commit_count === "number"
                ? repo.commit_count
                : "Private or Empty Repository"}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}

export default GithubRepositories;
