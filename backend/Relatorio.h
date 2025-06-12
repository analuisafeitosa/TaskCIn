#ifndef RELATORIO_H
#define RELATORIO_H

#include "TodoItem.h"

class Relatorio : public TodoItem {
public:
    Relatorio();
    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getMateria() const { return materia; }
    std::string getPlataforma() const { return plataforma; }

    // Setters
    void setMateria(const std::string& m) { materia = m; }
    void setPlataforma(const std::string& p) { plataforma = p; }

private:
    std::string materia;
    std::string plataforma;
};

#endif