const express = require('express');

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../uploads' });
const UPLOAD_URL = process.env.UPLOAD_URL || 'http://localhost:3000/museum/uploads/';

router.post("/", upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = UPLOAD_URL+file.filename;
    res.send(file.url);
})

module.exports = router