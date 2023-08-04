import express from 'express';
import configViewEngine from './config/viewEngine.js';
import {} from 'dotenv/config'
import initWebRoute from './route/web.js';
import initAPIRoute from './route/api.js'

// import connection from './config/connectDB.js'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true }));
app.use(express.json());

//SETUP VIEW ENGINE
configViewEngine(app);

//INIT WEB ROUTE
initWebRoute(app);

//INIT API ROUTE
initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})