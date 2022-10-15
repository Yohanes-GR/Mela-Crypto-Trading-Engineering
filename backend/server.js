require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

//local import
const sequelize = require('./src/configs/db.config');
const User = require('./src/models/user.model');
const SECRET = process.env.SECRET_CODE;


(async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error('Uable to connect to the database', error);
    }
})();


// sequelize.close()
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: SECRET,
    resave: true, 
    saveUninitialized: true
}));

app.use(cookieParser(SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./src/configs/passportConfig')(passport);


app.get('/', (req, res)=> {
    res.send("hello world")
});

app.post("/signin", (req, res, next) => {
    console.log(req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/signup", async(req, res) => {
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
});

app.post('/logout', logout);
async function logout(req, res, next) {
    req.logout();
    res.end();
}

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

const PORT = process.env.PORT || 5000
//Start the server
app.listen(PORT, () => {
    console.log("server is running");
})

