import pool from "../config/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email } = req.body;

    if(!firstName || !lastName || !email) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('INSERT INTO users (firstName, lastName, email) values (?, ?, ?)',
    [firstName, lastName, email]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, id } = req.body;

    if(!firstName || !lastName || !email || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
    [firstName, lastName, email, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let id = req.params.id;
    if(!id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}