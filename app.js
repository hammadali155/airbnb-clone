// Load environment variables
require('dotenv').config();
const mongoconnect = require('./utils/database');
const express = require('express')
const path = require('path')

const storeRouter = require('./routes/storeRouter')
const { hostRouter } = require('./routes/hostRouter')

const { rootDir } = require('./utils/path')


const errController = require('./controllers/errController')


const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static(path.join(rootDir, 'public')))
app.use(express.urlencoded({ extended: true })); // Fixed deprecation warning implicitly

app.use(storeRouter)
app.use(hostRouter)


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