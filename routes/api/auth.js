const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})

router.post(
   '/',
   [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter 6 or more characters').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      try {
         let user = await User.findOne({ email: email })
         const isMatch = await bcrypt.compare(password, user.password)
         if (!user || !isMatch) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Invalid Credentials' }] })
         }
         const payload = {
            user: {
               id: user.id,
            },
         }
         jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
               if (err) {
                  throw err
               }
               res.json({ token })
            }
         )
      } catch (error) {
         console.error(error)
         res.status(500).send('Server Error')
      }
   }
)

module.exports = router
