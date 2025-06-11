#include <iostream>
#include <fstream>
#include <vector>
#include <string>

#include <locale>
#include "nlohmann/json.hpp"

using json = nlohmann::json;

const std::string DATA_FILE = "data/todos.json";

json loadTodos() {
    std::ifstream file(DATA_FILE);
    json todos = json::array();
    if (file.is_open()) {
        try {
            file >> todos;
        } catch (...) {
            todos = json::array();
        }
        file.close();
    }
    return todos;
}

void saveTodos(const json& todos) {
    std::ofstream file(DATA_FILE);
    if (file.is_open()) {
        file << todos.dump(4);
        file.close();
    }
}
int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "No command provided.\n";
        return 1;
    }
    std::string command = argv[1];
    json todos = loadTodos();

    if (command == "get") {
        std::cout << todos.dump();
    } else if (command == "add" && argc >= 6) {
        std::string task = argv[2];
        std::string description = argv[3];
        std::string deadline = argv[4];
        std::string urgency = argv[5];
        json newTodo = {
            {"task", task},
            {"description", description},
            {"deadline", deadline},
            {"urgency", urgency},
            {"completed", false}
        };
        todos.push_back(newTodo);
        saveTodos(todos);
        std::cout << "Added\n";
    } else if (command == "edit" && argc >= 7) {
        int idx = std::stoi(argv[2]);
        std::string task = argv[3];
        std::string description = argv[4];
        std::string deadline = argv[5];
        std::string urgency = argv[6];
        if (idx >= 0 && idx < todos.size()) {
            todos[idx]["task"] = task;
            todos[idx]["description"] = description;
            todos[idx]["deadline"] = deadline;
            todos[idx]["urgency"] = urgency;
            saveTodos(todos);
            std::cout << "Edited\n";
        } else {
            std::cerr << "Invalid index\n";
            return 1;
        }
    } else if (command == "delete" && argc >= 3) {
        int idx = std::stoi(argv[2]);
        if (idx >= 0 && idx < todos.size()) {
            todos.erase(todos.begin() + idx);
            saveTodos(todos);
            std::cout << "Deleted\n";
        } else {
            std::cerr << "Invalid index\n";
            return 1;
        }
    } else {
        std::cerr << "Invalid command or arguments.\n";
        return 1;
    }
    return 0;
}