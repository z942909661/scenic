
const getLuggageList = require('../router-handle/luggage')
// 1.引入express 
const express = require('express')
// 2.创建router
const router = express.Router()
// 3,创建接口
router.post('/luggage/list',getLuggageList.getLuggageList)

module.exports = router
