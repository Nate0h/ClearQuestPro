 let project_list = [];

 
 class Project {

    constructor(name){
        this.name = name;
        this.tasks = [];
    }
}

class Task {
    constructor(title,description, date, priority, isComplete){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isComplete = isComplete;
    }
}

export {project_list, Project, Task};