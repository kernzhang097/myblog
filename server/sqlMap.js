const sqlMap = {
    checkUser: 'SELECT * FROM user WHERE account = ?',
    insertUser: 'INSERT INTO user VALUES (null, ?, ?)',
    insertPost: 'INSERT INTO post VALUES (null, ?, ?, ?, ?, ?)',
    modifyPost: 'UPDATE post SET account = ?, title = ?, content = ?, abstract = ?, create_time = ? WHERE id = ?',
    getPost: 'SELECT * FROM post WHERE account = ?',
    getCurrPost: 'SELECT * FROM post WHERE account = ? and id = ?',
    deletePost: 'DELETE FROM post WHERE id = ?'
}

module.exports = sqlMap;