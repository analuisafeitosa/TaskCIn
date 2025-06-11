#include "Projeto.h"

Projeto::Projeto() { tipo = "projeto"; }

void Projeto::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", tipo},
        {"task", task},
        {"deadline", deadline},
        {"materia", materia},
        {"complexidade", complexidade},
        {"completed", completed}
    };
}