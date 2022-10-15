async function signIn(req, res, next) {
    console.log(req.body);
}

async function signUp(req, res, next) {
    console.log(req.body);
}

module.exports = {
    signIn, 
    signUp
}