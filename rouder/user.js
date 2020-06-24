const exprsee = require('express')
const router = exprsee.Router()

//导入用户路由模块
const userHandler = require('../router_handler/user')


// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')


//注册
router.post('/reguser',expressJoi(reg_login_schema), userHandler.regUser)

//登录
router.post('/login',expressJoi(reg_login_schema) ,userHandler.login)


module.exports = router