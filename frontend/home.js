document.addEventListener('DOMContentLoaded', () => {
    console.log('Script carregado');

    fetch('http://localhost:3000/api/todos')
        .then(res => {
            console.log('Response status:', res.status);
            return res.json();
        })
        .then(todos => {
            console.log('Dados recebidos:', todos);

            const pendingTodos = todos.filter(todo => !todo.completed);
            console.log('Tarefas pendentes:', pendingTodos);

            const pendingCount = pendingTodos.length;
            const counterElement = document.getElementById('contadorPendente');

            if (counterElement) {
                counterElement.textContent = pendingCount;
                console.log('Contador atualizado para:', pendingCount);
            } else {
                console.error('Elemento contadorPendente não encontrado!');
            }
        })
        .catch(err => console.error('Erro no fetch:', err));
});
