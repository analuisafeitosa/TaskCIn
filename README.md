# TaskCIn - Gerenciador de Tarefas Acadêmicas

TaskCIn é um sistema de gerenciamento de tarefas acadêmicas que utiliza a matriz de Eisenhower para classificar atividades com base em sua importância e urgência.

## 🇧🇷 Português

### Visão Geral

O TaskCIn permite gerenciar diferentes tipos de atividades acadêmicas:

- **Tarefas**: tarefas genéricas com descrição
- **Provas**: exames com matéria associada
- **Projetos**: projetos acadêmicos com matéria e nível de complexidade
- **Relatórios**: relatórios com matéria e plataforma de entrega

Todas as atividades são automaticamente classificadas na matriz de Eisenhower conforme sua importância e urgência.

### Tecnologias

- **Backend**: C++ (lógica de negócios) e Node.js (API REST)
- **Frontend**: HTML, CSS e JavaScript
- **Persistência**: Arquivos JSON

### Pré-requisitos

Verifique se você tem os seguintes itens instalados:

1. **Node.js** 
2. **npm**
3. **Compilador C++**
4. **Git**

### Instalação

1. Clone o repositório
   
2. Compile o código C++:
- **cd backend**
- **cd source**
- **g++ todo_storage.cpp Tarefa.cpp Prova.cpp Projeto.cpp Relatorio.cpp -o ../todo_storage**

### Executando o Projeto

1. Inicie o servidor:
npm start
2. Acesse o aplicativo: Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000)

### Estrutura do Projeto

- **frontend/**: Interface do usuário
- `home.html`: Página inicial
- `index.html`: Gerenciamento de tarefas
- `matriz.html`: Visualização da matriz de Eisenhower
- `script.js`: Lógica do frontend
- `style.css`: Estilos

- **backend/**: Servidor e lógica de negócios
- `server.js`: API REST
- **Classes C++**:
 - `TodoItem.h`: Classe base para todos os tipos de tarefas
 - `Tarefa.h/cpp`: Implementação de tarefas
 - `Prova.h/cpp`: Implementação de provas
 - `Projeto.h/cpp`: Implementação de projetos
 - `Relatorio.h/cpp`: Implementação de relatórios
 - `todo_storage.cpp`: Gerenciamento de dados e operações CRUD
 - `todos.json`: Armazenamento de dados

### Uso

- **Adicionar tarefas**: Clique em "Adicionar Nova Tarefa" na página de tarefas
- **Editar/Excluir**: Use os botões na lista de tarefas
- **Visualizar matriz**: Acesse a página "MATRIZ" para ver suas tarefas organizadas por prioridade

### Recursos

- 📊 **Matriz de Eisenhower** para priorização de tarefas
- 🎓 **Gerenciamento de diferentes tipos de atividades acadêmicas**
- 📝 **Interface intuitiva** para adicionar, editar e excluir tarefas
- 🔄 **Atualizações em tempo real** da interface

  Desenvolvido como projeto acadêmico para demonstrar o uso de C++ com herança e polimorfismo, integrado a uma interface web moderna.

---

## 🇬🇧 English

### Overview

TaskCIn allows you to manage different types of academic activities:

- **Tasks**: generic tasks with descriptions
- **Exams**: tests with associated subjects
- **Projects**: academic projects with subject and complexity level
- **Reports**: reports with subject and delivery platform

All activities are automatically classified in the Eisenhower matrix according to their importance and urgency.

### Technologies

- **Backend**: C++ (business logic) and Node.js (REST API)
- **Frontend**: HTML, CSS, and JavaScript
- **Persistence**: JSON files

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- C++ compiler (GCC, Visual C++, etc.)
- Git

### Installation

1. Clone the repository.
   
2. Compile the C++ code:
- **cd backend**
- **cd source**
- **g++ todo_storage.cpp Tarefa.cpp Prova.cpp Projeto.cpp Relatorio.cpp -o ../todo_storage**

### Running the Project

1. Start the server:
npm start

3. Access the application: Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

- **frontend/**: User interface
- `home.html`: Home page
- `index.html`: Task management
- `matriz.html`: Eisenhower matrix visualization
- `script.js`: Frontend logic
- `style.css`: Styles

- **backend/**: Server and business logic
- `server.js`: REST API
- **C++ Classes**:
 - `TodoItem.h`: Base class for all task types
 - `Tarefa.h/cpp`: Task implementation
 - `Prova.h/cpp`: Exam implementation
 - `Projeto.h/cpp`: Project implementation
 - `Relatorio.h/cpp`: Report implementation
 - `todo_storage.cpp`: Data management and CRUD operations
 - `todos.json`: Data storage

### Usage

- **Add tasks**: Click "Adicionar Nova Tarefa" on the tasks page
- **Edit/Delete**: Use the buttons in the task list
- **View matrix**: Access the "MATRIZ" page to see your tasks organized by priority


### Features

- 📊 **Eisenhower Matrix** for prioritizing tasks
- 🎓 **Management of different types of academic activities**
- 📝 **Intuitive interface** for adding, editing and deleting tasks
- 🔄 **Real-time updates** of the interface

Developed as an academic project to demonstrate the use of C++ with inheritance and polymorphism, integrated with a modern web interface.

