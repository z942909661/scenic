const express = require('express')
const router = express.Router()
const {userInfo,updateUserInfo,updatePwd,updateAvatar} = require('../router-handle/userInfo')
const expressJoi = require('@escook/express-joi')
const { update_userInfo_schema,update_password_schema, update_avatar_schema } = require('../schema/user')

router.get('/user',userInfo)
router.post('/userInfo',expressJoi(update_userInfo_schema),updateUserInfo)
router.post('/updatePwd',expressJoi(update_password_schema),updatePwd)
router.post('/update/avatar',expressJoi(update_avatar_schema),updateAvatar)
module.exports = router