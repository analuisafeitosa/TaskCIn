#ifndef PROVA_H
#define PROVA_H

#include "TodoItem.h"

class Prova : public TodoItem {
public:
    Prova();
    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getMateria() const { return materia; }

    // Setters
    void setMateria(const std::string& m) { materia = m; }

private:
    std::string materia;
};

#endif