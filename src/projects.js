import {Project, project_list} from "./class.js"
import { showTasks } from "./index.js";

export const projects = document.getElementById("projectsContainer");

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

    let newProjectTab = document.createElement("div");
    newProjectTab.classList.add("projectTab");
    let projectName = document.createElement("div");
    projectName.setAttribute("id", project_list.length - 1);
    projectName.classList.add("projectName");
    projectName.textContent = project.name;
    newProjectTab.appendChild(projectName);

    let action = document.createElement("div"); 
    action.classList.add("action");
  
    let editProject = document.createElement("div");
    let editGraphic = document.createElement("img");
    editGraphic.src = "../dist/images/edit.png";
    editGraphic.style.height = "20px";
    editGraphic.style.width = "20px";
    editProject.appendChild(editGraphic);
  
    let deleteProject = document.createElement("div");
    let deleteGraphic = document.createElement("img");
    deleteGraphic.src = "../dist/images/delete.png";
    deleteGraphic.style.height = "20px";
    deleteGraphic.style.width = "20px";
    deleteProject.appendChild(deleteGraphic);
  
  
    //Project edit option 
    editProject.addEventListener("click", (e) => {
        if(document.querySelectorAll(".editProject").length == 1){
            return;
        
          }
        e.stopPropagation();
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
        newProjectTab.appendChild(editProjectForm);
      
        rename.addEventListener("click", (e) => 
        {
          e.stopPropagation();
          renameThis(editProjectForm,newProjectTab,projectName,input)})
      
          cancel.addEventListener("click", (e) => 
        {
          e.stopPropagation();
          editProjectForm.reset();
          newProjectTab.removeChild(editProjectForm);
        })
        
    })


    //Project delete Option
    deleteProject.addEventListener("click", (e) => {
      
      e.stopPropagation();
      projects.removeChild(newProjectTab);
      let currentProjects = projects.querySelectorAll(".projectName");
    
      project_list.splice(projectName.id,1);
  
      alert(project_list.length);
  
      for(let i = 0; i < project_list.length; i++){
          currentProjects[i].id = i;
      }
  
      return;
    });

    
    action.appendChild(editProject);
    action.appendChild(deleteProject);
  
    newProjectTab.appendChild(action);

  
  
    return newProjectTab;
  }
  
  
  
  
  
  function renameThis(form, project, projectName,input){
    if(input.value){
    projectName.textContent = input.value;
    project_list[projectName.id].name = input.value;
    form.reset();
    project.removeChild(form);
    }
  }
  
