#ifndef TODOITEM_H
#define TODOITEM_H

#include <string>
#include "nlohmann/json.hpp"

class TodoItem {
public:
    std::string tipo;
    std::string task;
    std::string deadline;
    bool completed;

    TodoItem();
    virtual ~TodoItem() = default;
    virtual void to_json(nlohmann::json& j) const = 0;
};

#endif