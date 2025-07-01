document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const pendingTextElement = document.getElementById('contadorPendente');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.getElementById('closeModal');
    const taskForm = document.getElementById('taskForm');
    const modalTitle = document.getElementById('modalTitle');
    const modalTaskTipo = document.getElementById('modalTaskTipo');
    const modalTaskTitle = document.getElementById('modalTaskTitle');
    const modalTaskDesc = document.getElementById('modalTaskDesc');
    const modalTaskDeadline = document.getElementById('modalTaskDeadline');
    const modalTaskImportant = document.getElementById('modalTaskImportant');
    const modalTaskUrgent = document.getElementById('modalTaskUrgent');
    const modalProvaDate = document.getElementById('modalProvaDate');
    const modalProvaMateria = document.getElementById('modalProvaMateria');
    const modalProjetoDate = document.getElementById('modalProjetoDate');
    const modalProjetoMateria = document.getElementById('modalProjetoMateria');
    const modalProjetoComplexidade = document.getElementById('modalProjetoComplexidade');
    const modalRelatorioDate = document.getElementById('modalRelatorioDate');
    const modalRelatorioMateria = document.getElementById('modalRelatorioMateria');
    const modalRelatorioPlataforma = document.getElementById('modalRelatorioPlataforma');

    let editIndex = null;

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function showFields(tipo) {
        document.getElementById('tarefaFields').style.display = tipo === 'tarefa' ? 'block' : 'none';
        document.getElementById('provaFields').style.display = tipo === 'prova' ? 'block' : 'none';
        document.getElementById('projetoFields').style.display = tipo === 'projeto' ? 'block' : 'none';
        document.getElementById('relatorioFields').style.display = tipo === 'relatorio' ? 'block' : 'none';
    }

    function openModal(edit = false, todo = {}) {
        taskModal.style.display = 'block';
        modalTitle.textContent = edit ? 'Editar atividade' : 'Adicionar atividade';
        modalTaskImportant.checked = todo.important;
        modalTaskUrgent.checked = todo.urgent;
        modalTaskTipo.value = todo.tipo || 'tarefa';
        showFields(modalTaskTipo.value);
        modalTaskTitle.value = todo.task || '';
        modalTaskDesc.value = todo.description || '';
        modalTaskDeadline.value = todo.deadline || '';
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

    if (modalTaskTipo) {
        modalTaskTipo.onchange = () => showFields(modalTaskTipo.value);
    }

    if (closeModal) {
        closeModal.onclick = closeModalFunc;
    }
    window.onclick = (e) => { if (e.target == taskModal) closeModalFunc(); };

    function fetchTodos() {
        fetch(`http://localhost:3000/api/todos`)
            .then(res => res.json())
            .then(todos => {
                taskList.innerHTML = '';
                let pendingCount = 0;

                const tipoLabel = {
                    tarefa: "Tarefa",
                    prova: "Prova",
                    projeto: "Projeto",
                    relatorio: "Relatório"
                };

                todos.forEach((todo, idx) => {
                    if (!todo.completed) pendingCount++;

                    const li = document.createElement('li');
                    li.className = 'todo-item';

                    let info = `<strong>${todo.task || '(Sem título)'}</strong>`;
                    info += `<div><span class="tag">${tipoLabel[todo.tipo] || todo.tipo}</span>`;
                    if (todo.important) info += `<span class="tag tag-important">Importante</span>`;
                    if (todo.urgent) info += `<span class="tag tag-urgent">Urgente</span>`;
                    info += `</div>`;

                    if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                    if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                    if (todo.description) info += `<p><small>${todo.description}</small></p>`;
                    if (todo.complexidade) info += `<p><small>Complexidade: ${todo.complexidade}</small></p>`;
                    if (todo.plataforma) info += `<p><small>Plataforma: ${todo.plataforma}</small></p>`;

                    const infoDiv = document.createElement('div');
                    infoDiv.style.flex = '1';
                    infoDiv.innerHTML = info;

                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'actions';

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Editar';
                    editBtn.className = 'edit-btn';
                    editBtn.onclick = () => openModal(true, { ...todo, idx });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Deletar';
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.onclick = () => {
                        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                            fetch(`http://localhost:3000/api/todos/${idx}`, { method: 'DELETE' })
                                .then(response => {
                                    if (response.ok) {
                                        fetchTodos();
                                    }
                                });
                        }
                    };

                    actionsDiv.appendChild(editBtn);
                    actionsDiv.appendChild(deleteBtn);

                    li.appendChild(infoDiv);
                    li.appendChild(actionsDiv);
                    taskList.appendChild(li);
                });

                pendingTextElement.textContent = pendingCount;
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
            });
    }

    if (addTaskButton) {
        addTaskButton.onclick = () => openModal(false);
    }

    if (taskForm) {
        taskForm.onsubmit = (e) => {
            e.preventDefault();

            const tipo = modalTaskTipo.value;
            const important = modalTaskImportant.checked;
            const urgent = modalTaskUrgent.checked;
            let todo = { tipo, important, urgent };

            if (tipo === 'tarefa') {
                todo.task = modalTaskTitle.value;
                todo.description = modalTaskDesc.value;
                todo.deadline = modalTaskDeadline.value;
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

            const apiCall = editIndex !== null
                ? fetch(`http://localhost:3000/api/todos/${editIndex}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                  })
                : fetch(`http://localhost:3000/api/todos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                  });

            apiCall.then(response => {
                if (response.ok) {
                    closeModalFunc();
                    fetchTodos();
                }
            }).catch(error => {
                console.error('Erro ao salvar tarefa:', error);
            });
        };
    }

    fetchTodos();
});
