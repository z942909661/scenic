const db = require('../db/index')
// 01_导入处理密码的模块 brcyptjs
const brcypt = require('bcryptjs')
exports.userInfo = (req,res) => {
    let strSql = 'select username,nickname,email from ev_users where id = ?'
    // express-jwt 
    db.query(strSql,[ req.user.id ],(err,result) => {
        if(err) return res.cc(err)
        if(result.length !== 1){
            return res.cc('获取用户信息失败')
        }
        res.send({
            status:200,
            message:'获取用户信息成功',
            data:result[0]
        })
    })
}

exports.updateUserInfo = (req,res)=> {
    let sqlStr = 'update ev_users set ? where id = ? '
    db.query(sqlStr,[ req.body,req.body.id ],(err,result) => {
        if(err) return res.cc(err)
        if(result.affectedRows !== 1){
            return res.cc('用户信息更新失败')
        }
        res.cc('用户信息更新成功',200)
    })
}

exports.updatePwd = (req,res) => {
    const sql = 'select * from ev_users where id = ?'
    db.query(sql,req.user.id,(err,result) => {
        if(err) return res.cc(err)
        if(result.length != 1){
            return res.cc('用户不存在！')

        }
        // 判断旧密码是否一致
        // 02_使用bcrypt的compareSync()函数做比较
        const compareResult = brcypt.compareSync(req.body.oldPassword,result[0].password)
        if(!compareResult) return res.cc('旧密码错误')

        // 修改密码的语句
        let updateSql = 'update ev_users set password = ? where id = ?'
        // 对新密码进行加密
        // 03_使用bcrypt的hashSync()函数进行加密
        const newPwd = brcypt.hashSync(req.body.newPassword,10)
        // 用新密码进行修改
        db.query(updateSql,[newPwd,req.user.id],(err,result) => {
            if(err) return res.cc(err)
            if(result.affectedRows !== 1){
                return res.cc('密码修改失败')
            }
            res.cc('密码修改成功',200)
        })

    }) 
}

exports.updateAvatar = (req,res) => {
    let sql = 'update ev_users set user_pic = ? where id = ?'    
    db.query(sql,[req.body.avatar,req.user.id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('头像修改失败')
        res.cc('头像修改成功',200)
    })
}