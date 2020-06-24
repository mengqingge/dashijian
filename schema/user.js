// 导入定义验证规则的包
const joi = require('@hapi/joi')


// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}


// 定义 id, nickname, emial 的验证规则 
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}


// 验证规则对象 - 重置密码
exports.update_password_schema = {
    body: {
        oldPwd: password,

        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

const avatar = joi.string().dataUri().required()

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar,
    }
}