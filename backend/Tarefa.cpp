#include "Tarefa.h"

Tarefa::Tarefa() { setTipo("tarefa"); }

void Tarefa::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},
        {"task", getTask()},
        {"description", getDescription()},
        {"deadline", getDeadline()},
        {"completed", isCompleted()},
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}