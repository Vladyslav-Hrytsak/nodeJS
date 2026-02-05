const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const users = [
    {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
    {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];

// показати всіх юзерів

app.get('/users', (req, res) => {
    try {
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


// показати юзера по ID

app.get('/users/:userId', (req, res) => {
    try {
        const id = Number(req.params.userId);
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


// створити юзера

app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const newUser = {id, name, email, password};
        users.push(newUser);

        res.status(201).json(newUser);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


// видалити юзера

app.delete('/users/:userId', (req, res) => {
    try {
        const id = Number(req.params.userId);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        users.splice(userIndex, 1);
        res.status(200).send('User deleted successfully.');
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// змінити юзера

app.put('/users/:userId', (req, res) => {
    try {
        const id = Number(req.params.userId);
        const {name, email, password} = req.body;
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        users[userIndex] = { id, name, email, password };

        res.status(200).json(users[userIndex]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})