#include "Relatorio.h"

Relatorio::Relatorio() { setTipo("relatorio"); }

void Relatorio::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},
        {"task", getTask()},
        {"deadline", getDeadline()},
        {"materia", getMateria()},
        {"plataforma", getPlataforma()},
        {"completed", isCompleted()},
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}