const express = require('express');
const fsPromis = require('node:fs/promises');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




// показати всіх юзерів

app.get('/users', async (req, res) => {
    try {
        const users = JSON.parse(await fsPromis.readFile('./users.json', 'utf8'));
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// показати юзера по ID

app.get('/users/:userId', async (req, res) => {
    try {
        const users = JSON.parse(await fsPromis.readFile('./users.json', 'utf8'));
        const id = Number(req.params.userId);
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// створити юзера

app.post('/users', async (req, res) => {
    try {
        const users = JSON.parse(await fsPromis.readFile('./users.json', 'utf8'));
        const { name, age, email, password } = req.body;
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        if (!name || name.length <= 3) {
            return res.status(400).send('Name must be more than 3 characters long');
        }
        if (age < 0) {
            return res.status(400).send('Age must be zero or greater');
        }

        const newUser = { id, name, age, email, password };
        users.push(newUser);
        await fsPromis.writeFile('./users.json', JSON.stringify(users));

        res.status(201).json(newUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// видалити юзера

app.delete('/users/:userId', async (req, res) => {
    try {
        const users = JSON.parse(await fsPromis.readFile('./users.json', 'utf8'));
        const id = Number(req.params.userId);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        users.splice(userIndex, 1);
        await fsPromis.writeFile('./users.json', JSON.stringify(users));
        res.status(200).send('User deleted successfully.');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// змінити юзера

app.put('/users/:userId', async (req, res) => {
    try {
        const users = JSON.parse(await fsPromis.readFile('./users.json', 'utf8'));
        const id = Number(req.params.userId);
        const { name, age, email, password } = req.body;
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        if (!name || name.length <= 3) {
            return res.status(400).send('Name must be more than 3 characters long');
        }
        if (age < 0) {
            return res.status(400).send('Age must be zero or greater');
        }

        users[userIndex] = { id, name, age, email, password };
        await fsPromis.writeFile('./users.json', JSON.stringify(users));

        res.status(200).json(users[userIndex]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
