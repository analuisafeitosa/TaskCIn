#include "Prova.h"

Prova::Prova() { tipo = "prova"; }

void Prova::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", tipo},
        {"task", task},
        {"deadline", deadline},
        {"materia", materia},
        {"completed", completed}
    };
}