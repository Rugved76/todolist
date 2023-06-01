const express = require('express');
const bodyParser = require('body-parser'); var app = express()
const Todo = require('./src/models')
const dbConfig = require('./src/config');
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

app.post("/addTask", (req, res) => {
    var data = new Todo(req.body);
    data.save()
        .then(item => {
            // res.send("item saved to database");
            res.redirect('/')
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});


app.get('/list', (req, res) => {
    console.log(req.query)
    Todo.find(req.query).
        then(taskitem => {
            res.render("table", { taskitem: taskitem })
        }).catch(err => {
            res.json({ "message": err })
     })
})



app.post('/deleteSongs/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id).
        then(taskitem   => {
            // console.log("Deleted Successfully")
            res.redirect('/list')
        }).catch((err) => {
            res.json({ "message": err })
        })
})

app.listen(PORT, () => {
    console.log(`Server is listening at port : ${PORT}`);
});

