document.addEventListener('DOMContentLoaded', () => {
    const faca = document.getElementById('faca');
    const delegue = document.getElementById('delegue');
    const programe = document.getElementById('programe');
    const exclua = document.getElementById('exclua');

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function fetchMatriz() {
        fetch(`http://localhost:3000/api/todos`)
            .then(res => res.json())
            .then(todos => {
                faca.innerHTML = '<div class="quadrant-title"><p>FAÇA</p></div>';
                delegue.innerHTML = '<div class="quadrant-title"><p>DELEGUE</p></div>';
                programe.innerHTML = '<div class="quadrant-title"><p>PROGRAME</p></div>';
                exclua.innerHTML = '<div class="quadrant-title"><p>EXCLUA</p></div>';

                const tipoLabel = {
                    tarefa: "Tarefa",
                    prova: "Prova",
                    projeto: "Projeto",
                    relatorio: "Relatório"
                };

                todos.forEach(todo => {
                    const card = document.createElement('div');
                    card.className = 'matrix-task-card';

                    let info = `<strong>${todo.task || '(Sem título)'}</strong>`;
                    info += `<span class="tag">${tipoLabel[todo.tipo] || todo.tipo}</span>`;

                    if (todo.deadline) info += `<p><small>Data: ${formatDate(todo.deadline)}</small></p>`;
                    if (todo.materia) info += `<p><small>Matéria: ${todo.materia}</small></p>`;
                    if (todo.description) info += `<p><small>${todo.description}</small></p>`;
                    if (todo.complexidade) info += `<p><small>Complexidade: ${todo.complexidade}</small></p>`;
                    if (todo.plataforma) info += `<p><small>Plataforma: ${todo.plataforma}</small></p>`;

                    card.innerHTML = info;

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

    fetchMatriz();
});
