const toDos = {
    list: [],

    addToDos(title, completed = false) {
        const newToDo = {
            id: Math.random(),
            title,
            completed,
        };
        this.list.unshift(newToDo);
        this.setToDos()
    },
    setToDos() {
        const toDos = this.list
        localStorage.setItem("toDos", JSON.stringify(toDos))
    },
    removeToDo(ToDoId) {
        this.list = this.list.filter(({id}) => id !== ToDoId)
        this.setToDos()
    },
    getToDos() {
        this.list = JSON.parse(localStorage.getItem("toDos"))
    },
    completeToDo(ToDoId) {
        for (let elem of toDos.list) {
            if (elem.id === ToDoId) {
                elem.completed = true
            }
        }
        this.setToDos()
    }
}

const ToDosTemplate = {
    template: document.querySelector(".main"),

    renderToDos() {
        toDos.getToDos()
        this.template.innerHTML = null;

        if (toDos.list.length === 0) {
            const h3 = document.createElement("h3");
            h3.textContent = "Список пуст";
            return this.template.append(h3);
        }

        const ul = document.createElement("ul");

        this.template.append(ul);

        toDos.list.forEach((toDo) => {
            if (toDo.completed === true) {
                ul.innerHTML += `
                 <li id = ${toDo.id}>
                    <input class="completedCheck" type="checkbox" checked disabled id ="check"> 
                    <label for="check"></label>
                    <p>
                         ${toDo.title}
                    </p>
                    <div>
                         <button class="completeBtn" type="button" data-toComplete-id='${toDo.id}'></button>
                         <button class="editBtn" type="button" data-toEdit-id='${toDo.id}'></button>
                         <button class="deleteBtn" type="button" data-toDelete-id='${toDo.id}'></button>
                    </div>
                 </li>
            `;
            } else {
                ul.innerHTML += `
                 <li id = ${toDo.id}>
                    <input class="completedCheck" type="checkbox" id="check"> 
                    <label for="check"></label>
                    <p>
                         ${toDo.title}
                    </p>
                    <div>
                         <button class="completeBtn" type="button" data-toComplete-id='${toDo.id}'></button>
                         <button class="editBtn" type="button" data-toEdit-id='${toDo.id}'></button>
                         <button class="deleteBtn" type="button" data-toDelete-id='${toDo.id}'></button>
                    </div>
                 </li>
            `;
            }
        });
    },
    removeToDos() {
        this.template.addEventListener("click", (e) => {
            const toDoId = e.target.getAttribute("data-toDelete-id");
            if (toDoId) {
                toDos.removeToDo(Number(toDoId));
                this.renderToDos();
            }
        });
    },

    completeToDos() {
        this.template.addEventListener("click", (e) => {
            const toDoId = e.target.getAttribute("data-toComplete-id");
            if (toDoId) {
                toDos.completeToDo(Number(toDoId));
                this.renderToDos();
            }
        });
    },


    init() {
        this.renderToDos();
        this.removeToDos();
        this.completeToDos()

    },

};

const title = document.querySelector(".toDoTitle")
const addButton = document.querySelector(".newToDo")

addButton.addEventListener("click", (event) => {
    if (title.value) {
        toDos.addToDos(title.value)
        ToDosTemplate.renderToDos()
        title.value = ''
    } else {
        alert("Input title")
    }
    event.preventDefault()


});

ToDosTemplate.init()
