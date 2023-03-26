// 导入定义验证规则的包
const { not } = require('joi')
const joi = require('joi')
const username = joi.string().alphanum().min(3).max(10).required()
// [\S]:不能包含空白字符
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()
exports.reg_login_schema = {
    body:{
        password,
        username
    }
}

exports.update_userInfo_schema = {
    body:{
        id,nickname,email
    }
}

exports.update_password_schema = {
    body:{
        oldPassword: password,
        newPassword:joi.not(joi.ref('oldPassword')).concat(password)
    }
}

exports.update_avatar_schema = {
    body:{
        avatar
    }
}