import { useState, useEffect } from "react";
import { RepositoryProps } from "../interfaces/ComponentProps";

function GithubRepositories() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  const [error, setError] = useState(""); // State to hold error messages

  const fetchOptions = {
    headers: {
      "User-Agent": "AppSamRoyIo/1.0",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    const username = "SamRoyDev";
    const apiURL = `https://api.github.com/users/${username}/repos`;

    fetch(apiURL, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((repos) => {
        const repoPromises = repos.map((repo: RepositoryProps) => {
          const commitsPromise = fetch(repo.contributors_url, fetchOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `HTTP error! status: ${response.status} ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((contributors) =>
              contributors.reduce(
                (acc: number, contributor: { contributions: number }) =>
                  acc + contributor.contributions,
                0
              )
            )
            .catch((error) => {
              console.error("Error fetching commit counts:", error);
              return "Error"; // Return a placeholder or specific error message
            });

          const languagesPromise = fetch(repo.languages_url!, fetchOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `HTTP error! status: ${response.status} ${response.statusText}`
                );
              }
              return response.json();
            })
            .then((languages) => Object.keys(languages).join(", "))
            .catch((error) => {
              console.error("Error fetching languages:", error);
              return "Error"; // Return a placeholder or specific error message
            });

          return Promise.all([commitsPromise, languagesPromise]).then(
            ([commitCount, languages]) => ({
              ...repo,
              commit_count: commitCount,
              languages: languages || "None",
            })
          );
        });

        Promise.all(repoPromises)
          .then((reposWithDetails) => {
            const sortedRepos = reposWithDetails.sort((a, b) => {
              if (a.commit_count === "Error") return 1;
              if (b.commit_count === "Error") return -1;
              return b.commit_count - a.commit_count;
            });
            setRepos(sortedRepos);
          })
          .catch((error) => {
            console.error("Error processing repositories:", error);
            setError("Failed to load repository details.");
          });
      })
      .catch((error) => {
        console.error("Error fetching GitHub repos:", error);
        setError(error.message);
      });
  });

  if (error) {
    return <div>Error: {error}</div>; // Render error message if an error occurred
  }

  return (
    <>
      <section id="github-repos">
        {repos.map((repo) => (
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
            key={repo.id}
          >
            <div className="repo">
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <div>
                <span>Commits: {repo.commit_count}</span>{" "}
                <span>Languages: {repo.languages}</span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </>
  );
}

export default GithubRepositories;
