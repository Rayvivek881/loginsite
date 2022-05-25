const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 6900;
const { MONGOURI } = require('./keys.js')
const Router1 = require('./Routers/Router1.js')
const Router2 = require('./Routers/Router2.js')

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {console.log('Connection successful..........');})
    .catch((err) => console.log(err));

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/user', Router1);
app.use('/home', Router2);

app.listen(port, () => console.log(`we are working port ${port}`));