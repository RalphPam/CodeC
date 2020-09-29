const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

router.get('/me', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({
         user: req.user.id,
      }).populate('user', ['name', 'avatar'])

      res.json(profile)
      if (!profile) {
         return res
            .status(400)
            .json({ msg: 'There is no profile for this user' })
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})

router.post(
   '/',
   [auth, [check('status').not().isEmpty(), check('skills').not().isEmpty()]],
   async (req, res) => {
      const error = validationResult(req)
      if (!error.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

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
      } = req.body

      const profileFields = {}

      profileFields.user = req.user.id

      if (company) profileFields.company = company
      if (website) profileFields.website = website
      if (location) profileFields.location = location
      if (bio) profileFields.bio = bio
      if (status) profileFields.status = status
      if (githubusername) profileFields.githubusername = githubusername

      if (skills)
         profileFields.skills = skills.split(',').map((skill) => skill.trim())

      profileFields.social = {}
      if (youtube) profileFields.social.youtube = youtube
      if (facebook) profileFields.social.facebook = facebook
      if (twitter) profileFields.social.twitter = twitter
      if (instagram) profileFields.social.instagram = instagram
      if (linkedin) profileFields.social.linkedin = linkedin
      try {
         let profile = await Profile.findOne({ user: req.user.id })
         if (profile) {
            profile = await Profile.findOneAndUpdate(
               { user: req.user.id },
               { $set: profileFields },
               { new: true }
            )
            return res.json(profile)
         }
         profile = new Profile(profileFields)
         await profile.save()
         res.json(profile)
      } catch (err) {
         console.error(err.message)
         return res.status(500).send('Server Error')
      }
   }
)

router.get('/', async (req, res) => {
   try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar'])
      if (!profiles)
         return res.status(400).json({ msg: 'There are no profiles' })
      res.json(profiles)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})

router.get('/user/:user_id', async (req, res) => {
   try {
      const profile = await Profile.findOne({
         user: req.params.user_id,
      }).populate('user', ['name', 'avatar'])
      if (!profile) return res.status(400).json({ msg: 'Profile not found' })
      res.json(profile)
   } catch (err) {
      console.error(err.message)
      if (err.kind === 'ObjectId')
         return res.status(400).json({ error: [{ msg: 'Profile not found' }] })
      res.status(500).send('Server Error')
   }
})

router.delete('/', auth, async (req, res) => {
   try {
      await Profile.deleteOne({ user: req.user.id })
      await User.deleteOne({ _id: req.user.id })
      res.json({ msg: 'User deleted' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})

router.put(
   '/experience',
   [
      auth,
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty())
         return res.status(400).json({ errors: errors.array() })

      const {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      } = req.body

      const newExp = {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      }

      try {
         const profile = await Profile.findOne({ user: req.user.id })
         profile.experience.unshift(newExp)
         await profile.save()
         res.json(profile)
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error')
      }
   }
)

router.delete('/experience/:exp_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id })
      const removeIndex = profile.experience
         .map((exp) => exp.id)
         .indexOf(req.params.exp_id)
      profile.experience.splice(removeIndex, 1)
      await profile.save()
      res.json(profile)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

router.put(
   '/education',
   [
      auth,
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty())
         return res.status(400).json({ errors: errors.array() })

      const {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description,
      } = req.body

      const newEduc = {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description,
      }

      try {
         const profile = await Profile.findOne({ user: req.user.id })
         profile.education.unshift(newEduc)
         await profile.save()
         res.json(profile)
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error')
      }
   }
)

router.delete('/education/:educ_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id })
      const removeIndex = profile.education
         .map((educ) => educ.id)
         .indexOf(req.params.educ_id)
      profile.education.splice(removeIndex, 1)
      await profile.save()
      res.json(profile)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
   }
})

module.exports = router
