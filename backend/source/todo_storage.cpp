#include <iostream>
#include <fstream>
#include <vector>
#include <string>

#include <locale>
#include "../nlohmann/json.hpp"

#include "../include/TodoItem.h"
#include "../include/Tarefa.h"
#include "../include/Prova.h"
#include "../include/Projeto.h"
#include "../include/Relatorio.h"

using json = nlohmann::json; //Alias para facilitar uso da biblioteca JSON

const std::string DATA_FILE = "data/todos.json";    // Caminho do arquivo de persistência

// Função que carrega todas as tarefas do arquivo JSON e cria objetos C++
std::vector<std::shared_ptr<TodoItem>> loadTodos() {
    // Container polimórfico que pode armazenar diferentes tipos de tarefa
    std::vector<std::shared_ptr<TodoItem>> todos;

    // Tenta abrir arquivo de dados
    std::ifstream file(DATA_FILE);
    if (file.is_open()) {
        nlohmann::json todos_json;
        try {
            file >> todos_json;     // Lê JSON do arquivo
            // Percorre cada item JSON e cria objeto C++ correspondente
            for (const auto& j : todos_json) {
                std::string tipo = j.value("tipo", "tarefa");

                // POLIMORFISMO: Cria objeto específico baseado no tipo
                if (tipo == "tarefa") {
                    auto t = std::make_shared<Tarefa>();
                    // Configura objeto usando dados do JSON
                    t->setTask(j.value("task", ""));
                    t->setImportant(j.value("important", false));
                    t->setUrgent(j.value("urgent", false));
                    t->setDescription(j.value("description", ""));
                    t->setDeadline(j.value("deadline", ""));
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "prova") {
                    auto t = std::make_shared<Prova>();
                    t->setTask(j.value("task", ""));
                    t->setImportant(j.value("important", false));
                    t->setUrgent(j.value("urgent", false));
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));   // Campo específico da Prova
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "projeto") {
                    auto t = std::make_shared<Projeto>();
                    t->setTask(j.value("task", ""));
                    t->setImportant(j.value("important", false));
                    t->setUrgent(j.value("urgent", false));
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));
                    t->setComplexidade(j.value("complexidade", ""));// Campos específicos do Projeto
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "relatorio") {
                    auto t = std::make_shared<Relatorio>();
                    t->setTask(j.value("task", ""));
                    t->setImportant(j.value("important", false));
                    t->setUrgent(j.value("urgent", false));                    
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));
                    t->setPlataforma(j.value("plataforma", ""));    // Campos específicos do Relatório
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                }
            }
        } catch (...) {}
         // Captura qualquer erro de parsing JSON - arquivo corrompido, etc.
        file.close();
    }
    return todos;  // Retorna container com objetos polimórficos
}

// Função que salva todas as tarefas em arquivo JSON usando polimorfismo
void saveTodos(const std::vector<std::shared_ptr<TodoItem>>& todos) {
    nlohmann::json todos_json = nlohmann::json::array();    // Cria array JSON vazio

    // POLIMORFISMO EM AÇÃO: Runtime dispatch
    for (const auto& item : todos) {
        nlohmann::json j;
        item->to_json(j); // Chama método específico de cada classe
        // Se item é Tarefa*, chama Tarefa::to_json()
        // Se item é Prova*, chama Prova::to_json()
        // Virtual table determina qual método executar
        todos_json.push_back(j);
    }

    // Salva JSON formatado no arquivo
    std::ofstream file(DATA_FILE);
    if (file.is_open()) {
        file << todos_json.dump(4); 
        file.close();
    }
}

