const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/todos', (req, res) => {
    exec('todo_storage.exe get', { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(stdout));
    });
});

app.post('/api/todos', (req, res) => {
    const { task, description, deadline, urgency } = req.body;
    exec(
        `todo_storage.exe add "${task.replace(/"/g, '\\"')}" "${(description || '').replace(/"/g, '\\"')}" "${deadline || ''}" "${urgency || 'low'}"`,
        { cwd: __dirname },
        (error) => {
            if (error) {
                console.error(`Error executing C++ code: ${error}`);
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).send('Todo added');
        }
    );
});

app.put('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const { task, description, deadline, urgency } = req.body;
    exec(
        `todo_storage.exe edit ${todoId} "${task.replace(/"/g, '\\"')}" "${(description || '').replace(/"/g, '\\"')}" "${deadline || ''}" "${urgency || 'low'}"`,
        { cwd: __dirname },
        (error) => {
            if (error) {
                console.error(`Error executing C++ code: ${error}`);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).send('Todo edited');
        }
    );
});

app.delete('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    exec(`todo_storage.exe delete ${todoId}`, { cwd: __dirname }, (error) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});