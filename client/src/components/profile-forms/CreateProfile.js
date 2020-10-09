import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { createProfile } from '../../redux/actions/profile'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBackward } from '@fortawesome/free-solid-svg-icons'
import {
   faTwitter,
   faFacebook,
   faInstagram,
   faLinkedin,
   faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const CreateProfile = ({ createProfile, profile, history }) => {
   const [editToggle, setEditToggle] = useState(null)
   const [addSocial, setAddSocial] = useState(false)
   const [userData, setUserData] = useState({
      company: '',
      website: '',
      location: '',
      bio: '',
      status: '',
      githubusername: '',
      skills: '',
      youtube: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
   })
   const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
   } = userData

   useEffect(() => {
      const {
         company,
         website,
         location,
         bio,
         status,
         githubusername,
         skills,
         social,
      } = profile
      setUserData({
         company: company ? company : '',
         website: website ? website : '',
         location: location ? location : '',
         bio: bio ? bio : '',
         status: status && status !== 'None' ? status : '',
         githubusername: githubusername ? githubusername : '',
         skills: skills && skills[0] !== 'None' ? skills.join(', ') : '',
         youtube: social && social.youtube ? social.youtube : '',
         facebook: social && social.facebook ? social.facebook : '',
         twitter: social && social.twitter ? social.twitter : '',
         instagram: social && social.instagram ? social.instagram : '',
         linkedin: social && social.linkedin ? social.linkedin : '',
      })
      if (status === 'None' || status === '') setEditToggle(true)
      else setEditToggle(false)
   }, [profile, setUserData, editToggle])

   const onChangeHandler = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value })
   }

   const submitHandler = (e) => {
      e.preventDefault()
      createProfile(
         { ...userData },
         history,
         editToggle && editToggle ? false : true
      )
   }

   return (
      <div className='create-profile-page'>
         <h1 className='header'>
            {editToggle ? 'Create Your Profile' : 'Edit Profile'}
         </h1>
         <p className='header-label'>
            <FontAwesomeIcon icon={faUser} /> Let's get some information to make
            your profile stand out
         </p>
         <form className='form' onSubmit={(e) => submitHandler(e)}>
            <div className='form-group'>
               <input
                  type='text'
                  className='input-form'
                  name='status'
                  value={status}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder='eg. Electronics Engineer'
                  required
               />
               <small>
                  Give us an idea of where you are at in your career (Required)
               </small>
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Company'
                  name='company'
                  value={company}
                  onChange={(e) => onChangeHandler(e)}
               />
               <small>Could be your own company or one you work for</small>
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Website'
                  name='website'
                  value={website}
                  onChange={(e) => onChangeHandler(e)}
               />
               <small>Could be your own or a company website</small>
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={(e) => onChangeHandler(e)}
               />
               <small>
                  City & state suggested (eg. City of San Fernando, Pampanga)
               </small>
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Skills (Required)'
                  name='skills'
                  value={skills}
                  onChange={(e) => onChangeHandler(e)}
                  required
               />
               <small>
                  Please use comma separated values (eg. Python, C++, CISCO)
               </small>
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Github Username'
                  name='githubusername'
                  value={githubusername}
                  onChange={(e) => onChangeHandler(e)}
               />
               <small>
                  If you want your latest repos and a Github link, include your
                  username
               </small>
            </div>
            <div className='form-group'>
               <textarea
                  className='textarea'
                  placeholder='A short bio of yourself'
                  name='bio'
                  value={bio}
                  onChange={(e) => onChangeHandler(e)}
               ></textarea>
               <small>Tell us a little about yourself</small>
            </div>

            <div className='social-btn'>
               <button type='button' onClick={() => setAddSocial(!addSocial)}>
                  Add Social Network Links
               </button>
               <small>Optional</small>
            </div>

            {addSocial && (
               <Fragment>
                  <div className='social-input'>
                     <FontAwesomeIcon
                        className='social-logo'
                        icon={faTwitter}
                     />
                     <input
                        className='social-link'
                        type='text'
                        placeholder='Twitter URL'
                        name='twitter'
                        value={twitter}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='social-input'>
                     <FontAwesomeIcon
                        className='social-logo'
                        icon={faFacebook}
                     />
                     <input
                        className='social-link'
                        type='text'
                        placeholder='Facebook URL'
                        name='facebook'
                        value={facebook}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='social-input'>
                     <FontAwesomeIcon
                        className='social-logo'
                        icon={faYoutube}
                     />
                     <input
                        className='social-link'
                        type='text'
                        placeholder='YouTube URL'
                        name='youtube'
                        value={youtube}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='social-input'>
                     <FontAwesomeIcon
                        className='social-logo'
                        icon={faLinkedin}
                     />
                     <input
                        className='social-link'
                        type='text'
                        placeholder='Linkedin URL'
                        name='linkedin'
                        value={linkedin}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='social-input'>
                     <FontAwesomeIcon
                        className='social-logo'
                        icon={faInstagram}
                     />
                     <input
                        className='social-link'
                        type='text'
                        placeholder='Instagram URL'
                        name='instagram'
                        value={instagram}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>
               </Fragment>
            )}
            <div className='submit-container'>
               <Link className='back' to='/dashboard'>
                  <FontAwesomeIcon icon={faBackward} />
               </Link>
               <input className='submit-btn' type='submit' value='Save' />
            </div>
         </form>
      </div>
   )
}

const mapStateToProps = (state) => ({
   profile: state.profile.profile,
})

CreateProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { createProfile })(
   withRouter(CreateProfile)
)
