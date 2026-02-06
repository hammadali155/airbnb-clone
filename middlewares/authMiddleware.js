module.exports.authMiddleware = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('auth/login')
    }

    if(req.session.user.userType !=='host'){
        return res.status(403).render('404',{currentPage:'404'})
    }

    next()
}