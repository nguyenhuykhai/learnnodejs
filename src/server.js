import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import {} from 'dotenv/config'

const app = express();
const port = process.env.PORT || 8080;

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('test/index.ejs')
})
app.get('/about', (req, res) => {
    res.send(`I'm Khải`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})