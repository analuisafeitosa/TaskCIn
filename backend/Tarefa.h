#ifndef TAREFA_H
#define TAREFA_H

#include "TodoItem.h"

class Tarefa : public TodoItem {
public:
    std::string description;
    std::string urgency;
    Tarefa();
    void to_json(nlohmann::json& j) const override;
};

#endif