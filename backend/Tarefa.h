#ifndef TAREFA_H
#define TAREFA_H

#include "TodoItem.h"

// Classe para tarefas gerais, com descrição e nível de urgência
class Tarefa : public TodoItem {
public:
    // Construtor padrão: cria uma tarefa vazia com urgência baixa
    Tarefa() : TodoItem(), description("") {
        setTipo("tarefa");
    }
    
    // Construtor com parâmetros: inicializa todos os campos da tarefa
    Tarefa(const std::string& task, const std::string& description,
           const std::string& deadline)
        : TodoItem(task, deadline, "tarefa"), 
          description(description) {}
    
    // Copy constructor
    Tarefa(const Tarefa& other)
        : TodoItem(other), 
          description(other.description) {}

    void to_json(nlohmann::json& j) const override;

    // Getters
    std::string getDescription() const { return description; }

    // Setters
    void setDescription(const std::string& d) { description = d; }

private:
    std::string description;
};

#endif