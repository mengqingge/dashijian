const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    let sql = `select id, username, nickname, email, user_pic from my_db_01.ev_users where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    let sql = `update my_db_01.ev_users set ? where id=?`

    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败 
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1 
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        // 修改用户信息成功 
        return res.cc('修改用户基本信息成功！', 0)
    })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    let sql = `SELECT * FROM my_db_01.ev_users where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')

        const compareReslt = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareReslt) return res.cc('原密码错误')

        const sql = 'update my_db_01.ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')

            res.cc('更新密码成功', 0)
        })
    })
}


// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = `update my_db_01.ev_users set user_pic=? where id=?`

    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        console.log(results.affectedRows);
        
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败')

        res.cc('更新头像成功', 0)
    })
}



