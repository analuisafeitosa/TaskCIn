#ifndef PROVA_H
#define PROVA_H

#include "TodoItem.h"

// Classe específica para provas, inclui a matéria associada
class Prova : public TodoItem {
public:
    // Construtor padrão: cria uma prova vazia
    Prova() : TodoItem(), materia("") {
        setTipo("prova");
    }
    
    // Construtor com parâmetros: inicializa prova com título, data e matéria
    Prova(const std::string& task, const std::string& deadline,
          const std::string& materia)
        : TodoItem(task, deadline, "prova"), 
          materia(materia) {}
    
    // Copy constructor
    Prova(const Prova& other)
        : TodoItem(other), 
          materia(other.materia) {}

    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getMateria() const { return materia; }

    // Setters
    void setMateria(const std::string& m) { materia = m; }

private:
    std::string materia;
};

#endif