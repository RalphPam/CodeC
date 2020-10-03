import React from 'react'
import PropTypes from 'prop-types'

const GithubRepos = ({ repos }) => {
   if (repos.length === 0) return null
   return (
      <div>
         <h3>Github Repos</h3>
         {repos.map((repo) => (
            <div key={repo.id}>
               <div>
                  <a href={repo.html_url} target='blank'>
                     {repo.name}
                  </a>
                  <ul>
                     <li>Stars: {repo.stargazers_count}</li>
                     <li>Watchers: {repo.watchers_count}</li>
                     <li>Forks: {repo.forks_count}</li>
                  </ul>
               </div>
               <p>{repo.description}</p>
            </div>
         ))}
      </div>
   )
}

GithubRepos.propTypes = {
   repos: PropTypes.array.isRequired,
}

export default GithubRepos
