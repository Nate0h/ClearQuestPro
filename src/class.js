import {projects} from "./projects.js" 

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

export function createProject(){
    let element = document.getElementById("projectInput");
    let project = new Project(element.value);
    project_list.push(project);
  
  
    
    let newProjectTab = createProjectTab(project);
    let projectName = newProject.querySelector(".projectName");
    projectName.addEventListener("click", showTasks);
    projects.appendChild(newProjectTab);
    
    
  }
  

export {project_list, Project, Task};