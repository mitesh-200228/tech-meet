require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const router = require('./router');
const CORS = require('cors');
const bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }));
const configurationofCors = {
    origin:["http://localhost:3000/","http://localhost:3000"]
}
app.use(CORS(configurationofCors));
const connection = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}`).then(() => {
            console.log('DB connected!!');
        }).catch(err => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}
connection();
app.use(router);
app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`);
});