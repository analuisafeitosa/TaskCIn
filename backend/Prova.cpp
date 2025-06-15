#include "Prova.h"

Prova::Prova() { setTipo("prova"); }

void Prova::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},
        {"task", getTask()},
        {"deadline", getDeadline()},
        {"materia", getMateria()},
        {"completed", isCompleted()},
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}