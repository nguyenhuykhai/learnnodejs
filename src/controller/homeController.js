import pool from "../config/connectDB";
import multer from "multer";

let getHomepage = async (req, res) => {
  //Viết Logic ở đây
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.render("index.ejs", { dataUser: rows, test: "abc string test" });
};

let getDetailPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);

  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check req: ", req.body);
  let { firstName, lastName, email } = req.body;
  await pool.execute(
    "INSERT INTO users (firstName, lastName, email) values (?, ?, ?)",
    [firstName, lastName, email]
  );

  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let id = req.body.id;
  await pool.execute("DELETE FROM users WHERE id = ?", [id]);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);

  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, id } = req.body;
  await pool.execute(
    "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
    [firstName, lastName, email, id]
  );

  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
};

let handleUploadMultipleFiles = async (req, res) => {

  if (req.fileValidationError) {
      return res.send(req.fileValidationError);
  }
  else if (!req.files) {
      return res.send('Please select an image to upload');
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);

}


module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles
};
