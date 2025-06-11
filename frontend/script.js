document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.getElementById('closeModal');
    const taskForm = document.getElementById('taskForm');
    const modalTitle = document.getElementById('modalTitle');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const modalTaskTitle = document.getElementById('modalTaskTitle');
    const modalTaskDesc = document.getElementById('modalTaskDesc');
    const modalTaskDeadline = document.getElementById('modalTaskDeadline');
    const modalTaskUrgency = document.getElementById('modalTaskUrgency');

    let editIndex = null;

    function openModal(edit = false, todo = {}) {
        taskModal.style.display = 'block';
        modalTitle.textContent = edit ? 'Edit Task' : 'Add Task';
        modalTaskTitle.value = todo.task || '';
        modalTaskDesc.value = todo.description || '';
        modalTaskDeadline.value = todo.deadline || '';
        modalTaskUrgency.value = todo.urgency || 'low';
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
                todos.forEach((todo, idx) => {
                    const li = document.createElement('li');
                    li.className = 'todo-item';

                    const info = document.createElement('div');
                    info.style.flex = '1';
                    info.innerHTML = `<strong>${todo.task}</strong><br>
                        <small>${todo.description || ''}</small><br>
                        <small>Deadline: ${todo.deadline || '-'}</small><br>
                        <small>Urgency: ${todo.urgency || 'low'}</small>`;

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.onclick = () => openModal(true, { ...todo, idx });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.onclick = () => {
                        fetch(`/api/todos/${idx}`, { method: 'DELETE' })
                            .then(fetchTodos);
                    };

                    li.appendChild(info);
                    li.appendChild(editBtn);
                    li.appendChild(deleteBtn);
                    taskList.appendChild(li);
                });
            });
    }

    addTaskButton.onclick = () => openModal(false);

    taskForm.onsubmit = (e) => {
        e.preventDefault();
        const todo = {
            task: modalTaskTitle.value,
            description: modalTaskDesc.value,
            deadline: modalTaskDeadline.value,
            urgency: modalTaskUrgency.value
        };
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