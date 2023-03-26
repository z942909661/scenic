const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const mapSearch = require('../utils/search')
exports.regUser = (req,res) => {
    let userInfo = req.body
    if(!userInfo.username || !userInfo.password)
    {
        // return res.send({status:401,msg:'用户名密码不能为空'})
        return res.cc('用户名密码不能为空')
    }
    else{
        let sqlStr = 'select * from ev_users where username = ?'
        db.query(sqlStr,[ userInfo.username ],(err,result) => {
            if(err) return res.send(err.message)
            if(result.length>0){
                // return res.send({status:401,msg:'用户名已被占用'})
                return res.cc('用户名已被占用')
            }else{
                userInfo.password = bcrypt.hashSync(userInfo.password,10)
                let insertSql = 'insert into ev_users set ?'
                db.query(insertSql,[userInfo],(err,result) => {
                    if(err) return res.cc('添加用户失败')
                    if(result.affectedRows !== 1 ){
                        return res.cc('添加用户失败')
                    }
                    // res.send({status:200,message:'添加成功'})
                    res.cc('添加成功',200)
                })
            }
        
        })
    }
}

exports.login = (req,res) => {
    // res.send('user login')
    let selectSql = 'select * from ev_users where username = ?'
    db.query(selectSql,[ req.body.username ],(err,result) => {
        if(err) return res.cc(err)
        if(result.length !== 1) {
            return res.cc('用户登录失败')
        }
        const compareResult = bcrypt.compareSync(req.body.password,result[0].password)
        if(!compareResult){
            // return res.cc('密码错误')
            return res.status(400).json({
                status:400,
                message:'账户或密码错误'
            })
        }
        const user = { ...result[0],password:'',user_pic:'' }
        // 对用户信息进行加密
        const tokenStr = jwt.sign(user,config.jwtSecret,{expiresIn:config.expiresIn})
        // 调用res.send 将token响应给客户端
        res.send({
            status:200,
            message:'登录成功',
            token:'Bearer ' + tokenStr
        })
    })
}
exports.getUser = (req,res) => {
    // let gongneng = ''
    // let i = 0
    // for (const key in req.body) {
        
    //     if (Object.hasOwnProperty.call(req.body, key)) {
    //         if(i == 0) {
    //             gongneng += `${key} like '%${req.body[key]}%'`
    //             i++
    //         }else{
    //             gongneng += ` and ${key} like '%${req.body[key]}%'`
    //         }
    //     }
    // }
    const gongneng = mapSearch(req,res)
    const limit = req.body.limit || 10
    const offset = req.body.offset || 0
    let selectSql = `SELECT id,username,nickname,email,user_status,phone,create_time,remark FROM ev_users` 
    let selectConut = 'SELECT COUNT(*) from `ev_users`'
    if(gongneng){
        selectSql +=  ` where ${gongneng}`
    }
    selectSql +=  ` LIMIT ${limit} offset ${offset}`
    let conut = 0
    db.query(selectConut,(err,result) => {
        if(err) return res.cc(err)
        conut = result
        db.query(selectSql,(err, result) => {
            if(err) return res.cc(err)
            res.send({status:200,data:{list:result,totalCount:conut[0]['COUNT(*)']}})
        })
    })

   
}