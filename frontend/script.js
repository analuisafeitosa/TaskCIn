document.addEventListener('DOMContentLoaded', () => {
    // Função para atualizar contador da home
    function updateHomeCounter() {
        const counterElement = document.getElementById('contadorPendente');
        if (counterElement) {
            fetch('/api/todos')
                .then(res => res.json())
                .then(todos => {
                    const pendingCount = todos.filter(todo => !todo.completed).length;
                    counterElement.textContent = pendingCount;
                })
                .catch(err => console.error('Erro ao atualizar contador:', err));
        }
    }

    // Função para formatar datas
    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR');
    }

    function fetchMatriz(){
        const faca = document.getElementById('faca');
        const delegue = document.getElementById('delegue');
        const programe = document.getElementById('programe');
        const exclua = document.getElementById('exclua');
        
        if (!faca) return; // Se não estamos na página da matriz, não fazer nada
        
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => {
                // Limpar os quadrantes antes de adicionar novas tarefas
                faca.innerHTML = '<div class="quadrant-title"><p>FAÇA</p></div>';
                delegue.innerHTML = '<div class="quadrant-title"><p>DELEGUE</p></div>';
                programe.innerHTML = '<div class="quadrant-title"><p>PROGRAME</p></div>';
                exclua.innerHTML = '<div class="quadrant-title"><p>EXCLUA</p></div>';

                // Filtra a lista, mantendo apenas as tarefas onde 'completed' é false.
                const tarefasPendentes = todos.filter(todo => !todo.completed);

                const tipoLabel = {
                    tarefa: "Tarefa",
                    prova: "Prova",
                    projeto: "Projeto",
                    relatorio: "Relatório"
                };

                // AGORA, O LOOP USA A NOVA LISTA FILTRADA 'tarefasPendentes'
                tarefasPendentes.forEach(todo => { 
                    const card = document.createElement('div');
                    card.className = 'matrix-task-card';

                    let info = `<strong>${todo.task || '(Sem título)'}</strong>`;
                    info += `<span class="tag">${tipoLabel[todo.tipo] || todo.tipo}</span>`;
                    
                    if (todo.tipo === 'tarefa') {
                        if (todo.description) info += `<p><small>${todo.description}</small></p>`;
                        if (todo.deadline) info += `<p><small>Prazo: ${formatDate(todo.deadline)}</small></p>`;
                    } else if (todo.tipo === 'prova') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                    } else if (todo.tipo === 'projeto') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                        if (todo.complexidade) info += `<p><small>Complexidade: ${todo.complexidade}</small></p>`;
                    } else if (todo.tipo === 'relatorio') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                        if (todo.plataforma) info += `<p><small>Plataforma: ${todo.plataforma}</small></p>`;
                    }

                    card.innerHTML = info;

                    // Reorganizado de acordo com a nova disposição da matriz
                    if (todo.important && todo.urgent)
                        faca.appendChild(card);
                    else if (todo.important && !todo.urgent)
                        programe.appendChild(card);
                    else if (!todo.important && todo.urgent)
                        delegue.appendChild(card);
                    else
                        exclua.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar tarefas:', error);
            });
    }
    
    // Elementos da interface
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

    function showFields(tipo) {
        const tarefaFields = document.getElementById('tarefaFields');
        const provaFields = document.getElementById('provaFields');
        const projetoFields = document.getElementById('projetoFields');
        const relatorioFields = document.getElementById('relatorioFields');
        
        if (tarefaFields) tarefaFields.style.display = tipo === 'tarefa' ? 'block' : 'none';
        if (provaFields) provaFields.style.display = tipo === 'prova' ? 'block' : 'none';
        if (projetoFields) projetoFields.style.display = tipo === 'projeto' ? 'block' : 'none';
        if (relatorioFields) relatorioFields.style.display = tipo === 'relatorio' ? 'block' : 'none';
    }

    if (modalTaskTipo) {
        modalTaskTipo.onchange = () => showFields(modalTaskTipo.value);
    }

    function openModal(edit = false, todo = {}) {
        if (!taskModal) return;
        
        taskModal.style.display = 'block';
        if (modalTitle) modalTitle.textContent = edit ? 'Editar atividade' : 'Adicionar atividade';
        if (modalTaskImportant) modalTaskImportant.checked = todo.important || false;
        if (modalTaskUrgent) modalTaskUrgent.checked = todo.urgent || false;
        if (modalTaskTipo) modalTaskTipo.value = todo.tipo || 'tarefa';
        showFields(modalTaskTipo ? modalTaskTipo.value : 'tarefa');
        if (modalTaskTitle) modalTaskTitle.value = todo.task || '';
        if (modalTaskDesc) modalTaskDesc.value = todo.description || '';
        if (modalTaskDeadline) modalTaskDeadline.value = todo.deadline || '';
        if (modalProvaDate) modalProvaDate.value = todo.deadline || '';
        if (modalProvaMateria) modalProvaMateria.value = todo.materia || '';
        if (modalProjetoDate) modalProjetoDate.value = todo.deadline || '';
        if (modalProjetoMateria) modalProjetoMateria.value = todo.materia || '';
        if (modalProjetoComplexidade) modalProjetoComplexidade.value = todo.complexidade || '';
        if (modalRelatorioDate) modalRelatorioDate.value = todo.deadline || '';
        if (modalRelatorioMateria) modalRelatorioMateria.value = todo.materia || '';
        if (modalRelatorioPlataforma) modalRelatorioPlataforma.value = todo.plataforma || '';
        editIndex = edit ? todo.idx : null;
        
        // Focar no primeiro campo após abrir o modal
        if (modalTaskTitle) {
            setTimeout(() => modalTaskTitle.focus(), 100);
        }
    }

    function closeModalFunc() {
        if (taskModal) taskModal.style.display = 'none';
        if (taskForm) taskForm.reset();
        editIndex = null;
    }

    if (closeModal) {
        closeModal.onclick = closeModalFunc;
    }
    
    if (typeof window !== 'undefined') {
        window.onclick = (e) => { 
            if (e.target == taskModal) closeModalFunc(); 
        };
    }

    function fetchTodos() {
        if (!taskList) return; // Se não estamos na página de tarefas, não fazer nada
        
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => {
                console.log("Tarefas carregadas:", todos); // Debug
                taskList.innerHTML = '';
                const tipoLabel = {
                    tarefa: "Tarefa",
                    prova: "Prova",
                    projeto: "Projeto",
                    relatorio: "Relatório"
                };
                todos.forEach((todo, idx) => {
                    const li = document.createElement('li');
                    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
                    let info = `<div class="task-info">`;
                    info += `<strong>${todo.task || '(Sem título)'}</strong>`;
                    
                    // Tags para tipo e status
                    let tags = `<div class="tags">`;
                    tags += `<span class="tag">${tipoLabel[todo.tipo] || todo.tipo}</span>`;
                    
                    if (todo.important) {
                        tags += `<span class="tag tag-important">Importante</span>`;
                    }
                    
                    if (todo.urgent) {
                        tags += `<span class="tag tag-urgent">Urgente</span>`;
                    }
                    tags += `</div>`;
                    
                    info += tags;
    
                    if (todo.tipo === 'tarefa') {
                        if (todo.description) info += `<p><small>${todo.description}</small></p>`;
                        if (todo.deadline) info += `<p><small>Prazo: ${formatDate(todo.deadline)}</small></p>`;
                    } else if (todo.tipo === 'prova') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                    } else if (todo.tipo === 'projeto') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                        if (todo.complexidade) info += `<p><small>Complexidade: ${todo.complexidade}</small></p>`;
                    } else if (todo.tipo === 'relatorio') {
                        if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                        if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                        if (todo.plataforma) info += `<p><small>Plataforma: ${todo.plataforma}</small></p>`;
                    }
    
                    info += `</div>`;
    
                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'task-content';
                    infoDiv.innerHTML = info;
    
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'actions';
    
                    // Botão de concluir (só aparece se não estiver concluído)
                    if (!todo.completed) {
                        const completeBtn = document.createElement('button');
                        completeBtn.textContent = 'Concluir';
                        completeBtn.className = 'complete-btn';
                        completeBtn.onclick = () => {
                            fetch(`/api/todos/${idx}/complete`, { method: 'PUT' })
                                .then(response => {
                                    if (response.ok) {
                                        fetchTodos();
                                        fetchMatriz();
                                        updateHomeCounter();
                                    }
                                });
                        };
                        actionsDiv.appendChild(completeBtn);
                    }
    
                    // Botão de editar (só aparece se não estiver concluído)
                    if (!todo.completed) {
                        const editBtn = document.createElement('button');
                        editBtn.textContent = 'Editar';
                        editBtn.className = 'edit-btn';
                        editBtn.onclick = () => openModal(true, { ...todo, idx });
                        actionsDiv.appendChild(editBtn);
                    }
    
                    // Botão de deletar (sempre aparece)
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Deletar';
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.onclick = () => {
                        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                            fetch(`/api/todos/${idx}`, { method: 'DELETE' })
                                .then(response => {
                                    if (response.ok) {
                                        fetchTodos();
                                        fetchMatriz();
                                        updateHomeCounter();
                                    }
                                });
                        }
                    };
                    actionsDiv.appendChild(deleteBtn);
    
                    li.appendChild(infoDiv);
                    li.appendChild(actionsDiv);
                    taskList.appendChild(li);
                });
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
            
            if (!modalTaskTipo) return;
            
            const tipo = modalTaskTipo.value;
            const important = modalTaskImportant ? modalTaskImportant.checked : false;
            const urgent = modalTaskUrgent ? modalTaskUrgent.checked : false;
            let todo = { tipo, important, urgent };

            if (tipo === 'tarefa') {
                todo.task = modalTaskTitle ? modalTaskTitle.value : '';
                todo.description = modalTaskDesc ? modalTaskDesc.value : '';
                todo.deadline = modalTaskDeadline ? modalTaskDeadline.value : '';
            } else if (tipo === 'prova') {
                todo.task = modalTaskTitle ? modalTaskTitle.value : '';
                todo.deadline = modalProvaDate ? modalProvaDate.value : '';
                todo.materia = modalProvaMateria ? modalProvaMateria.value : '';
            } else if (tipo === 'projeto') {
                todo.task = modalTaskTitle ? modalTaskTitle.value : '';
                todo.deadline = modalProjetoDate ? modalProjetoDate.value : '';
                todo.materia = modalProjetoMateria ? modalProjetoMateria.value : '';
                todo.complexidade = modalProjetoComplexidade ? modalProjetoComplexidade.value : '';
            } else if (tipo === 'relatorio') {
                todo.task = modalTaskTitle ? modalTaskTitle.value : '';
                todo.deadline = modalRelatorioDate ? modalRelatorioDate.value : '';
                todo.materia = modalRelatorioMateria ? modalRelatorioMateria.value : '';
                todo.plataforma = modalRelatorioPlataforma ? modalRelatorioPlataforma.value : '';
            }
            
            const apiCall = editIndex !== null
                ? fetch(`/api/todos/${editIndex}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                  })
                : fetch('/api/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                  });
            
            apiCall.then(response => {
                if (response.ok) {
                    closeModalFunc();
                    fetchTodos();
                    fetchMatriz();
                    updateHomeCounter();
                }
            }).catch(error => {
                console.error('Erro ao salvar tarefa:', error);
            });
        };
    }

    // Inicializar as funcionalidades baseado na página atual
    if (document.getElementById('taskList')) {
        // Estamos na página de tarefas
        fetchTodos();
    }
    
    if (document.getElementById('faca')) {
        // Estamos na página da matriz
        fetchMatriz();
    }
    
    if (document.getElementById('contadorPendente')) {
        // Estamos na página home
        updateHomeCounter();
    }
});
