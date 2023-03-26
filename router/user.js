const express = require('express')
const router = express.Router()
const user_handler = require('../router-handle/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// reg_login_schema 中间件
// 验证失败，进入全局错误中间件处理
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser)

router.post('/login',expressJoi(reg_login_schema),user_handler.login)
router.post('/user/list',user_handler.getUser)
module.exports = router