const express = require('express');
const app = express();
const cors = require('cors');
const Filter = require('bad-words');
// const rateLimit = require('express-rate-limit');
const monk = require('monk');
const db = monk('localhost/meower');
const mews = db.get('mews');
app.use(cors());
const filter = new Filter();
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Meower'
    });
});

function isValidMew(mew) {
    return mew.name && mew.name.toString().trim() !== '' &&
        mew.content && mew.content.toString().trim() !== '';
}


app.post('/mews', (req, res) => {
    console.log(req.body);
    if (isValidMew(req.body)) {
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }
        mews.insert(mew).then(createdMew => {
            res.json(createdMew);
        });
        console.log(mew);

    } else {
        res.status(422);
        res.json({
            message: 'Hey! Name and Content required!'
        });
    }
});

app.get('/mews', (req, res) => {
    mews.find().then(mews => {
        res.json(mews);
    });
});

// app.use(rateLimit({
//     windowMs: 30 * 1000,
//     max: 1
// }));

app.listen(5000, () => {
    console.log("Listening on Port : 5000");
});