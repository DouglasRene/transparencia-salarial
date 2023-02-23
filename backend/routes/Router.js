const express = require('express')
const router = express()

//Routes
router.use('/api/', require('./InsertRouter'))

module.exports = router