import {addTask,pageOpener} from './home.js'
import {project_list,Project, Task} from "./class.js"
import{projects} from "./projects.js"
import "./dom.js"
import {dialog2,dialog3, form, form2} from "./dom.js"


let projectNumber_
let taskNumber_
let domHolder


const projectTitle = document.querySelector(".projectTitle");
export const tasks = document.getElementById("tasks");


let shift = document.getElementById("shift");
let sidebar = document.querySelector(".sidebar");

shift.addEventListener("click", (e) => {
  sidebar.classList.toggle("hidden");
})

pageOpener();




export function createTask(){
  
  let currProject = projectTitle.id;
  
  
  let title = form.elements[0].value;
  let description = form.elements[1].value;
  let due_date = form.elements[2].value;
  let priority = form.elements[3].value;
  let new_task = new Task(title, description, due_date, priority, false);
  project_list[currProject].tasks.push(new_task);

  let taskNum = project_list[currProject].tasks.length - 1;
  

  populateTasks(new_task,currProject,taskNum);

}

export function modifyTask(){
  let task = project_list[projectNumber_].tasks[taskNumber_];

  let title = domHolder.querySelector(".title");
  let dueDate = domHolder.querySelector(".date");

  task.title = form2.elements[0].value;
  task.description = form2.elements[1].value;
  task.date = dueDate.textContent = form2.elements[2].value;
  task.priority = form2.elements[3].value;

  title.textContent = form2.elements[0].value;
  dueDate.textContent = form2.elements[2].value;

  domHolder.classList.remove(priority.textContent);
  domHolder.classList.add(form2.elements[3].value);


  }






export function showTasks(e){
  addTask.classList.remove("hidden");
  
  let currProject = e.target.id;


  let numOfTasks = project_list[currProject].tasks.length;
  tasks.innerHTML = "";
  
  for(let i = 0; i < numOfTasks; i++){
    let currTask = project_list[currProject].tasks[i];
    populateTasks(currTask, currProject, i);
  
  }


  projectTitle.textContent = project_list[currProject].name;
  projectTitle.setAttribute("id",e.target.id);
  
}

export function populateTasks(currTask, project_num, task_num){
  
  let task = document.createElement("div");
  task.setAttribute("projectNum",project_num);
  task.setAttribute("taskNum",task_num);

 
  task.classList.add("task-object");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox"
  checkbox.name = "isComplete";
  checkbox.id = "isComplete";



  if(currTask.isComplete == true){
      task.classList.add("complete");
      checkbox.checked = true;
  }



  let title_dom = document.createElement("div");
  title_dom.classList.add("title");
 
  let date_dom = document.createElement("div");
  date_dom.classList.add("date");
  
  title_dom.textContent = currTask.title;
  date_dom.textContent = currTask.date;
  
  
  if(currTask.priority != "none"){
    if(currTask.priority == "high"){
      task.classList.add("high");
    } 
    else if(currTask.priority == "critical"){
      task.classList.add("critical");
    }  
  }

  let modifyTask = document.createElement("div");
  modifyTask.classList.add("modify");

  let viewOption = document.createElement("div");
  let viewGraphic = document.createElement("img");
  viewGraphic.src = "../dist/images/eye.png";
 
  viewOption.appendChild(viewGraphic);

  let editOption = document.createElement("div");
  let editGraphic = document.createElement("img");
  editGraphic.src = "../dist/images/edit.png";
 
  editOption.appendChild(editGraphic);

  let deleteOption = document.createElement("div");
  let deleteGraphic = document.createElement("img");
  deleteGraphic.src = "../dist/images/delete.png";

  deleteOption.appendChild(deleteGraphic);

  modifyTask.appendChild(viewOption);
  modifyTask.appendChild(editOption);
  modifyTask.appendChild(deleteOption);

  let checkTitleContainer = document.createElement("div");
  checkTitleContainer.classList.add("check-title");
  checkTitleContainer.appendChild(checkbox);
  checkTitleContainer.appendChild(title_dom);

  task.appendChild(checkTitleContainer);
  task.appendChild(date_dom);
  task.appendChild(modifyTask);
  


  viewOption.addEventListener("click", viewTask);
  editOption.addEventListener("click", openEditTask)
  deleteOption.addEventListener("click", deleteTask);
  checkbox.addEventListener("click", completeTask);
  


  
  tasks.appendChild(task);
  
}

export function viewTask(event){

  
  let i = event.target.parentElement.parentElement.parentElement.getAttribute("projectNum");
  let j = event.target.parentElement.parentElement.parentElement.getAttribute("taskNum");



  let title = document.getElementById("title-view");
  let descr = document.getElementById("description-view");
  let date = document.getElementById("date-view");
  let priority = document.getElementById("priority-view");
  
  title.textContent = project_list[i].tasks[j].title;
  descr.textContent = project_list[i].tasks[j].description;
  date.textContent = project_list[i].tasks[j].date;
  priority.textContent = project_list[i].tasks[j].priority;


  dialog3.showModal();

}

export function openEditTask(event){
  projectNumber_ = event.target.parentElement.parentElement.parentElement.getAttribute("projectNum");
  taskNumber_ = event.target.parentElement.parentElement.parentElement.getAttribute("taskNum");
  domHolder = event.target.parentElement.parentElement.parentElement;

  dialog2.showModal();
}

export function deleteTask(event){

  projectNumber_ = event.target.parentElement.parentElement.parentElement.getAttribute("projectNum");
  taskNumber_ = event.target.parentElement.parentElement.parentElement.getAttribute("taskNum");

  tasks.removeChild(event.target.parentElement.parentElement.parentElement);
  project_list[projectNumber_].tasks.splice(taskNumber_,1);

}



export function completeTask(event){
  
  let i = event.target.parentElement.parentElement.getAttribute("projectNum");
  let j = event.target.parentElement.parentElement.getAttribute("taskNum");
   if(event.target.checked){
    event.target.parentElement.parentElement.classList.add("complete");
    project_list[i].tasks[j].isComplete = true;
  }
  else{
    event.target.parentElement.parentElement.classList.remove("complete");
    project_list[i].tasks[j].isComplete = false;
  }


}

//This can be refactored further
export function createProject(){
  let element = document.getElementById("projectInput");
  let project = new Project(element.value);
  project_list.push(project);


  
  let newProjectTab = createProjectTab(project);
  let projectName = newProject.querySelector(".projectName");
  projectName.addEventListener("click", showTasks);
  projects.appendChild(newProjectTab);
  
  
}





