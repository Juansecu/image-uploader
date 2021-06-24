const { extname, join } = require('path');

const express = require('express');
const multer = require('multer');

const imageRouter = require('./routes/image.routes');
const indexRouter = require('./routes/index.routes');

const app = express();

const storage = multer.diskStorage({
    destination: join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

// ------ SERVER CONFIGURATION ------
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// ------ MIDDLEWARES ------
app.use(multer({
    dest: join(__dirname, 'public/uploads'),
    fileFilter: (req, file, callback) => {
        const fileTypes = /gif|jpeg|jpg|png/;
        const extensionName = fileTypes.test(extname(file.originalname));
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extensionName) return callback(null, true);

        callback('Error: Invalid file!');
    },
    limits: {
        fileSize: 1000000
    },
    storage
}).single('image'));

// ------ ROUTES ------
app.use('/', indexRouter);
app.use('/image', imageRouter);

// ------ STATIC FILES ------
app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () => console.log(`Serving at Port ${app.get('port')}!`));