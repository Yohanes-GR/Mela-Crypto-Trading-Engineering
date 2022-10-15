require('dotenv').config();
const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

//local import
const authRouter = require('./src/routes/auth.route');


const pgUserName = process.env.POSTGRES_USER_NAME
const pgPassword = process.env.POSTGRES_PASSWORD
const pgDbName = process.env.POSTGRES_DATABASE_NAME
const pgPort = process.env.POSTGRES_PORT
const secret = process.env.SECRET_CODE
const sequelize = new Sequelize(`postgres://${pgUserName}:${pgPassword}@melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com:${pgPort}/${pgDbName}`);

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
    secret: secret,
    resave: true, 
    saveUninitialized: true
}));

app.use(cookieParser(secret));

app.get('/', (req, res)=> {
    res.send("hello world")
});

app.use('/auth', authRouter);

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

