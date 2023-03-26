const express = require("express");
const app = express();
const joi = require('joi')
const config = require('./config')
const expressJWT = require('express-jwt')
const requireDir = require('require-dir');
// 一定得在res.use之前
app.use((req,res,next) => {
    res.cc = function (msg,status = 401) {
        res.send({
            status,
            message: msg instanceof Error ? msg.message : msg
        }) 
    }
    next()
})




// 配置验证token的全局配置中间件 / /api/login/ /api/re
app.use(expressJWT({secret:config.jwtSecret}).unless({path:['/api/login','/api/reguser']}))

app.use(express.urlencoded({ limit:'1mb',extended: true }));

// 导入路由模块
const userInfo = require('./router/userInfo')
app.use('/my',userInfo)

const router = require('./router/index')
app.use('/api',[router.luggage,router.system,router.menu,router.user])

// const user = require('./router/user')
// app.use('/api',user)
// const menu = require('./router/menu')
// app.use('/api',menu)
// const system = require('./router/system')
// app.use('/api',system)


// const routes = requireDir('./router');
// Object.values(routes).forEach((router_item) => {
//     app.use(router_item);
//   });
// console.log(routes,'-5-');
// app.use(express.json({ limit: '2mb' }));
// app.use(express.urlencoded({ limit: '2mb', extended: true }));
// app.use(express.text({ limit: '2mb' }));
const db = require('./db')
// db.query

app.use((err,req,res,next) => {
    // 验证失败导致的错误
    if(err instanceof joi.ValidationError){
       return res.cc(err)
    }else if(err.name === 'UnauthorizedError') {
        return res.cc('身份验证失败')
    }
    res.cc(err)
})

app.listen(8080, () => {
  console.log("http://127.0.0.1:8080");
});
