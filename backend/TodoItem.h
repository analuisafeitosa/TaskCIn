#ifndef TODOITEM_H
#define TODOITEM_H

#include <string>
#include "nlohmann/json.hpp"

class TodoItem {
public:
    TodoItem();
    virtual ~TodoItem() = default;
    virtual void to_json(nlohmann::json& j) const = 0;

    // Getters
    std::string getTipo() const { return tipo; }
    std::string getTask() const { return task; }
    std::string getDeadline() const { return deadline; }
    bool isCompleted() const { return completed; }

    // Setters
    void setTipo(const std::string& t) { tipo = t; }
    void setTask(const std::string& t) { task = t; }
    void setDeadline(const std::string& d) { deadline = d; }
    void setCompleted(bool c) { completed = c; }

private:
    std::string tipo;
    std::string task;
    std::string deadline;
    bool completed;
};

#endif