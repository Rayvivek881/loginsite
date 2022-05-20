const express = require("express");
const Router1 = new express.Router();
const UserLogin = require('../../Modals/UserLogin.js');
const tokenobj = require('../Token/jwt.js');

Router1.post('/SignUp', async (req, res) => {
    const {Name, Email, Password} = req.body;
    const result = await UserLogin.findOne({Email: Email}).select({__id: true});
    if (result != null) {
        res.send({isVarified : false});
        return ;
    }
    const newData = new UserLogin({
        Name, Email, Password
    });
    const UserData =  await newData.save();
    console.log("Account Created");
    res.send({isVarified : false, UserData : UserData});
});

Router1.post('/SignIn', async (req, res) => {
    const {Email, Password} = req.body;
    const result = await UserLogin.findOne({ Email });
    if (result == null || Password !== result.Password) {
        res.send({isVarified : false});
    } else {
        const token = await tokenobj.CreateToken(result._id, result.Name, result.Admin);
        let options = {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
        }
        console.log("you have successfully loged in....\n", result);
        res.cookie('user_id', token , options);
        res.send({isVarified: true, UserData: result});
    }
});

Router1.get('/Logout', (req, res) => {
    let options = {
        maxAge: 5,
        httpOnly: true,
    }
    res.cookie('user_id', '' , options);
    res.send({done: true});
});


module.exports = Router1;