import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { createProfile } from '../../redux/actions/profile'
import { connect } from 'react-redux'

const CreateProfile = ({ createProfile, profile, history }) => {
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
      if (profile) {
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
            status: status ? status : '',
            githubusername: githubusername ? githubusername : '',
            skills: skills ? skills.join(', ') : '',
            youtube: social && social.youtube ? social.youtube : '',
            facebook: social && social.facebook ? social.facebook : '',
            twitter: social && social.twitter ? social.twitter : '',
            instagram: social && social.instagram ? social.instagram : '',
            linkedin: social && social.linkedin ? social.linkedin : '',
         })
      }
   }, [profile, setUserData])

   const onChangeHandler = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value })
   }

   const submitHandler = (e) => {
      e.preventDefault()
      createProfile({ ...userData }, history, profile ? true : false)
   }

   return (
      <Fragment>
         <h1>{profile ? 'Edit Profile' : 'Create Your Profile'}</h1>
         <p>
            <i className='fas fa-user'></i> Let's get some information to make
            your profile stand out
         </p>
         <form className='form' onSubmit={(e) => submitHandler(e)}>
            <div className='form-group'>
               <select
                  name='status'
                  value={status}
                  onChange={(e) => onChangeHandler(e)}
               >
                  <option value=''>
                     Select Professional Status (Required)
                  </option>
                  <option value='Developer'>Developer</option>
                  <option value='Junior Developer'>Junior Developer</option>
                  <option value='Senior Developer'>Senior Developer</option>
                  <option value='Manager'>Manager</option>
                  <option value='Student or Learning'>
                     Student or Learning
                  </option>
                  <option value='Instructor'>Instructor or Teacher</option>
                  <option value='Intern'>Intern</option>
                  <option value='Other'>Other</option>
               </select>
               <small>Give us an idea of where you are at in your career</small>
            </div>
            <div className='form-group'>
               <input
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
                  type='text'
                  placeholder='Skills (Required)'
                  name='skills'
                  value={skills}
                  onChange={(e) => onChangeHandler(e)}
               />
               <small>
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
               </small>
            </div>
            <div className='form-group'>
               <input
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
                  placeholder='A short bio of yourself'
                  name='bio'
                  value={bio}
                  onChange={(e) => onChangeHandler(e)}
               ></textarea>
               <small>Tell us a little about yourself</small>
            </div>

            <div>
               <button type='button' onClick={() => setAddSocial(!addSocial)}>
                  Add Social Network Links
               </button>
               <span>Optional</span>
            </div>

            {addSocial && (
               <Fragment>
                  <div className='form-group social-input'>
                     <i className='fab fa-twitter'></i>
                     <input
                        type='text'
                        placeholder='Twitter URL'
                        name='twitter'
                        value={twitter}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='form-group social-input'>
                     <i className='fab fa-facebook'></i>
                     <input
                        type='text'
                        placeholder='Facebook URL'
                        name='facebook'
                        value={facebook}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='form-group social-input'>
                     <i className='fab fa-youtube'></i>
                     <input
                        type='text'
                        placeholder='YouTube URL'
                        name='youtube'
                        value={youtube}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='form-group social-input'>
                     <i className='fab fa-linkedin'></i>
                     <input
                        type='text'
                        placeholder='Linkedin URL'
                        name='linkedin'
                        value={linkedin}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>

                  <div className='form-group social-input'>
                     <i className='fab fa-instagram'></i>
                     <input
                        type='text'
                        placeholder='Instagram URL'
                        name='instagram'
                        value={instagram}
                        onChange={(e) => onChangeHandler(e)}
                     />
                  </div>
               </Fragment>
            )}
            <input type='submit' value='Save' />
            <Link to='/dashboard'>Go Back</Link>
         </form>
      </Fragment>
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