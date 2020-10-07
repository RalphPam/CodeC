import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const Profile2nd = ({ profile }) => {
   const { githubusername, social, location, website } = profile
   if (!profile) return <Spinner />
   return (
      <div className='profile-2'>
         <div className='first-row'>
            {social && (
               <ul className='social-profile'>
                  {social.youtube && (
                     <li>
                        <a href={social.youtube} target='blank'>
                           <i className='fab fa-youtube'></i>
                        </a>
                     </li>
                  )}
                  {social.twitter && (
                     <li>
                        <a href={social.twitter} target='blank'>
                           <i class='fab fa-twitter'></i>
                        </a>
                     </li>
                  )}
                  {social.facebook && (
                     <li>
                        <a href={social.facebook} target='blank'>
                           <i className='fab fa-facebook'></i>
                        </a>
                     </li>
                  )}
                  {social.linkedin && (
                     <li>
                        <a href={social.linkedin} target='blank'>
                           <i className='fab fa-linkedin'></i>
                        </a>
                     </li>
                  )}
                  {social.instagram && (
                     <li>
                        <a href={social.instagram} target='blank'>
                           <i className='fab fa-instagram'></i>
                        </a>
                     </li>
                  )}
               </ul>
            )}
            {location && (
               <h3 className='location-profile'>
                  <i className='fas fa-map-marker'></i> <span>{location}</span>
               </h3>
            )}
         </div>
         <div className='second-row'>
            {githubusername && (
               <h3 className='github-profile'>
                  <a
                     href={`https://github.com/${githubusername}`}
                     target='blank'
                  >
                     <i className='fab fa-github-alt'></i>{' '}
                     <span>{githubusername}</span>
                  </a>
               </h3>
            )}
            {website && (
               <h3 className='website-profile'>
                  <a href={website} target='blank'>
                     <i className='fas fa-globe'></i> <span>{website}</span>
                  </a>
               </h3>
            )}
         </div>
      </div>
   )
}

Profile2nd.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default Profile2nd
