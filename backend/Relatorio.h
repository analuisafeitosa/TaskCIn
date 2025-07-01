#ifndef RELATORIO_H
#define RELATORIO_H

#include "TodoItem.h"

// Classe para relatórios, contém matéria e plataforma de entrega
class Relatorio : public TodoItem {
public:
    // Construtor unificado com padrão e com parâmetros: inicializa relatório com todos os dados
    Relatorio(const std::string& task = "", const std::string& deadline = "",
              const std::string& materia = "", const std::string& plataforma = "")
        : TodoItem(task, deadline, "relatorio"), 
          materia(materia), plataforma(plataforma) {}
    
    // Copy constructor
    Relatorio(const Relatorio& other)
        : TodoItem(other), 
          materia(other.materia), 
          plataforma(other.plataforma) {}

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