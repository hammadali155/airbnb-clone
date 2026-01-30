// Load environment variables
require('dotenv').config();
const express = require('express')
const path = require('path')
const session = require('express-session')
const { MongoStore } = require('connect-mongo')

const storeRouter = require('./routes/storeRouter')
const { hostRouter } = require('./routes/hostRouter')
const authRouter = require('./routes/authRouter')

const { rootDir } = require('./utils/path')
const mongoconnect = require('./utils/database');
const errController = require('./controllers/errController')




const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded({ extended: true })); // Fixed deprecation warning implicitly

const store = MongoStore.create({
    mongoUrl: process.env.Mongo_URI,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // Optional: sessions expire in 14 days
    autoRemove: 'native'    // Let MongoDB handle cleanup
})
const sessionConfig = {
    secret: 'my airbnb clone',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,      // Helps prevent CSRF attacks
    }
};

app.use(session(sessionConfig))
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next()
})
app.use(authRouter)



app.use(storeRouter)
app.use((req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/')
    } else {
        next()
    }
}, hostRouter)


// 404 Page Not Found Middleware
app.use(errController.getError)

const PORT = process.env.PORT || 3000;




// Connect to MongoDB in background
mongoconnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.error("⚠️  MongoDB connection failed:", err.message);
    });