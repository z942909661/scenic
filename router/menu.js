const express = require('express')
const router = express.Router()
const menu_handler = require('../router-handle/menu')

router.post('/menu/list',menu_handler.getMenu)

module.exports = router
