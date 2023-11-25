import { compareAsc, format } from 'date-fns'
import { EvalSourceMapDevToolPlugin } from 'webpack';
import {project_list,Project, Task} from "./class.js"
import "./dom.js"
import {form} from "./dom.js"

const taskTabs = document.querySelectorAll(".task-view");
const projects = document.getElementById("projects-title");
const task_title = document.querySelector(".task-title");
const tasks = document.getElementById("tasks");
const taskObjects = document.querySelectorAll(".task-object");




taskTabs.forEach( (tab) => {
  tab.addEventListener("click", showAllProjects);
  //add unique event listerner for each kind of tajs
  
});





function showAllProjects(e){
  tasks.innerHTML = "";
  
  let numOfProjects = project_list.length;
  
  if(e.target.id == "AllProjects"){
    
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        populateTasks(currTask,i,j);
      }
    }
  }
  else if(e.target.id == "Today"){
    let date = new Date();
    let today = format(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'yyyy-MM-dd');
    
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        alert(`${currTask.date} -------- ${today}`);
        if (currTask.date == today){
          populateTasks(currTask,i,j);
        }
      }
    }
  }
  else if(e.target.id == "SevenDays"){
    let date = new Date();
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let todayTimeMS = today.getTime();
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        const dueDate = new Date(currTask.date);
        let dueDateTimeMS = dueDate.getTime();
        
        const diffTime = dueDateTimeMS - todayTimeMS;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        alert(diffDays);
        
        if (diffDays >= 0  && diffDays <= 7){
          populateTasks(currTask,i,j);
        }
      }
    } 
  }
  else if(e.target.id == "Priority"){
    let priorityTasks = [];
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        if(currTask.priority != "none"){
          priorityTasks.push(currTask);
        }
      }
    }
    priorityTasks.sort((a,b) => {
      const nameA = a.priority.toUpperCase(); // ignore upper and lowercase
      const nameB = b.priority.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      
      return 0;
    });
    
    priorityTasks.forEach(currTask => {
      populateTasks(currTask,i,j);
    });
  }
  else if(e.target.id == "Complete"){
    
  }
  else if(e.target.id == "Incomplete"){
    
  }
}






export function createTask(){
  
  let currProject = task_title.id;
  
  
  let title = form.elements[0].value;
  let description = form.elements[1].value;
  let due_date = form.elements[2].value;
  let priority = form.elements[3].value;
  project_list[currProject].tasks.push(new_task);

  let taskNum = project_list[currProject].tasks.length - 1;
  
  
  let new_task = new Task(title, description, due_date, priority, false);

  populateTasks(new_task,currProject,taskNum);

  
  
}


function showTasks(e){
  let currProject = e.target.id;
  let numOfTasks = project_list[currProject].tasks.length;
  tasks.innerHTML = "";
  
  for(let i = 0; i < numOfTasks; i++){
    let currTask = project_list[currProject].tasks[i];
    populateTasks(e,currTask, currProject, i);
    
  }
  task_title.textContent = project_list[currProject].name;
  task_title.setAttribute("id",e.target.id);

 
  
}

function populateTasks(currTask, project_num, task_num){
  
  let task = document.createElement("div");
  task.setAttribute("projectNum",project_num);
  task.setAttribute("taskNum",task_num);

  task.classList.add("task-object");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox"
  checkbox.name = "isComplete";
  checkbox.id = "isComplete";

  let label = document.createElement("label");
  label.for = "isComplete";
  label.appendChild(document.createTextNode('Finished?'));


  task.appendChild(checkbox);
  task.appendChild(label);


  let title_dom = document.createElement("div");
  let descr_dom = document.createElement("div");
  let date_dom = document.createElement("div");
  let prior_dom = document.createElement("div");
  
  title_dom.textContent = currTask.title;
  descr_dom.textContent = currTask.description;
  date_dom.textContent = currTask.date;
  prior_dom.textContent = currTask.priority;
  
  
  if(currTask.priority != "none"){
    if(currTask.priority == "high"){
      task.classList.add("high");
    } 
    else if(currTask.priority == "critical"){
      task.classList.add("critical");
    }  
  }

  
  task.appendChild(title_dom);
  task.appendChild(descr_dom);
  task.appendChild(date_dom);
  task.appendChild(prior_dom);



  checkbox.addEventListener("click", completeTask);
  


  
  tasks.appendChild(task);
  
}
function completeTask(event){
alert("hey ya");
  
/*alert(event.target.parentElement.getAttribute("projectNum"));
   if(event.target.checked){
    event.target.parentElement.classList.add("complete");
  }
  else{
    event.target.parentElement.classList.remove("complete");
  }*/
}

//This can be refactored further
export function createProject(){
  let element = document.getElementById("projectInput");
  let proj = new Project(element.value);
  project_list.push(proj);
  
  let newProject = createProjectTab(proj);
  newProject.addEventListener("click", showTasks);
  projects.appendChild(newProject);
  
  
}


function createProjectTab(project){
  let proj = document.createElement("div");
  proj.setAttribute("id", project_list.length - 1);
  proj.textContent = project.name;
  return proj;
}




