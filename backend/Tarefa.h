#ifndef TAREFA_H
#define TAREFA_H

#include "TodoItem.h"

class Tarefa : public TodoItem {
public:
    Tarefa();
    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getDescription() const { return description; }
    std::string getUrgency() const { return urgency; }

    // Setters
    void setDescription(const std::string& d) { description = d; }
    void setUrgency(const std::string& u) { urgency = u; }

private:
    std::string description;
    std::string urgency;
};

#endif