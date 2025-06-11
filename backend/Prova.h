#ifndef PROVA_H
#define PROVA_H

#include "TodoItem.h"

class Prova : public TodoItem {
public:
    std::string materia;
    Prova();
    void to_json(nlohmann::json& j) const override;
};

#endif