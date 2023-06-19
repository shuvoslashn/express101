const express = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const app = express();

// file upload folder
const UPLOAD_FOLDER = `./uploads/`;

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, UPLOAD_FOLDER);
    },
    filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        const filename =
            file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('.') +
            '-' +
            Date.now();
        callback(null, filename + fileExt);
    },
});

// prepare the final multer upload object
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1048576, //byte (1MB)
    },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === `image/png` ||
            file.mimetype === `image/jpg` ||
            file.mimetype === `image/jpeg`
        ) {
            callback(null, true);
        } else {
            callback(new Error(`Only .jpg, .png or .jpeg format allowed!`));
        }
    },
});

// application route
app.post(`/`, upload.single(`avatar`), (req, res) => {
    res.json({ message: `image upload successful` });
});

// Default error handler for multer
app.use((err, req, res, next) => {
    if (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                res.status(500).json({
                    message: `File upload error!`,
                    err: `${err.message}`,
                });
            } else {
                res.status(500).json({ message: `${err.message}` });
            }
        }
    } else {
        res.json({ message: `successful` });
    }
});

app.listen(5000, () => {
    console.log(`app listening at port 5000`);
});
