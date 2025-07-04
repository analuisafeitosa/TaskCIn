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

## Estrutura do Projeto

### frontend/: Interface do usuário
- **index.html**: Página principal do sistema  
- **style.css**: Estilos da interface  
- **script.js**: Lógica do frontend  

### backend/: Servidor e lógica de negócios
- **server.js**: API REST em Node.js  
- **todo_storage.exe**: Executável compilado da lógica em C++  

#### backend/include/: Headers das classes
- **TodoItem.h**: Classe base abstrata para todos os tipos de tarefas  
- **Tarefa.h**: Definição da classe Tarefa  
- **Prova.h**: Definição da classe Prova  
- **Projeto.h**: Definição da classe Projeto  
- **Relatorio.h**: Definição da classe Relatório  

#### backend/source/: Implementações das classes
- **todo_storage.cpp**: Gerenciamento de dados e operações CRUD  
- **Tarefa.cpp**: Implementação da classe Tarefa  
- **Prova.cpp**: Implementação da classe Prova  
- **Projeto.cpp**: Implementação da classe Projeto  
- **Relatorio.cpp**: Implementação da classe Relatório  

#### backend/nlohmann/: Biblioteca externa para manipulação de JSON
- **json.hpp**: Biblioteca para serialização e desserialização JSON em C++  

#### backend/data/: Armazenamento de dados
- **todos.json**: Base de dados com as tarefas salvas  

### Arquivos adicionais
- **package.json**: Configuração do projeto Node.js  
- **README.md**: Documentação do projeto   


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

## Project Structure

### frontend/: User Interface
- **index.html**: Main page of the system  
- **style.css**: Interface styles  
- **script.js**: Frontend logic  

### backend/: Server and business logic
- **server.js**: Node.js REST API  
- **todo_storage.exe**: Compiled C++ executable  

#### backend/include/: Class headers
- **TodoItem.h**: Abstract base class for all task types  
- **Tarefa.h**: Definition of the Task class  
- **Prova.h**: Definition of the Exam class  
- **Projeto.h**: Definition of the Project class  
- **Relatorio.h**: Definition of the Report class  

#### backend/source/: Class implementations
- **todo_storage.cpp**: Data management and CRUD operations  
- **Tarefa.cpp**: Implementation of the Task class  
- **Prova.cpp**: Implementation of the Exam class  
- **Projeto.cpp**: Implementation of the Project class  
- **Relatorio.cpp**: Implementation of the Report class  

#### backend/nlohmann/: External JSON library
- **json.hpp**: Library for JSON serialization and deserialization in C++  

#### backend/data/: Data storage
- **todos.json**: JSON file storing saved tasks  

### Additional files
- **package.json**: Node.js project configuration  
- **README.md**: Project documentation  


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

## Imagens/ Images
![image](https://github.com/user-attachments/assets/597bf356-d8c0-4517-8398-2ad21b4cc62b)
![image](https://github.com/user-attachments/assets/b92e3871-78b4-42f7-826b-b3953d4ec01d)
![image](https://github.com/user-attachments/assets/a882409b-7d06-4462-9a1c-5afbaeae0837)
![image](https://github.com/user-attachments/assets/f0502a11-ca64-42ba-8401-4d9940db4e65)
![image](https://github.com/user-attachments/assets/0cf293a2-da71-4ce2-a336-a5aac1076ac7)
![image](https://github.com/user-attachments/assets/59019027-06ea-40c2-a438-1f8ceb1fb199)












