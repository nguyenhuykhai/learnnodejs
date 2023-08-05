import express from 'express';
import configViewEngine from './config/viewEngine.js';
import {} from 'dotenv/config'
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js'

// import connection from './config/connectDB.js'
var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(express.urlencoded({extended: true }));
app.use(express.json());

//SETUP VIEW ENGINE
configViewEngine(app);

//INIT WEB ROUTE
initWebRoute(app);

//INIT API ROUTE
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})