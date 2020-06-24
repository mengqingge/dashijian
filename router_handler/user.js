// 导入数据库操作模块
const db = require('../db/index')

const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
const { jwtSecretKey, expiresIn } = require('../config/index')

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    // const userinfo= req.body
    let { username, password } = req.body
    const sqlStr = 'select * from my_db_01.ev_users where username= ?'
    db.query(sqlStr, username, (err, results) => {
        // console.log(results)

        if (err) {
            return res.cc(err)
        }

        if (results.length > 0) {
            return res.cc('用户名被占用，请更改')
        }

        // 调用 bcrypt.hashSync() 对密码进行加密
        password = bcrypt.hashSync(password, 10)


        //插入表,,注册
        const sql = 'insert into my_db_01.ev_users set ?'
        db.query(sql, { username, password }, (err, results) => {
            if (err) {
                return res.cc(err)
            }

            if (results.affectedRows !== 1) {
                return res.cc('用户注册失败')
            }

            return res.cc('注册成功', 0)
        })
    })
}


//登录
exports.login = (req, res) => {
    let { username, password } = req.body
    const sql = 'select * From my_db_01.ev_users where username=?'
    db.query(sql, username, (err, results) => {
        console.log(results.length);

        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败')

        // 判断密码
        const compareResult = bcrypt.compareSync(password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败2')
        }

        // res.cc('登录成功')
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn })
        res.send({
            status: 0,
            message: '登录成功',
            token: `Bearer ${tokenStr}`
        })
    })
}