#include "Prova.h"

// Converte os dados da prova para o formato JSON
void Prova::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},           // Tipo da atividade (prova)
        {"task", getTask()},           // Título da prova
        {"deadline", getDeadline()},   // Data da prova
        {"materia", getMateria()},     // Matéria da prova
        {"completed", isCompleted()},   // Status de conclusão
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}