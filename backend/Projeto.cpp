#include "Projeto.h"

// Converte os dados do projeto para o formato JSON
void Projeto::to_json(nlohmann::json& j) const {
    j = nlohmann::json{
        {"tipo", getTipo()},                // Tipo da atividade (projeto)
        {"task", getTask()},                // Título do projeto
        {"deadline", getDeadline()},        // Prazo do projeto
        {"materia", getMateria()},          // Matéria do projeto
        {"complexidade", getComplexidade()},// Nível de complexidade
        {"completed", isCompleted()}        // Status de conclusão
    };
}