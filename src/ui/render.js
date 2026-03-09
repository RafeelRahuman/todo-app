import appState from "../store/appState.js";
import Project from "../models/Project.js";
import Todo from "../models/Todo.js";

export function render(){
    const appDiv = document.getElementById("app");
    const sidebar = document.getElementById("sidebar");

    appDiv.innerHTML = "";
    sidebar.innerHTML = "";
    
    const title = document.createElement("h1");
    title.textContent = "Todo App";

    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Add Project";

    addProjectBtn.addEventListener("click", ()=> {
        const name = prompt("Project name :");
        if(!name) return;

        const newProject = new Project(name);
        appState.addProject(newProject);
        render();
    });

    sidebar.appendChild(title);
    sidebar.appendChild(addProjectBtn);

    appState.getProjects().forEach(project => {

    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const projectName = document.createElement("span");
    projectName.textContent = project.name;
    projectName.style.cursor = "pointer";

    if(project.id === appState.activeProjectId){
        projectName.style.fontWeight = "bold";
    }

    projectName.addEventListener("click", ()=> {
        appState.setActiveProject(project.id);
        render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";

    deleteBtn.addEventListener("click", (e)=> {
        e.stopPropagation();

        const confirmDelete = confirm("Delete this project?");
        if(!confirmDelete) return;

        appState.removeProject(project.id);
        render();
    });

    projectItem.appendChild(projectName);
    projectItem.appendChild(deleteBtn);

    sidebar.appendChild(projectItem);
});

    
    


    const project = appState.getActiveProject();
    if(!project) return;
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `<h2>${project.name}</h2>`;

    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "Add Todo";

    addTodoBtn.addEventListener("click", () => {

    const modal = document.getElementById("todoModal");
    modal.classList.remove("hidden");

    document.getElementById("modalTitle").textContent = "Add Todo";

    document.getElementById("todoTitle").value = "";
    document.getElementById("todoDescription").value = "";
    document.getElementById("todoDueDate").value = "";
    document.getElementById("todoPriority").value = "Low";

    document.getElementById("saveTodo").onclick = () => {

        const title = document.getElementById("todoTitle").value;
        const description = document.getElementById("todoDescription").value;
        const dueDate = document.getElementById("todoDueDate").value;
        const priority = document.getElementById("todoPriority").value;

        if(!title) return;

        const newTodo = new Todo(title, description, dueDate, priority);

        project.addTodo(newTodo);

        appState.save();
        modal.classList.add("hidden");
        render();
    };

});

projectDiv.appendChild(addTodoBtn);



    project.getTodos().forEach(todo => {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-card");
    if (todo.priority === "High") {
    todoDiv.classList.add("high-priority");
} else if (todo.priority === "Medium") {
    todoDiv.classList.add("medium-priority");
} else {
    todoDiv.classList.add("low-priority");
}

    const left = document.createElement("div");
    left.classList.add("todo-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
        todo.toggleCompleted();
        appState.save();
        render();
    });

    const textspan = document.createElement("span");
    textspan.classList.add("todo-title");
    textspan.textContent = todo.title;

    if(todo.completed){
        textspan.style.textDecoration = "line-through";
        textspan.style.opacity = "0.6";
    }

    const priority = document.createElement("span");
    priority.classList.add("priority");

    if(todo.priority === "High"){
        priority.classList.add("high");
    }
    else if(todo.priority === "Medium"){
        priority.classList.add("medium");
    }
    else{
        priority.classList.add("low");
    }

    left.appendChild(checkbox);
    left.appendChild(textspan);
    left.appendChild(priority);

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const dueDate = document.createElement("span");
    dueDate.classList.add("todo-date");

    if(todo.dueDate){
    const date = new Date(todo.dueDate);
    dueDate.textContent = date.toDateString().slice(4);
    }

    actions.appendChild(dueDate);




    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () =>{
        project.removeTodo(todo.id);
        appState.save();
        render();
    });


    const detailBtn = document.createElement("button");
    detailBtn.textContent = "Details";

    detailBtn.addEventListener("click", () => {
        alert(
`Title: ${todo.title}
Description: ${todo.description}
Due Date: ${todo.dueDate}
Priority: ${todo.priority}
Completed: ${todo.completed}`
);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";


    editBtn.addEventListener("click", () => {

    const modal = document.getElementById("todoModal");
    modal.classList.remove("hidden");

    document.getElementById("modalTitle").textContent = "Edit Todo";

    document.getElementById("todoTitle").value = todo.title;
    document.getElementById("todoDescription").value = todo.description;
    document.getElementById("todoDueDate").value = todo.dueDate;
    document.getElementById("todoPriority").value = todo.priority;

    document.getElementById("saveTodo").onclick = () => {

        todo.title = document.getElementById("todoTitle").value;
        todo.description = document.getElementById("todoDescription").value;
        todo.dueDate = document.getElementById("todoDueDate").value;
        todo.priority = document.getElementById("todoPriority").value;

        appState.save();
        modal.classList.add("hidden");
        render();
    };

});

   

    actions.appendChild(detailBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

todoDiv.appendChild(left);
todoDiv.appendChild(actions);

projectDiv.appendChild(todoDiv);

});

    appDiv.appendChild(projectDiv);


}