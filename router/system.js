const express = require('express')
const router = express.Router()
const system_handler = require('../router-handle/system')
router.post('/role/list',system_handler)
module.exports = router