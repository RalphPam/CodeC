import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faGlobe } from '@fortawesome/free-solid-svg-icons'
import {
   faTwitter,
   faFacebook,
   faInstagram,
   faLinkedin,
   faYoutube,
   faGithubAlt,
} from '@fortawesome/free-brands-svg-icons'

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
                           <FontAwesomeIcon icon={faYoutube} />
                        </a>
                     </li>
                  )}
                  {social.twitter && (
                     <li>
                        <a href={social.twitter} target='blank'>
                           <FontAwesomeIcon icon={faTwitter} />
                        </a>
                     </li>
                  )}
                  {social.facebook && (
                     <li>
                        <a href={social.facebook} target='blank'>
                           <FontAwesomeIcon icon={faFacebook} />
                        </a>
                     </li>
                  )}
                  {social.linkedin && (
                     <li>
                        <a href={social.linkedin} target='blank'>
                           <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                     </li>
                  )}
                  {social.instagram && (
                     <li>
                        <a href={social.instagram} target='blank'>
                           <FontAwesomeIcon icon={faInstagram} />
                        </a>
                     </li>
                  )}
               </ul>
            )}
            {location && (
               <h3 className='location-profile'>
                  <FontAwesomeIcon
                     className='location-logo'
                     icon={faMapMarker}
                  />{' '}
                  <span>{location}</span>
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
                     <FontAwesomeIcon
                        className='github-logo'
                        icon={faGithubAlt}
                     />{' '}
                     <span>{githubusername}</span>
                  </a>
               </h3>
            )}
            {website && (
               <h3 className='website-profile'>
                  <a href={website} target='blank'>
                     <FontAwesomeIcon className='website-logo' icon={faGlobe} />
                     <span>{website}</span>
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
