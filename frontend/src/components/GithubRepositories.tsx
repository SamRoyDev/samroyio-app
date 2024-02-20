import React, { useState, useEffect } from "react";
import { RepositoryProps } from "../interfaces/ComponentProps";

function GithubRepositories() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    const username = "SamRoyDev"; // Replace with your actual GitHub username
    const apiURL = `https://api.github.com/users/${username}/repos`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((repos: RepositoryProps[]) => {
        const repoPromises = repos.map((repo) =>
          fetch(`${repo.contributors_url}`)
            .then((response) => response.json())
            .then((contributors) => {
              const commitCount = contributors.reduce(
                (acc: number, contributor: { contributions: number }) => acc + contributor.contributions,
                0
              );
              return { ...repo, commit_count: commitCount };
            })
            .catch(() => ({ ...repo, commit_count: "N/A" })) // Handle any errors
        );

        Promise.all(repoPromises).then((reposWithCommitCount) => {
          const sortedRepos = reposWithCommitCount.sort((a, b) => {
            if (typeof a.commit_count === "number" && typeof b.commit_count === "number") {
              return b.commit_count - a.commit_count;
            }
            return 0;
          });
          setRepos(sortedRepos);
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
