
import {format} from 'date-fns'
import  { tasks, populateTasks} from "./index.js"
import {project_list} from "./class.js"
const homeTabs = document.querySelectorAll(".home div");
const homeTabTitle = document.querySelector(".projectTitle");
export const addTask = document.querySelector(".addTask");


homeTabs.forEach( (tab) => {
    tab.addEventListener("click", showAllProjects);
    
  });

  homeTabs.forEach( (tab) => { tab.addEventListener("click", function(event){
      let prevDiv = document.querySelector('.selected');
      if(prevDiv){
        prevDiv.classList.remove('selected');
      }
      event.target.parentNode.classList.add("selected"); 
    });
     });


export function pageOpener(){
  
    addTask.classList.add("hidden");
    homeTabTitle.textContent = "All Projects";
    
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
    addTask.classList.add("hidden");
    tasks.innerHTML = "";
    homeTabTitle.textContent = e.target.id;
    let numOfProjects = project_list.length;
    
    if(e.target.id == "All Projects"){
      
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
          if (currTask.date == today){
            populateTasks(currTask,i,j);
          }
        }
      }
  
    }
    else if(e.target.id == "Due In Seven Days"){
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
          if(!currTask.isComplete){
          populateTasks(currTask,i,j);
          }
        }
      }
    }
    else if(e.target.id == "Past Due"){
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
  