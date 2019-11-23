const express = require('express');
const bodyParser = require('body-parser'); //json 포맷으로 읽을 수 있게 도와줌
const mongoose = require('mongoose');
const Todo = require('./models/TODO');
require('dotenv').config({ path:'variables.env' });

const server = express();
server.use(bodyParser.json());

server.get("/api/todos", (req, res) => {
    Todo.findAll().then( (todos) => {
        if(!todos.length){
            return res.status(404).json({ errorMessage: "Todo was not found" });
        }else{
            res.send(`${todos}`);
        }
    }).catch( err => {
        res.status(500).send(err);
    })
});

server.post("/api/todos", (req, res) => {
    Todo.create(req.body)
        .then( todo => res.send(todo))
        .catch( err => res.status(500).send(err));
})

server.put('/api/todos/:_id', (req, res) => {
    Todo.updateByTodoid(req.params._id, req.body)
        .then(todo => res.send( todo ))
        .catch( err => res.status(500).send(err));
})

server.delete('/api/todos/:_id', (req, res) => {
    Todo.deleteByTodoid(req.params._id)
        .then(() => res.sendStatus(200))
        .catch( err => res.status(500).send(err));
})

server.listen(3000, err => {
    if (err) {
        return console.log(err);
    }else{
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
            if(err) {
                console.log(err);
            }else{
                console.log("Connected to database sucessfully");
            }
        });
    }
});