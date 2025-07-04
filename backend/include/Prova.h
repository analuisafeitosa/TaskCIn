#ifndef PROVA_H
#define PROVA_H

#include "TodoItem.h"

// Classe específica para provas, inclui a matéria associada
class Prova : public TodoItem {
public:    
    // Construtor unificado com padrão e com parâmetros: inicializa prova com título, data e matéria
    Prova(const std::string& task = "", const std::string& deadline = "",
          const std::string& materia = "")
        : TodoItem(task, deadline, "prova"), 
          materia(materia) {}
    
    // Copy constructor para realizar cópias completas dos dados dos objeto
    Prova(const Prova& other)
        : TodoItem(other), 
          materia(other.materia) {}

    void to_json(nlohmann::json& j) const override; // Polimorfismo

    // Getters
    std::string getMateria() const { return materia; }

    // Setters
    void setMateria(const std::string& m) { materia = m; }

private:
    std::string materia;
};

#endif