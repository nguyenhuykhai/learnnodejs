import pool from "../config/connectDB";

let getHomepage = async (req, res) => {
  //Viết Logic ở đây
  const [rows, fields] = await pool.execute('SELECT * FROM users');

  return res.render('index.ejs', { dataUser: rows, test: 'abc string test' });
};

let getDetailPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  
  return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
  console.log('check req: ',req.body);
  let { firstName, lastName, email } = req.body;
  await pool.execute('INSERT INTO users (firstName, lastName, email) values (?, ?, ?)',
  [firstName, lastName, email]);

  return res.redirect('/')
}

let deleteUser = async (req, res) => {
  let id = req.body.id;
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return res.redirect('/')
}

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  
  return res.render('update.ejs', { dataUser: user[0]});
}

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, id } = req.body;
  await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
  [firstName, lastName, email, id]);

  return res.redirect('/')
}

module.exports = {
  getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}; 
