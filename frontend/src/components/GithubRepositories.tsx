import { useState, useEffect } from "react";
import { RepositoryProps } from "../interfaces/ComponentProps";

function GithubRepositories() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    const username = "SamRoyDev";
    const apiURL = `https://api.github.com/users/${username}/repos`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((repos) => {
        const repoPromises = repos.map((repo: RepositoryProps) => {
          // Fetch for commit counts
          // Fetch for commit counts
          const commitsPromise = fetch(repo.contributors_url)
            .then((response) => response.json())
            .then((contributors) =>
              contributors.reduce(
                (acc: number, contributor: { contributions: number }) =>
                  acc + contributor.contributions,
                0
              )
            )
            .catch(() => "N/A");

          // Fetch for languages
          const languagesPromise = fetch(repo.languages_url!)
            .then((response) => response.json())
            .then((languages) => Object.keys(languages).join(", "))
            .catch(() => "N/A");

          // Combine both promises
          return Promise.all([commitsPromise, languagesPromise]).then(
            ([commitCount, languages]) => ({
              ...repo,
              commit_count: commitCount,
              languages: languages || "None", // Handle the case where no languages are returned
            })
          );
        });

        Promise.all(repoPromises).then((reposWithDetails) => {
          // Sort repositories by commit count (highest first)
          const sortedRepos = reposWithDetails.sort((a, b) => {
            // Handle "N/A" commit counts by putting them at the end
            if (a.commit_count === "N/A") return 1;
            if (b.commit_count === "N/A") return -1;

            // Compare numerical commit counts
            return b.commit_count - a.commit_count;
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
