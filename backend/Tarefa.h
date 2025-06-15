#ifndef TAREFA_H
#define TAREFA_H

#include "TodoItem.h"

class Tarefa : public TodoItem {
public:
    Tarefa();
    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getDescription() const { return description; }

    // Setters
    void setDescription(const std::string& d) { description = d; }

private:
    std::string description;
};

#endif