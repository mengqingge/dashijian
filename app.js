const express = require('express')
const app = express()

const joi = require('@hapi/joi')

const cors = require('cors')
app.use(cors())


// 解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))


// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析 Token 的中间件
const config = require('./config/index')
const expressJwt = require('express-jwt')

app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))


//导入并注册用户路由模块e
const userRouter = require('./rouder/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./rouder/userinfo')
app.use('/my', userinfoRouter)
// 导入并使用文章分类路由模块 
const artCateRouter = require('./rouder/artcate')
app.use('/my/article', artCateRouter)



// 
app.use((err, req, res, nest) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})


app.listen(3007, () => {
    console.log('http://127.0.0.1:3007');
})


