const express = require('express');
const bodyParser = require('body-parser'); var app = express()
const Music = require('./models')
const dbConfig = require('./config');
const mongoose = require('mongoose');
var PORT = 3000

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.render("index")
});

app.post("/addsong", (req, res) => {
    var myData = new Music(req.body);
    myData.save()
        .then(item => {
            // res.send("item saved to database");
            res.redirect('/')
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});


app.get('/getSongs', (req, res) => {
    console.log(req.query)
    Music.find(req.query).
        then(music => {
            res.render("table", { music: music })
        }).catch(err => {
            res.json({ "message": err })
        })
})



app.post('/deleteSongs/:id', (req, res) => {
    Music.findByIdAndDelete(req.params.id).
        then(music => {
            // console.log("Deleted Successfully")
            res.redirect('/getSongs')
        }).catch((err) => {
            res.json({ "message": err })
        })
})

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});

