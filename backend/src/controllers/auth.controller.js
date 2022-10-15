const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function signIn(req, res, next) {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        console.log(user)
        if(err) throw err;
        if(!user) res.send('No user Exists');
        else{
            req.logIn(user, (err) => {
                if(err) throw err;
                res.json({user});
            })
        }
    })(req, res, next)
}

async function signUp(req, res, next) {
    try {
        console.log(req.body)
        const [user, created] = await User.findOrCreate({
            where: { email: req.body.email },
            defaults: {
                email: req.body.email,
                full_name: req.body.firstName + ' ' + req.body.lastName,
                password: await bcrypt.hash(req.body.password, 10),
            }
        });
        if (created) {
            req.login(user, (err) => {
                if (err) return next(err);
                res.json({
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                });
            });
            // res.send("User Created");
        }
        if (!created) return res.json({error: "User already exists"});

    } catch (error) {
        console.error("Failed signing up", error);
    }
}

async function logout(req, res, next) {
    req.logout();
    res.end();
}

module.exports = {
    signIn,
    signUp,
    logout,
}