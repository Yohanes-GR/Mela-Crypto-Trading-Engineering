const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user)
                    } else {
                        return done(null, false);
                    }
                });
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser(async(id, cb) => {
        try {
            const user = await User.findOne({where: {id: id}});
            const userInformation = {
                email: user.email
            }
            cb(null, userInformation);
        } catch (error) {
            console.log("error deserializing", error);
            cb(error, null);
        }
    });
}