int main(int argc, char* argv[]) {
    // Validação básica de argumentos
    if (argc < 2) {
        std::cerr << "No command provided.\n";
        return 1;
    }
    std::string command = argv[1];  // Primeiro argumento = comando
    std::vector<std::shared_ptr<TodoItem>> todos = loadTodos();  // Carrega dados existentes

    // COMANDO GET: Lista todas as tarefas
    if (command == "get") {
        json todos_json = json::array();
        for (const auto& item : todos) {
            json j;
            item->to_json(j);   // Polimorfismo: cada classe serializa diferente
            std::cerr << item->isImportant() << std::endl;
            todos_json.push_back(j);
        }
        std::cout << todos_json.dump(); // Saída para stdout (consumida pelo Node.js)

        // COMANDO ADD: Adiciona nova tarefa
    } else if (command == "add" && argc >= 4) {
        std::string tipo = argv[2]; // Tipo da tarefa
        std::shared_ptr<TodoItem> item; // Ponteiro polimórfico

        if (tipo == "tarefa" && argc >= 7) {
            auto t = std::make_shared<Tarefa>();
            t->setImportant(std::string(argv[3]) == std::string("true"));
            t->setUrgent(std::string(argv[4]) == std::string("true"));
            t->setTask(argv[3+2]);
            t->setDescription(argv[4+2]);
            t->setDeadline(argv[5+2]);
            t->setCompleted(false);
            item = t;   
        } else if (tipo == "prova" && argc >= 6) {
            auto t = std::make_shared<Prova>();
            t->setImportant(std::string(argv[3]) == std::string("true"));
            t->setUrgent(std::string(argv[4]) == std::string("true"));
            t->setTask(argv[3+2]);
            t->setDeadline(argv[4+2]);
            t->setMateria(argv[5+2]);
            t->setCompleted(false);
            item = t;
        } else if (tipo == "projeto" && argc >= 7) {
            auto t = std::make_shared<Projeto>();
            t->setImportant(std::string(argv[3]) == std::string("true"));
            t->setUrgent(std::string(argv[4]) == std::string("true"));            
            t->setTask(argv[3+2]);
            t->setDeadline(argv[4+2]);
            t->setMateria(argv[5+2]);
            t->setComplexidade(argv[6+2]);
            t->setCompleted(false);
            item = t;
        } else if (tipo == "relatorio" && argc >= 7) {
            auto t = std::make_shared<Relatorio>();
            t->setImportant(std::string(argv[3]) == std::string("true"));
            t->setUrgent(std::string(argv[4]) == std::string("true"));
            t->setTask(argv[3+2]);
            t->setDeadline(argv[4+2]);
            t->setMateria(argv[5+2]);
            t->setPlataforma(argv[6+2]);
            t->setCompleted(false);
            item = t;
        } else {
            std::cerr << "Invalid arguments for type.\n";
            return 1;
        }
        todos.push_back(item);  // Adiciona ao container polimórfico
        saveTodos(todos);   // Persiste no arquivo
        std::cout << "Added\n"; // Confirma para Node.js
    } 
    
    // COMANDO EDIT: Edita tarefa existente
else if (command == "edit" && argc >= 5) {
    int idx = std::stoi(argv[2]);
    std::string tipo = argv[3];
    if (idx >= 0 && idx < todos.size()) {
        // Preserva status de conclusão que é muito importante para UX
        bool status_concluido_salvo = todos[idx]->isCompleted();

        // Recria objeto com novos dados, mas preserva status
        if (tipo == "tarefa" && argc >= 9) { // Argc corrigido
            auto t = std::make_shared<Tarefa>();
            t->setImportant(std::string(argv[4]) == "true");
            t->setUrgent(std::string(argv[5]) == "true");
            t->setTask(argv[6]);
            t->setDescription(argv[7]);
            t->setDeadline(argv[8]);
            // 2. Restaura o status de conclusão usando a variável que criamos.
            t->setCompleted(status_concluido_salvo);
            todos[idx] = t; // Substitui objeto no container
        } else if (tipo == "prova" && argc >= 9) { // Argc corrigido
            auto t = std::make_shared<Prova>();
            t->setImportant(std::string(argv[4]) == "true");
            t->setUrgent(std::string(argv[5]) == "true");
            t->setTask(argv[6]);
            t->setDeadline(argv[7]);
            t->setMateria(argv[8]);
            // Restaura o status
            t->setCompleted(status_concluido_salvo);
            todos[idx] = t;
        } else if (tipo == "projeto" && argc >= 10) { // Argc corrigido
            auto t = std::make_shared<Projeto>();
            t->setImportant(std::string(argv[4]) == "true");
            t->setUrgent(std::string(argv[5]) == "true");
            t->setTask(argv[6]);
            t->setDeadline(argv[7]);
            t->setMateria(argv[8]);
            t->setComplexidade(argv[9]);
            // Restaura o status
            t->setCompleted(status_concluido_salvo);
            todos[idx] = t;
        } else if (tipo == "relatorio" && argc >= 10) { // Argc corrigido
            auto t = std::make_shared<Relatorio>();
            t->setImportant(std::string(argv[4]) == "true");
            t->setUrgent(std::string(argv[5]) == "true");
            t->setTask(argv[6]);
            t->setDeadline(argv[7]);
            t->setMateria(argv[8]);
            t->setPlataforma(argv[9]);
            // Restaura o status
            t->setCompleted(status_concluido_salvo);
            todos[idx] = t;
        } else {
            std::cerr << "Argumentos invalidos para o tipo ou comando.\n";
            return 1;
        }
        saveTodos(todos);   // Persiste mudanças
        std::cout << "Edited\n";    // Confirma sucesso
    } else {
        std::cerr << "Invalid index\n";
        return 1;
    }
}
// COMANDO DELETE: Remove tarefa
else if (command == "delete" && argc >= 3) {
    int idx = std::stoi(argv[2]);
    if (idx >= 0 && idx < todos.size()) {
        todos.erase(todos.begin() + idx);    // Remove do container
        saveTodos(todos);   // Persiste mudança
        std::cout << "Deleted\n";
    } else {
        std::cerr << "Invalid index\n";
        return 1;
    }
}

// COMANDO COMPLETE: Marca como concluída
else if (command == "complete" && argc >= 3) {
    int idx = std::stoi(argv[2]);
    if (idx >= 0 && idx < todos.size()) {
        todos[idx]->setCompleted(true); // Usa polimorfismo método herdado
        saveTodos(todos);   // Persiste mudança
        std::cout << "Completed\n";
    } else {
        std::cerr << "Invalid index\n";
        return 1;
    }
}
    return 0;
}