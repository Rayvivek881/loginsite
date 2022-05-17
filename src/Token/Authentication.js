const tokenobj = require('../Token/jwt.js');

const Authentication = async (req, res, next) => {
    const { user_id } = req.cookies;
    if (user_id == undefined) {
        res.send({isVarified: false, UserData : {}});
    } else {
        const cookieobj = await tokenobj.VarifyToken(user_id);
        if (!cookieobj.isVarified) {
            res.send({isVarified: false})
        } else {
            req.user = {
                _id: cookieobj._id,
                Name: cookieobj.Name
            }
            console.log('Authentication............\n', req.user);
            next();
        }
    }
}

module.exports = Authentication;