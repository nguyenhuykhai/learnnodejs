import connection from "../config/connectDB";

let getHomepage = (req, res) => {
  //Viết Logic ở đây
  let data = [];
  connection.query("SELECT * FROM `users` ", function (err, results, fields) {
    console.log(">>> check mysql");
    console.log(results); // results contains rows returned by server
    results.map((row) => {
      data.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
      });
    });
    console.log('Check DATA: ', data);
    return res.render('test/index.ejs', { dataUser: JSON.stringify(data) });
  });
};

module.exports = {
  getHomepage
};
