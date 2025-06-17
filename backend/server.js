const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

// Determine binary name on Windows vs other platforms
const todoBin = path.join(__dirname, `todo_storage${process.platform === 'win32' ? '.exe' : ''}`);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/todos', (req, res) => {
    exec(`"${todoBin}" get`, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(stdout));
    });
});

app.get('/api/todos/pending', (req, res) => {
    exec(`"${todoBin}" get`, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.json(JSON.parse(stdout));
    });
});

app.post('/api/todos', (req, res) => {
    const { tipo, important, urgent, task, description, deadline, materia, complexidade, plataforma } = req.body;
    let cmd = `"${todoBin}" add "${tipo}" "${important}" "${urgent}"`;
    if (tipo === "tarefa") {
        cmd += ` "${task}" "${description || ''}" "${deadline || ''}"`;
    } else if (tipo === "prova") {
        cmd += ` "${task}" "${deadline || ''}" "${materia || ''}"`;
    } else if (tipo === "projeto") {
        cmd += ` "${task}" "${deadline || ''}" "${materia || ''}" "${complexidade || ''}"`;
    } else if (tipo === "relatorio") {
        cmd += ` "${task}" "${deadline || ''}" "${materia || ''}" "${plataforma || ''}"`;
    }

    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Todo added');
    });
});

app.put('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const { tipo, task, important, urgent, description, deadline, materia, complexidade, plataforma } = req.body;
    let cmd = `"${todoBin}" edit ${todoId} "${tipo}" "${important}" "${urgent}"`;
    if (tipo === "tarefa") {
        cmd += ` "${task.replace(/"/g, '\\"')}" "${(description || '').replace(/"/g, '\\"')}" "${deadline || ''}"`;
    } else if (tipo === "prova") {
        cmd += ` "${task.replace(/"/g, '\\"')}" "${deadline || ''}" "${materia || ''}"`;
    } else if (tipo === "projeto") {
        cmd += ` "${task.replace(/"/g, '\\"')}" "${deadline || ''}" "${materia || ''}" "${complexidade || ''}"`;
    } else if (tipo === "relatorio") {
        cmd += ` "${task.replace(/"/g, '\\"')}" "${deadline || ''}" "${materia || ''}" "${plataforma || ''}"`;
    }

    exec(cmd, { cwd: __dirname }, (error) => {
        if (error) {
            console.error(`Error executing C++ code: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Todo edited');
    });
});

app.delete('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    exec(`"${todoBin}" delete ${todoId}`, { cwd: __dirname }, (error) => {
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