const express = require('express');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let newFileName = fileName;
        cb(null, newFileName);
    }
})




const app = express();

const port = 3003;
app.listen(port, () => {
    console.log(`Server đang chạy cổng ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})


const fs = require('fs');
const upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myfile'), (req, res) => {
    let file = req.file;
    if (!file) {
        var error = new Error('Can chon file!');
        error.httpStatusCode = 400;
        return next(error);


    }
    let pathImg = file.path;
    console.log(pathImg);
    res.send(file);
})