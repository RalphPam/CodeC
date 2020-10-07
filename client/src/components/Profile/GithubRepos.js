import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const GithubRepos = ({ repos }) => {
   if (repos.length === 0) return null
   return (
      <div className='github-page'>
         <h2 className='header-credential'>Github Repos</h2>
         <div className='repos'>
            {repos.map((repo, index) => (
               <Fragment>
                  {index % 2 > 0 && <div className='space-repo'></div>}
                  <div className='flex-repos'>
                     <div className='repos-container' key={repo.id}>
                        <div>
                           <a
                              className='repo-link'
                              href={repo.html_url}
                              target='blank'
                           >
                              {repo.name}
                           </a>
                           <p>{repo.description}</p>
                           <ul className='repo-li'>
                              <li>Stars: {repo.stargazers_count}</li>
                              <li>Watchers: {repo.watchers_count}</li>
                              <li>Forks: {repo.forks_count}</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </Fragment>
            ))}
         </div>
      </div>
   )
}

GithubRepos.propTypes = {
   repos: PropTypes.array.isRequired,
}

export default GithubRepos
