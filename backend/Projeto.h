#ifndef PROJETO_H
#define PROJETO_H

#include "TodoItem.h"

// Classe para projetos acadêmicos, com matéria e nível de complexidade
class Projeto : public TodoItem {
public:
    // Construtor padrão: cria um projeto vazio
    Projeto() : TodoItem(), materia(""), complexidade("") {
        setTipo("projeto");
    }
    
    // Construtor com parâmetros: inicializa projeto com todos os detalhes
    Projeto(const std::string& task, const std::string& deadline,
            const std::string& materia, const std::string& complexidade)
        : TodoItem(task, deadline, "projeto"), 
          materia(materia), complexidade(complexidade) {}
    
    // Copy constructor
    Projeto(const Projeto& other)
        : TodoItem(other), 
          materia(other.materia), 
          complexidade(other.complexidade) {}

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