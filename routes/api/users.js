const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

router.post(
   '/',
   [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter 6 or more characters').isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, password } = req.body

      try {
         let user = await User.findOne({ email: email })
         if (user) {
            return res
               .status(400)
               .json({ error: [{ msg: 'User already exists' }] })
         }
         const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
         })
         user = new User({
            name,
            email,
            password,
            avatar,
         })
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(password, salt)
         await user.save()
         res.send('User Route')
      } catch (error) {
         console.error(error)
         res.status(500).send('Server Error')
      }
   }
)

module.exports = router
