#include "../include/Tarefa.h"

// Converte os dados da tarefa para o formato JSON
void Tarefa::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},              // Tipo da atividade (tarefa)
        {"task", getTask()},              // Título da tarefa
        {"description", getDescription()},// Descrição da tarefa
        {"deadline", getDeadline()},      // Prazo da tarefa
        {"completed", isCompleted()},      // Status de conclusão
        {"important", isImportant()},      // Importancia
        {"urgent", isUrgent()}          // Urgencia
    };
}