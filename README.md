# file-upload-multer

## html file

### add to form enctype="multipart/form-data"

```bash
<form action="http://localhost:5000" method="post" enctype="multipart/form-data" >
    <input type="file" name="avatar" />
    <input type="submit" value="Upload" />
</form>
```

<br>

## Express Javascript file

### Require Packages

```bash
const express = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const app = express();
```

### Run the Server

```bash
app.listen(5000, () => {
    console.log(`app listening at port 5000`);
});
```

### file destination

```bash
const UPLOAD_FOLDER = `./uploads/`;
```

### Defining the storage

```bash
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
```

### Final multer upload object

```bash
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
```

### Error handler for multer

```bash
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
```

### pass multer as middleware

```bash
app.post(`/`, upload.single(`avatar`), (req, res) => {
    res.json({ message: `image upload successful` });
});
```
