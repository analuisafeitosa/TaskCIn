#include "Projeto.h"

Projeto::Projeto() { setTipo("projeto"); }

void Projeto::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},
        {"task", getTask()},
        {"deadline", getDeadline()},
        {"materia", getMateria()},
        {"complexidade", getComplexidade()},
        {"completed", isCompleted()},
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}