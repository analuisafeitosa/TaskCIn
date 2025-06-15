#ifndef TODOITEM_H
#define TODOITEM_H

#include <string>
#include <iostream>
#include "nlohmann/json.hpp"

// Classe base para todos os tipos de atividades
class TodoItem {
public:
    // Construtor padrão: inicializa uma atividade vazia
    TodoItem() : task(""), deadline(""), tipo(""), completed(false) {}
    
    // Construtor com parâmetros: cria uma atividade com valores específicos
    TodoItem(const std::string& task, const std::string& deadline, 
             const std::string& tipo, bool completed = false)
        : task(task), deadline(deadline), tipo(tipo), completed(completed) {}
    
    // Copy constructor
    TodoItem(const TodoItem& other)
        : task(other.task), deadline(other.deadline),
          tipo(other.tipo), completed(other.completed) {}

    virtual ~TodoItem() = default;
    virtual void to_json(nlohmann::json& j) const = 0;

    // Getters
    std::string getTipo() const { return tipo; }
    std::string getTask() const { return task; }
    std::string getDeadline() const { return deadline; }
    bool isCompleted() const { return completed; }
    bool isImportant() const { return important; }
    bool isUrgent() const { return urgent; }


    // Setters
    void setTipo(const std::string& t) { tipo = t; }
    void setTask(const std::string& t) { task = t; }
    void setDeadline(const std::string& d) { deadline = d; }
    void setCompleted(bool c) { completed = c; }
    void setImportant(bool i) { important = i; }
    void setUrgent(bool u) { urgent = u; }    

protected:
    std::string task;
    std::string deadline;
    std::string tipo;
    bool completed;
    bool important;
    bool urgent;
};

#endif