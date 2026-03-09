import Project from "../models/Project.js";
import Todo from "../models/Todo.js";

class AppState {

    constructor(){
        this.projects = [];
        this.activeProjectId = null;
        this.load();
    }

    addProject(project){
        this.projects.push(project);

        if(!this.activeProjectId){
            this.activeProjectId = project.id;
        }
        this.save();
    }
    
    removeProject(id){
    this.projects = this.projects.filter(p => p.id !== id);

    if(this.activeProjectId === id){
        this.activeProjectId = this.projects.length
        ? this.projects[0].id
        : null;
    }

    this.save();
}

    getActiveProject(){

        return this.projects.find(p=> p.id === this.activeProjectId)

    }

    setActiveProject(id){
        this.activeProjectId = id;
        this.save();
    }

    getProjects(){
        return this.projects;
    }

    save() {
        localStorage.setItem("todoApp", JSON.stringify({
            projects : this.projects,
            activeProjectId : this.activeProjectId
        }));

    }

    load() {
        const data = localStorage.getItem("todoApp");
        if(!data) return;

        const parsed = JSON.parse(data);

        if(!parsed.projects) return;

        this.activeProjectId = parsed.activeProjectId;

        this.projects = parsed.projects.map(projectData => {
            const project = new Project (projectData.name);
            project.id = projectData.id;

            projectData.todos.forEach(todoData => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority
                );

                todo.id = todoData.id;
                todo.completed = todoData.completed;

                project.addTodo(todo);  
                
            });
            return project;

        });

    //     if(!Array.isArray(parsed)) return;

    //     this.projects = parsed.filter(projectData => projectData && projectData.name)
    //     .map(projectData => {
    //         const project = new Project(projectData.name);
    //         project.id = projectData.id;

    //         if(Array.isArray(projectData.todos)){
    //         projectData.todos.forEach(todoData => {
    //             const todo = new Todo(
    //                 todoData.title,
    //                 todoData.description,
    //                 todoData.duedate,
    //                 todoData.priority
    //             );

    //             todo.id = todoData.id;
    //             todo.completed = todoData.completed;

    //             project.addTodo(todo);  
                
    //         });
    //     }

    //         return project;
    //     });
     }
}

export default new AppState();