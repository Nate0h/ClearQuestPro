
import {createTask, createProject} from "./index.js"
const addProject = document.getElementById('add-project');
const projectForm = document.getElementById("project-form");
const cancel = document.getElementById('cancel');
const add = document.getElementById('add');


addProject.addEventListener("click", function(){
    projectForm.classList.remove("hidden");
  })
  
  
  cancel.addEventListener("click", function(){
    projectForm.reset();
    projectForm.classList.add("hidden");
  })
  
  add.addEventListener("click", function(){
    if(projectForm.elements[0].value){
    createProject();
    projectForm.reset();
    projectForm.classList.add("hidden");
    }
  });

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".show-modal");
const closeButton = document.querySelector("dialog button");
export const form = document.querySelector(".form-container");

showButton.addEventListener("click", () => {
  dialog.showModal();
});


// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  form.reset();
});


form.addEventListener("submit", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  createTask();
   // Have to send the select box value here.
  dialog.close();
  form.reset();
});


export * from "./dom.js"