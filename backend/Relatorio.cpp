#include "Relatorio.h"

Relatorio::Relatorio() { tipo = "relatorio"; }

void Relatorio::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", tipo},
        {"task", task},
        {"deadline", deadline},
        {"materia", materia},
        {"plataforma", plataforma},
        {"completed", completed}
    };
}