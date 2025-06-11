#include "Tarefa.h"

Tarefa::Tarefa() { tipo = "tarefa"; }

void Tarefa::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", tipo},
        {"task", task},
        {"description", description},
        {"deadline", deadline},
        {"urgency", urgency},
        {"completed", completed}
    };
}