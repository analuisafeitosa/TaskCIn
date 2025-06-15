document.addEventListener('DOMContentLoaded', () => {
    function fetchMatriz(){
        console.log("bbbb")
               fetch('/api/todos')
            .then(res => res.json())
            .then(todos => {
console.log(todos)
            })
    }
    fetchMatriz();
    

    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.getElementById('closeModal');
    const taskForm = document.getElementById('taskForm');
    const modalTitle = document.getElementById('modalTitle');
    const modalTaskTipo = document.getElementById('modalTaskTipo');
    const modalTaskTitle = document.getElementById('modalTaskTitle');
    const modalTaskDesc = document.getElementById('modalTaskDesc');
    const modalTaskDeadline = document.getElementById('modalTaskDeadline');
    const modalTaskUrgency = document.getElementById('modalTaskUrgency');
    const modalProvaDate = document.getElementById('modalProvaDate');
    const modalProvaMateria = document.getElementById('modalProvaMateria');
    const modalProjetoDate = document.getElementById('modalProjetoDate');
    const modalProjetoMateria = document.getElementById('modalProjetoMateria');
    const modalProjetoComplexidade = document.getElementById('modalProjetoComplexidade');
    const modalRelatorioDate = document.getElementById('modalRelatorioDate');
    const modalRelatorioMateria = document.getElementById('modalRelatorioMateria');
    const modalRelatorioPlataforma = document.getElementById('modalRelatorioPlataforma');

    let editIndex = null;

    function showFields(tipo) {
        document.getElementById('tarefaFields').style.display = tipo === 'tarefa' ? '' : 'none';
        document.getElementById('provaFields').style.display = tipo === 'prova' ? '' : 'none';
        document.getElementById('projetoFields').style.display = tipo === 'projeto' ? '' : 'none';
        document.getElementById('relatorioFields').style.display = tipo === 'relatorio' ? '' : 'none';
    }

    modalTaskTipo.onchange = () => showFields(modalTaskTipo.value);

    function openModal(edit = false, todo = {}) {
        taskModal.style.display = 'block';
        modalTitle.textContent = edit ? 'Editar atividade' : 'Adicionar atividade';
        modalTaskTipo.value = todo.tipo || 'tarefa';
        showFields(modalTaskTipo.value);
        modalTaskTitle.value = todo.task || '';
        modalTaskDesc.value = todo.description || '';
        modalTaskDeadline.value = todo.deadline || '';
        modalTaskUrgency.value = todo.urgency || 'low';
        modalProvaDate.value = todo.deadline || '';
        modalProvaMateria.value = todo.materia || '';
        modalProjetoDate.value = todo.deadline || '';
        modalProjetoMateria.value = todo.materia || '';
        modalProjetoComplexidade.value = todo.complexidade || '';
        modalRelatorioDate.value = todo.deadline || '';
        modalRelatorioMateria.value = todo.materia || '';
        modalRelatorioPlataforma.value = todo.plataforma || '';
        editIndex = edit ? todo.idx : null;
    }

    function closeModalFunc() {
        taskModal.style.display = 'none';
        taskForm.reset();
        editIndex = null;
    }

    closeModal.onclick = closeModalFunc;
    window.onclick = (e) => { if (e.target == taskModal) closeModalFunc(); };

    function fetchTodos() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => {
                taskList.innerHTML = '';
                const tipoLabel = {
                    tarefa: "Tarefa",
                    prova: "Prova",
                    projeto: "Projeto",
                    relatorio: "Relatório"
                };
                todos.forEach((todo, idx) => {
                    const li = document.createElement('li');
                    li.className = 'todo-item';

                    let info = `<strong>${todo.task || '(Sem título)'}</strong><br>`;
                    info += `<span style="font-weight:bold;color:#0275d8;">Categoria: ${tipoLabel[todo.tipo] || todo.tipo}</span><br>`;

                    if (todo.tipo === 'tarefa') {
                        info += `<small><b>Descrição:</b> ${todo.description || '-'}</small><br>`;
                        info += `<small><b>Prazo:</b> ${todo.deadline || '-'}</small><br>`;
                    } else if (todo.tipo === 'prova') {
                        info += `<small><b>Data:</b> ${todo.deadline || '-'}</small><br>`;
                        info += `<small><b>Matéria:</b> ${todo.materia || '-'}</small>`;
                    } else if (todo.tipo === 'projeto') {
                        info += `<small><b>Data:</b> ${todo.deadline || '-'}</small><br>`;
                        info += `<small><b>Matéria:</b> ${todo.materia || '-'}</small><br>`;
                        info += `<small><b>Complexidade:</b> ${todo.complexidade || '-'}</small>`;
                    } else if (todo.tipo === 'relatorio') {
                        info += `<small><b>Data:</b> ${todo.deadline || '-'}</small><br>`;
                        info += `<small><b>Matéria:</b> ${todo.materia || '-'}</small><br>`;
                        info += `<small><b>Plataforma:</b> ${todo.plataforma || '-'}</small>`;
                    }

                    const infoDiv = document.createElement('div');
                    infoDiv.style.flex = '1';
                    infoDiv.innerHTML = info;

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Editar';
                    editBtn.onclick = () => openModal(true, { ...todo, idx });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Deletar';
                    deleteBtn.onclick = () => {
                        fetch(`/api/todos/${idx}`, { method: 'DELETE' })
                            .then(fetchTodos);
                    };

                    li.appendChild(infoDiv);
                    li.appendChild(editBtn);
                    li.appendChild(deleteBtn);
                    taskList.appendChild(li);
                });
            });
    }

    addTaskButton.onclick = () => openModal(false);

    taskForm.onsubmit = (e) => {
        e.preventDefault();
        const tipo = modalTaskTipo.value;
        let todo = { tipo };
        if (tipo === 'tarefa') {
            todo.task = modalTaskTitle.value;
            todo.description = modalTaskDesc.value;
            todo.deadline = modalTaskDeadline.value;
            todo.urgency = modalTaskUrgency.value;
        } else if (tipo === 'prova') {
            todo.task = modalTaskTitle.value;
            todo.deadline = modalProvaDate.value;
            todo.materia = modalProvaMateria.value;
        } else if (tipo === 'projeto') {
            todo.task = modalTaskTitle.value;
            todo.deadline = modalProjetoDate.value;
            todo.materia = modalProjetoMateria.value;
            todo.complexidade = modalProjetoComplexidade.value;
        } else if (tipo === 'relatorio') {
            todo.task = modalTaskTitle.value;
            todo.deadline = modalRelatorioDate.value;
            todo.materia = modalRelatorioMateria.value;
            todo.plataforma = modalRelatorioPlataforma.value;
        }
        if (editIndex !== null) {
            fetch(`/api/todos/${editIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            }).then(() => {
                closeModalFunc();
                fetchTodos();
            });
        } else {
            fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            }).then(() => {
                closeModalFunc();
                fetchTodos();
            });
        }
    };

    fetchTodos();
});