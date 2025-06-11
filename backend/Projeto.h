#ifndef PROJETO_H
#define PROJETO_H

#include "TodoItem.h"

class Projeto : public TodoItem {
public:
    std::string materia;
    std::string complexidade;
    Projeto();
    void to_json(nlohmann::json& j) const override;
};

#endif