#include <iostream>
#include <fstream>
#include <vector>
#include <string>

#include <locale>
#include "nlohmann/json.hpp"

#include "TodoItem.h"
#include "Tarefa.h"
#include "Prova.h"
#include "Projeto.h"
#include "Relatorio.h"

using json = nlohmann::json;

const std::string DATA_FILE = "data/todos.json";

std::vector<std::shared_ptr<TodoItem>> loadTodos() {
    std::vector<std::shared_ptr<TodoItem>> todos;
    std::ifstream file(DATA_FILE);
    if (file.is_open()) {
        nlohmann::json todos_json;
        try {
            file >> todos_json;
            for (const auto& j : todos_json) {
                std::string tipo = j.value("tipo", "tarefa");
                if (tipo == "tarefa") {
                    auto t = std::make_shared<Tarefa>();
                    t->setTask(j.value("task", ""));
                    t->setDescription(j.value("description", ""));
                    t->setDeadline(j.value("deadline", ""));
                    t->setUrgency(j.value("urgency", ""));
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "prova") {
                    auto t = std::make_shared<Prova>();
                    t->setTask(j.value("task", ""));
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "projeto") {
                    auto t = std::make_shared<Projeto>();
                    t->setTask(j.value("task", ""));
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));
                    t->setComplexidade(j.value("complexidade", ""));
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                } else if (tipo == "relatorio") {
                    auto t = std::make_shared<Relatorio>();
                    t->setTask(j.value("task", ""));
                    t->setDeadline(j.value("deadline", ""));
                    t->setMateria(j.value("materia", ""));
                    t->setPlataforma(j.value("plataforma", ""));
                    t->setCompleted(j.value("completed", false));
                    todos.push_back(t);
                }
            }
        } catch (...) {}
        file.close();
    }
    return todos;
}

void saveTodos(const std::vector<std::shared_ptr<TodoItem>>& todos) {
    nlohmann::json todos_json = nlohmann::json::array();
    for (const auto& item : todos) {
        nlohmann::json j;
        item->to_json(j);
        todos_json.push_back(j);
    }
    std::ofstream file(DATA_FILE);
    if (file.is_open()) {
        file << todos_json.dump(4);
        file.close();
    }
}
int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "No command provided.\n";
        return 1;
    }
    std::string command = argv[1];
    std::vector<std::shared_ptr<TodoItem>> todos = loadTodos();

    if (command == "get") {
        json todos_json = json::array();
        for (const auto& item : todos) {
            json j;
            item->to_json(j);
            todos_json.push_back(j);
        }
        std::cout << todos_json.dump();
    } else if (command == "add" && argc >= 4) {
        std::string tipo = argv[2];
        std::shared_ptr<TodoItem> item;
        if (tipo == "tarefa" && argc >= 7) {
            auto t = std::make_shared<Tarefa>();
            t->setTask(argv[3]);
            t->setDescription(argv[4]);
            t->setDeadline(argv[5]);
            t->setUrgency(argv[6]);
            t->setCompleted(false);
            item = t;
        } else if (tipo == "prova" && argc >= 6) {
            auto t = std::make_shared<Prova>();
            t->setTask(argv[3]);
            t->setDeadline(argv[4]);
            t->setMateria(argv[5]);
            t->setCompleted(false);
            item = t;
        } else if (tipo == "projeto" && argc >= 7) {
            auto t = std::make_shared<Projeto>();
            t->setTask(argv[3]);
            t->setDeadline(argv[4]);
            t->setMateria(argv[5]);
            t->setComplexidade(argv[6]);
            t->setCompleted(false);
            item = t;
        } else if (tipo == "relatorio" && argc >= 7) {
            auto t = std::make_shared<Relatorio>();
            t->setTask(argv[3]);
            t->setDeadline(argv[4]);
            t->setMateria(argv[5]);
            t->setPlataforma(argv[6]);
            t->setCompleted(false);
            item = t;
        } else {
            std::cerr << "Invalid arguments for type.\n";
            return 1;
        }
        todos.push_back(item);
        saveTodos(todos);
        std::cout << "Added\n";
    } 
    else if (command == "edit" && argc >= 5) {
    int idx = std::stoi(argv[2]);
    std::string tipo = argv[3];
    if (idx >= 0 && idx < todos.size()) {
        if (tipo == "tarefa" && argc >= 8) {
            auto t = std::make_shared<Tarefa>();
            t->setTask(argv[4]);
            t->setDescription(argv[5]);
            t->setDeadline(argv[6]);
            t->setUrgency(argv[7]);
            t->setCompleted(false);
            todos[idx] = t;
        } else if (tipo == "prova" && argc >= 7) {
            auto t = std::make_shared<Prova>();
            t->setTask(argv[4]);
            t->setDeadline(argv[5]);
            t->setMateria(argv[6]);
            t->setCompleted(false);
            todos[idx] = t;
        } else if (tipo == "projeto" && argc >= 8) {
            auto t = std::make_shared<Projeto>();
            t->setTask(argv[4]);
            t->setDeadline(argv[5]);
            t->setMateria(argv[6]);
            t->setComplexidade(argv[7]);
            t->setCompleted(false);
            todos[idx] = t;
        } else if (tipo == "relatorio" && argc >= 8) {
            auto t = std::make_shared<Relatorio>();
            t->setTask(argv[4]);
            t->setDeadline(argv[5]);
            t->setMateria(argv[6]);
            t->setPlataforma(argv[7]);
            t->setCompleted(false);
            todos[idx] = t;
        } else {
            std::cerr << "Invalid arguments for type.\n";
            return 1;
        }
        saveTodos(todos);
        std::cout << "Edited\n";
    } else {
        std::cerr << "Invalid index\n";
        return 1;
    }
}
else if (command == "delete" && argc >= 3) {
    int idx = std::stoi(argv[2]);
    if (idx >= 0 && idx < todos.size()) {
        todos.erase(todos.begin() + idx);
        saveTodos(todos);
        std::cout << "Deleted\n";
    } else {
        std::cerr << "Invalid index\n";
        return 1;
    }
}
    return 0;
}