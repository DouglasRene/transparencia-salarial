const express = require('express')
const router = express.Router()

//Controller
const { conecta, insert } = require('../controllers/InsertController')

//Routes
router.get('/', (req, res) => {
  res.json({messge: 'Helo World'})
})

router.post('/insert', insert)

module.exports = router