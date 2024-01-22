// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// get user by name

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users['users_list'];

    if (name || job) {
        result = findUsersByCriteria(name, job);
    }

    res.send({ users_list: result });
});

const findUsersByCriteria = (name, job) => {
    return users['users_list'].filter(user => {
        return (!name || user.name === name) && (!job || user.job === job);
    });
};

// get user by id

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// add user (USE BOOMERANG TO MAKE THE POST CALL)
// https://app.boomerangapi.com

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd); // Send back the user with the new ID
});

function addUser(user) {
    user.id = generateRandomId();
    users['users_list'].push(user);
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

// delete a user

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const isDeleted = deleteUserById(id);
    if (isDeleted) {
        res.status(204).send(`User with id ${id} was deleted.`);
    } else {
        res.status(404).send('User not found.');
    }
});

function deleteUserById(id) {
    const initialLength = users['users_list'].length;
    users['users_list'] = users['users_list'].filter(user => user.id !== id);
    return initialLength !== users['users_list'].length;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      