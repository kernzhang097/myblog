const express = require('express')
const router = express.Router()
const api = require('./api')

// 登陆
router.post('/login', (req, res, next) => {
    api.login(req, res, next)
})

// 注册
router.post('/register', (req, res, next) => {
    api.register(req, res, next)
})

// 添加文章
router.post('/saveArticle', (req, res, next) => {
    api.saveArticle(req, res, next)
})

// 获取文章列表
router.get('/getArticle', (req, res, next) => {
    api.getArticle(req, res, next)
})

// 获取当前文章
router.post('/getCurrArticle', (req, res, next) => {
    api.getCurrArticle(req, res, next)
})

// 删除文章
router.post('/deleteArticle', (req, res, next) => {
    api.deleteArticle(req, res, next)
})

module.exports = router