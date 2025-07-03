#include "../include/Relatorio.h"

// Converte os dados do relatório para o formato JSON
void Relatorio::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},               // Tipo da atividade (relatório)
        {"task", getTask()},               // Título do relatório
        {"deadline", getDeadline()},       // Prazo do relatório
        {"materia", getMateria()},         // Matéria do relatório
        {"plataforma", getPlataforma()},   // Plataforma de entrega
        {"completed", isCompleted()},       // Status de conclusão
        {"important", isImportant()},
        {"urgent", isUrgent()}
    };
}