#ifndef TODO_STORAGE_H
#define TODO_STORAGE_H

#include <string>
#include <vector>

struct TodoItem {
    std::string task;
    std::string description;
    std::string deadline;
    std::string urgency;
    bool completed;
};

class TodoStorage {
public:
    TodoStorage(const std::string& filename);
    void loadTodos();
    void saveTodos();
    void addTodo(const TodoItem& item);
    void editTodo(int index, const TodoItem& item);
    void removeTodo(int index);
    const std::vector<TodoItem>& getTodos() const;

private:
    std::string filename;
    std::vector<TodoItem> todos;
};

#endif // TODO_STORAGE_H