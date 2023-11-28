import {format } from 'date-fns'
import { divide } from 'lodash'
import {project_list,Project, Task} from "./class.js"
import "./dom.js"
import { dialog, dialog2, form, form2,showButton} from "./dom.js"

let projectNumber_
let taskNumber_
let domHolder


const taskTabs = document.querySelectorAll(".task-view");
const projects = document.getElementById("projects-title");
const task_title = document.querySelector(".task-title");
const tasks = document.getElementById("tasks");
let x = document.querySelector(".show-modal");
const taskObjects = document.querySelectorAll(".task-object");

let shift = document.getElementById("shift");
let sidebar = document.querySelector(".sidebar");

shift.addEventListener("click", (e) => {
  sidebar.classList.toggle("hidden");
})
pageOpener();

taskTabs.forEach( (tab) => {
  tab.addEventListener("click", showAllProjects);
  //add unique event listerner for each kind of tajs
  
});



function pageOpener(){
  
  x.classList.add("hidden");
 // showButton.classList.add("hidden");
  task_title.textContent = "AllProjects";
  let numOfProjects = project_list.length;


  for (let i = 0; i < numOfProjects; i++){
    let numOfTasks = project_list[i].tasks.length;
    
    for (let j = 0; j < numOfTasks; j++){
      let currTask = project_list[i].tasks[j];
      populateTasks(currTask,i,j);
    }
  }
}




function showAllProjects(e){
  x.classList.add("hidden");
  //alert("bith");
  tasks.innerHTML = "";
  task_title.textContent = e.target.id;
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

    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        if(currTask.priority != "none"){
          populateTasks(currTask,i,j);
        }
      }
    }
  }
  else if(e.target.id == "Complete"){
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        alert(currTask.isComplete);
        if(currTask.isComplete){
        populateTasks(currTask,i,j);
        }
      }
    }
    
  }
  else if(e.target.id == "Incomplete"){
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        alert(currTask.isComplete);
        if(!currTask.isComplete){
        populateTasks(currTask,i,j);
        }
      }
    }
  }
  else if(e.target.id == "PastDue"){
    let date = new Date();
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let todayTimeMS = today.getTime();
    for (let i = 0; i < numOfProjects; i++){
      let numOfTasks = project_list[i].tasks.length;
      
      for (let j = 0; j < numOfTasks; j++){
        let currTask = project_list[i].tasks[j];
        const dueDate = new Date(currTask.date);
        let dueDateTimeMS = dueDate.getTime();
        
        
        if (todayTimeMS > dueDateTimeMS){
          populateTasks(currTask,i,j);
        }
      }
    } 
  }

}






export function createTask(){
  
  let currProject = task_title.id;
  
  
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
  let description = domHolder.querySelector(".description");
  let dueDate = domHolder.querySelector(".date");
  let priority = domHolder.querySelector(".priority");

  task.title = form2.elements[0].value;
  task.description = form2.elements[1].value;
  task.date = dueDate.textContent = form2.elements[2].value;
  task.priority = form2.elements[3].value;

  title.textContent = form2.elements[0].value;
  description.textContent = form2.elements[1].value;
  dueDate.textContent = form2.elements[2].value;

  domHolder.classList.remove(priority.textContent);
  domHolder.classList.add(form2.elements[3].value);
  priority.textContent = form2.elements[3].value;


  }






function showTasks(e){
  x.classList.remove("hidden");
  
  let currProject = e.target.id;

  let num = 0;

  alert(e.target.id);
  let numOfTasks = project_list[currProject].tasks.length;
  tasks.innerHTML = "";
  
  for(let i = 0; i < numOfTasks; i++){
    let currTask = project_list[currProject].tasks[i];
    populateTasks(currTask, currProject, i);
    num++;
  }

 // let existingProjects = projects.querySelectorAll(".projectName");
  

  task_title.textContent = project_list[currProject].name;
  task_title.setAttribute("id",e.target.id);

 
  
}

function populateTasks(currTask, project_num, task_num){
  
  let task = document.createElement("div");
  task.setAttribute("projectNum",project_num);
  task.setAttribute("taskNum",task_num);

 
  task.classList.add("task-object");
  let checkbox = document.createElement("input");
  checkbox.classList.add("taskComplete");
  checkbox.type = "checkbox"
  checkbox.name = "isComplete";
  checkbox.id = "isComplete";

  let label = document.createElement("label");
  label.for = "isComplete";

  if(currTask.isComplete == true){
      task.classList.add("complete");
      checkbox.checked = true;
  }
  label.appendChild(document.createTextNode('Finished?'));


  task.appendChild(checkbox);
  task.appendChild(label);


  let title_dom = document.createElement("div");
  title_dom.classList.add("title");
  let descr_dom = document.createElement("div");
  descr_dom.classList.add("description");
  let date_dom = document.createElement("div");
  date_dom.classList.add("date");
  let prior_dom = document.createElement("div");
  prior_dom.classList.add("priority");
  
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

  let editOption = document.createElement("div");
  let editGraphic = document.createElement("img");
  editGraphic.src = "../dist/images/threelines.svg";
  editGraphic.style.height = "20px";
  editGraphic.style.width = "20px";
  editOption.appendChild(editGraphic);

  let deleteOption = document.createElement("div");
  let deleteGraphic = document.createElement("img");
  deleteGraphic.src = "../dist/images/threelines.svg";
  deleteGraphic.style.height = "20px";
  deleteGraphic.style.width = "20px";
  deleteOption.appendChild(deleteGraphic);

  task.appendChild(title_dom);
  task.appendChild(descr_dom);
  task.appendChild(date_dom);
  task.appendChild(prior_dom);
  task.appendChild(editOption);
  task.appendChild(deleteOption);


  editOption.addEventListener("click", openEditTask)
  deleteOption.addEventListener("click", deleteTask);
  checkbox.addEventListener("click", completeTask);
  


  
  tasks.appendChild(task);
  
}

