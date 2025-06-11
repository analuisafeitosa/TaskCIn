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
                    t->task = j.value("task", "");
                    t->description = j.value("description", "");
                    t->deadline = j.value("deadline", "");
                    t->urgency = j.value("urgency", "");
                    t->completed = j.value("completed", false);
                    todos.push_back(t);
                } else if (tipo == "prova") {
                    auto t = std::make_shared<Prova>();
                    t->task = j.value("task", "");
                    t->deadline = j.value("deadline", "");
                    t->materia = j.value("materia", "");
                    t->completed = j.value("completed", false);
                    todos.push_back(t);
                } else if (tipo == "projeto") {
                    auto t = std::make_shared<Projeto>();
                    t->task = j.value("task", "");
                    t->deadline = j.value("deadline", "");
                    t->materia = j.value("materia", "");
                    t->complexidade = j.value("complexidade", "");
                    t->completed = j.value("completed", false);
                    todos.push_back(t);
                } else if (tipo == "relatorio") {
                    auto t = std::make_shared<Relatorio>();
                    t->task = j.value("task", "");
                    t->deadline = j.value("deadline", "");
                    t->materia = j.value("materia", "");
                    t->plataforma = j.value("plataforma", "");
                    t->completed = j.value("completed", false);
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
            t->task = argv[3];
            t->description = argv[4];
            t->deadline = argv[5];
            t->urgency = argv[6];
            t->completed = false;
            item = t;
        } else if (tipo == "prova" && argc >= 6) {
            auto t = std::make_shared<Prova>();
            t->task = argv[3];
            t->deadline = argv[4];
            t->materia = argv[5];
            t->completed = false;
            item = t;
        } else if (tipo == "projeto" && argc >= 7) {
            auto t = std::make_shared<Projeto>();
            t->task = argv[3];
            t->deadline = argv[4];
            t->materia = argv[5];
            t->complexidade = argv[6];
            t->completed = false;
            item = t;
        } else if (tipo == "relatorio" && argc >= 7) {
            auto t = std::make_shared<Relatorio>();
            t->task = argv[3];
            t->deadline = argv[4];
            t->materia = argv[5];
            t->plataforma = argv[6];
            t->completed = false;
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
            t->task = argv[4];
            t->description = argv[5];
            t->deadline = argv[6];
            t->urgency = argv[7];
            t->completed = false;
            todos[idx] = t;
        } else if (tipo == "prova" && argc >= 7) {
            auto t = std::make_shared<Prova>();
            t->task = argv[4];
            t->deadline = argv[5];
            t->materia = argv[6];
            t->completed = false;
            todos[idx] = t;
        } else if (tipo == "projeto" && argc >= 8) {
            auto t = std::make_shared<Projeto>();
            t->task = argv[4];
            t->deadline = argv[5];
            t->materia = argv[6];
            t->complexidade = argv[7];
            t->completed = false;
            todos[idx] = t;
        } else if (tipo == "relatorio" && argc >= 8) {
            auto t = std::make_shared<Relatorio>();
            t->task = argv[4];
            t->deadline = argv[5];
            t->materia = argv[6];
            t->plataforma = argv[7];
            t->completed = false;
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