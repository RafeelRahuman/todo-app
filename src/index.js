import Todo from "./models/Todo.js";
import Project from "./models/Project.js";
import appState from "./store/appState.js"; 
import { render } from "./ui/render.js";
import "./style.css";


window.appState = appState;

if(appState.getProjects().length===0) {
const project1 = new Project("Personal");    

const todo1 = new Todo (
    "Learn Webpack",
    "Understand Config Deeply",
    "2026-03-03",
    "High",
);

project1.addTodo(todo1);
appState.addProject(project1)
}
console.log(appState.getProjects());

render();

document.getElementById("cancelTodo").onclick = () => {
    document.getElementById("todoModal").classList.add("hidden");
};