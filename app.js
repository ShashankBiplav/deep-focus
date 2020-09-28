const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const multer = require('multer');

const helmet = require('helmet');

const Sentry = require('@sentry/node');

const Tracing = require("@sentry/tracing");

const compression = require('compression');

require('dotenv').config();

const port = process.env.PORT|| 8800;

const app = express();

Sentry.init({
    dsn: "https://a7077b1bc1ee4c08b9d97db7924ef12e@o453950.ingest.sentry.io/5443254",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

const authRoutes = require('./routes/auth');

const adminRoutes = require('./routes/administrator');

const userRoutes = require('./routes/user');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.json());

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);

app.use('/user', userRoutes);

app.use(helmet());

app.use(compression());

app.use(Sentry.Handlers.errorHandler());

//central error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(()=>{
        console.log('Connection to DB');
        app.listen(port,
             ()=>{
                console.log(`listening on port${port}`);
            }
        );
    }).catch(err=>{
    console.log(err);
});