function openEditTask(event){
  projectNumber_ = event.target.parentElement.parentElement.getAttribute("projectNum");
  taskNumber_ = event.target.parentElement.parentElement.getAttribute("taskNum");
  domHolder = event.target.parentElement.parentElement;

  dialog2.showModal();
}

function deleteTask(event){

  projectNumber_ = event.target.parentElement.parentElement.getAttribute("projectNum");
  taskNumber_ = event.target.parentElement.parentElement.getAttribute("taskNum");

  tasks.removeChild(event.target.parentElement.parentElement);
  project_list[projectNumber_].tasks.splice(taskNumber_,1);

}





function completeTask(event){
  
let i = event.target.parentElement.getAttribute("projectNum");
let j = event.target.parentElement.getAttribute("taskNum");
   if(event.target.checked){
    event.target.parentElement.classList.add("complete");
    project_list[i].tasks[j].isComplete = true;
  }
  else{
    event.target.parentElement.classList.remove("complete");
    project_list[i].tasks[j].isComplete = false;
  }

  //alert(project_list[i].tasks[j].isComplete);
}

//This can be refactored further
export function createProject(){
  let element = document.getElementById("projectInput");
  let proj = new Project(element.value);
  project_list.push(proj);


  
  let newProject = createProjectTab(proj);
  let projectName = newProject.querySelector(".projectName");
  projectName.addEventListener("click", showTasks);
  projects.appendChild(newProject);
  
  
}


function createProjectTab(project){
  let proj = document.createElement("div");
  let projName = document.createElement("div");
  projName.setAttribute("id", project_list.length - 1);
  projName.classList.add("projectName");
  projName.textContent = project.name;
  proj.appendChild(projName);

  let editProject = document.createElement("div");
  let editGraphic = document.createElement("img");
  editGraphic.src = "../dist/images/threelines.svg";
  editGraphic.style.height = "20px";
  editGraphic.style.width = "20px";
  editProject.appendChild(editGraphic);

  let deleteProject = document.createElement("div");
  let deleteGraphic = document.createElement("img");
  deleteGraphic.src = "../dist/images/threelines.svg";
  deleteGraphic.style.height = "20px";
  deleteGraphic.style.width = "20px";
  deleteProject.appendChild(deleteGraphic);


  editProject.addEventListener("click", editProjectTab)
  deleteProject.addEventListener("click", (e) => {
    
    e.stopPropagation();
    projects.removeChild(proj);
    let existingProjects = projects.querySelectorAll(".projectName");
    //deleteProjectTab(projName.id);
    alert(existingProjects.length);
    project_list.splice(projName.id,1);

    alert(project_list.length);

    for(let i = 0; i < project_list.length; i++){

      existingProjects[i].id = i;
      alert(`Project Name: ${existingProjects[i].name} ---------- New Project ID: ${existingProjects[i].id}`);
    }

    return;
  });
  




  proj.appendChild(editProject);
  proj.appendChild(deleteProject);


  return proj;
}

function editProjectTab(event){
  if(document.querySelectorAll(".editProject").length == 1){
    return;

  }

  event.stopPropagation();
  let project = event.target.parentElement.parentElement;
  let projectName = project.querySelector(".projectName");
  let editProjectForm = document.createElement("form");
  editProjectForm.classList.add("editProject");

let inputNewProjectContainer = document.createElement("div");
  let input = document.createElement("input");
  input.required = true;
  input.type = "text";

  let formButtons = document.createElement("div");
  let rename = document.createElement("input");
  rename.type = "button";
  rename.value = "Rename"
  let cancel = document.createElement("input");
  cancel.type = "button";
  cancel.value = "cancel";
  formButtons.appendChild(rename);
  formButtons.appendChild(cancel);

input.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
})
  inputNewProjectContainer.appendChild(input);
  inputNewProjectContainer.appendChild(formButtons);

  editProjectForm.appendChild(inputNewProjectContainer);
  event.target.parentElement.parentElement.appendChild(editProjectForm);

  rename.addEventListener("click", (e) => 
  {
    e.stopPropagation()
    renameThis(editProjectForm,project,projectName,input)})

    cancel.addEventListener("click", (e) => 
  {
    //e.stopPropagation()
    editProjectForm.reset();
    project.removeChild(editProjectForm)
    //editProjectForm.classList.add("hidden");
  })


}




function renameThis(form, project, projectName,input){
  if(input.value){
  projectName.textContent = input.value;
  project_list[projectName.id].name = input.value;
  form.reset();
  project.removeChild(form);
  }
 
  //alert(proj.id);
}

function deleteProjectTab(id){
  alert(id);
}



