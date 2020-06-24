// 这是文章分类的路由模块

const express = require('express')
const router = express.Router()


router.get('/cates', (req, res) => {

    res.send('ok')
})
// router.get('/cates', artCate_handler.getArtCates)






module.exports = router
