const mysql = require('mysql')
const dbConfig = require('./db')
const sqlMap = require('./sqlMap')
const jwt = require('jsonwebtoken')

const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true
})

module.exports = {
    // 登陆
    login(req, res, next) {
        const postData = req.body
        pool.getConnection((err, connection) => {
            const sql = sqlMap.checkUser
            let secretOrPrivateKey = 'kern'
            let content = {name: postData.account}
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: '10m',
            })
            connection.query(sql, [postData.account], (err, result) => {
                if(result.length == 0){
                    res.json({
                        status: false,
                        message: '账号不存在'
                    })
                } else if(postData.password != result[0].password){
                    res.json({
                        status: false,
                        message: '密码错误'
                    })
                } else {
                    res.json({
                        status: true,
                        message: '登陆成功',
                        data: result[0].account,
                        token: token
                    })
                }
                connection.release()
            }) 
        })
    },
    // 注册
    register(req, res, next) {
        const postData = req.body
        pool.getConnection((err, connection) => {
            const sql = sqlMap.checkUser
            connection.query(sql, [postData.account], (err, result) => {
                if(result.length > 0){
                    res.json({
                        status: false,
                        message: '账号已存在'
                    })
                    connection.release()
                } else{
                    connection.query(sqlMap.insertUser, [postData.account, postData.password], (err, result) => {
                        if(err){
                            res.json({
                                status: false,
                                message: '服务器连接失败，请稍后重试！'
                            })
                        }else{
                            res.json({
                                status: true,
                                message: '注册成功'
                            })
                        }
                        connection.release()
                    })
                }
            })
        })
    },
    // 添加文章
    saveArticle(req, res, next){
        const postData = req.body
        pool.getConnection((err, connection) => {
            const sql = postData.id ? sqlMap.modifyPost : sqlMap.insertPost
            let date = new Date()
            let myyear = date.getFullYear()
            let mymonth = date.getMonth()+1
            let myweekday = date.getDate()
            let currentDate = myyear + '-' + mymonth + '-' + myweekday
            connection.query(sql, [postData.account,postData.title,postData.content,postData.abstract,currentDate,postData.id], (err, result) => {
                if(err){
                    console.log(err)
                    res.json({
                        status: false,
                        message: '保存失败'
                    })
                } else {
                    res.json({
                        status: true,
                        message: '保存成功'
                    })
                }
                connection.release()
            })
        })
    },
    // 获取文章列表
    getArticle(req, res, next){
        const account = req.query.account
        pool.getConnection((err, connection) => {
            const sql = sqlMap.getPost
            connection.query(sql, [account], (err, result) => {
                if(err){
                    res.json({
                        status: false,
                        message: '获取失败'
                    })
                } else {
                    res.json({
                        status: true,
                        data: result
                    })
                }
                connection.release()
            })
        })
    },
    // 获取当前文章
    getCurrArticle(req, res, next){
        const postData = req.body
        pool.getConnection((err, connection) => {
            const sql = sqlMap.getCurrPost
            connection.query(sql, [postData.account, postData.id], (err, result) => {
                if(err){
                    console.log(err)
                    res.json({
                        status: false,
                        message: '获取失败'
                    })
                } else {
                    res.json({
                        status: true,
                        data: result
                    })
                }
                connection.release()
            })
        })
    },
    // 删除文章
    deleteArticle(req, res, next){
        const postData = req.body
        pool.getConnection((err, connection) => {
            const sql = sqlMap.deletePost
            connection.query(sql, [postData.id], (err, result) => {
                if(err){
                    res.json({
                        status: false,
                        message: '删除失败'
                    })
                } else {
                    res.json({
                        status: true,
                        message: '删除成功'
                    })
                }
                connection.release()
            })
        })
    }
}