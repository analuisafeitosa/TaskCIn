#ifndef RELATORIO_H
#define RELATORIO_H

#include "TodoItem.h"

class Relatorio : public TodoItem {
public:
    std::string materia;
    std::string plataforma;
    Relatorio();
    void to_json(nlohmann::json& j) const override;
};

#endif