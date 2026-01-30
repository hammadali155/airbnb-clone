exports.getLogin = (req, res) => {
    res.render('auth/login', { currentPage: 'login' })
}

exports.getSignUp = (req, res) => {
    res.render('auth/signup', { currentPage: 'signup' })
}

exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true;
    req.session.save();
    res.redirect('/')
}

exports.postSignUp = (req, res) => {

}

exports.getLogOut = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}