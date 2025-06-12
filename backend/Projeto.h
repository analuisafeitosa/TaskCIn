#ifndef PROJETO_H
#define PROJETO_H

#include "TodoItem.h"

class Projeto : public TodoItem {
public:
    Projeto();
    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getMateria() const { return materia; }
    std::string getComplexidade() const { return complexidade; }

    // Setters
    void setMateria(const std::string& m) { materia = m; }
    void setComplexidade(const std::string& c) { complexidade = c; }

private:
    std::string materia;
    std::string complexidade;
};

#endif