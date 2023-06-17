const express = require(`express`);
const app = express();
const admin = express();

app.get(`/`, (req, res) => {
    res.send(`I'm from app. I'm get request`);
});

admin.get(`/`, (req, res) => {
    res.send(`I'm from admin, I'm get request`);
});

app.use(`/admin`, admin);

app.listen(5000, () => {
    console.log(`server running at 5000`);
});
