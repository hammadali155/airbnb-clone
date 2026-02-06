const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const Home = require('../models/home')

exports.getLogin = (req, res) => {
    res.render('auth/login', { currentPage: 'login',oldInput:{}})
}

exports.getSignUp = (req, res) => {
    res.render('auth/signup', { currentPage: 'signup',oldInput:{}})
}

exports.postLogin =async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        res.locals.err= ['User not found']
        return res.status(422).render('auth/login',{currentPage:'login', oldInput:{email}})
    }
    const isMatch = await bcryptjs.compare(password,user.password)

    if(!isMatch){
        res.locals.err= ['Invalid Password']
        return res.status(422).render('auth/login',{currentPage:'login', oldInput:{email}})
    }
    req.session.user= user;
    req.session.isLoggedIn= true;
    

    const registeredHomes = await Home.find()

    // res.render('store/home',{currentPage:'home',registeredHomes})
    res.redirect('/')
}

exports.postSignUp = [
    check('firstName').not().isEmpty().withMessage('First name is required.').matches(/^[A-Za-z\d]+$/).withMessage('First name must contain only letters .'),

    check('lastName').not().isEmpty().withMessage('Last name is required.').matches(/^[A-Za-z\d]+$/).withMessage('Last name must contain only letters.'),

    check('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),

    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    }),

    async (req, res, next) => {
        const errors = validationResult(req)
        const { firstName, lastName, email, password, userType } = req.body;
        if (!errors.isEmpty()) {
            const err = errors.array().map(error => error.msg)
            res.locals.err = err;
            return res.status(422).render('auth/signup', { currentPage: 'signup', oldInput: { firstName, lastName, email, userType } })
        }

        const hashedPassword = await bcryptjs.hash(password,12)

            User.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(422).render('auth/signup', {
                        currentPage: 'signup',
                        oldInput: { firstName, lastName, email, userType },
                        err: ['User already exists. Please use a different email.']
                    })
                }
                const newUser = new User({ firstName, lastName, email, password:hashedPassword, userType });
                return newUser.save()
            })
            .then(user => {
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }
]

exports.getLogOut = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}