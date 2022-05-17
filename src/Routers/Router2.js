const express = require("express");
const Router2 = new express.Router();
const UserLogin = require('../../Modals/UserLogin.js');
const Authentication = require('../Token/Authentication.js')

Router2.get('/Home', Authentication, (req, res) => {
    res.send({UserData : req.user});
});

module.exports = Router2;