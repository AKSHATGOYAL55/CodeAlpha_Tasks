
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let statusInput = document.getElementById("statusInput");
    let taskText = taskInput.value.trim();
    let statusText = statusInput.value;
    if (taskText === "") return;

    let taskList = document.getElementById(
        statusText === "To-Do" ? "todoList" :
        statusText === "In Progress" ? "progressList" :
        statusText === "Incomplete" ? "incompleteList" : "completeList"
    );
    let taskIndex = taskList.children.length + 1;

    let li = document.createElement("li");
    li.innerHTML = `<span class='task-text'>${taskIndex}. ${taskText}</span> <div class='btn-group'><button class='edit' onclick='editTask(this)'>Edit</button> <button class='delete' onclick='removeTask(this)'>X</button></div>`;
    
    taskList.appendChild(li);
    taskInput.value = "";
}

function removeTask(btn) {
    let taskLi = btn.closest("li");
    let taskList = taskLi.parentNode;
    taskLi.remove();
    updateTaskIndex(taskList);
}

function editTask(btn) {
    let taskLi = btn.closest("li");
    let taskText = taskLi.querySelector(".task-text");
    let taskIndex = taskText.textContent.split(". ")[0];
    let newTaskText = prompt("Edit your task:", taskText.textContent.split(". ")[1]);
    let newStatus = prompt("Update Status (To-Do, In Progress, Incomplete, Complete):");
    
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskText.textContent = `${taskIndex}. ${newTaskText}`;
    }
    
    if (newStatus !== null && ["To-Do", "In Progress", "Incomplete", "Complete"].includes(newStatus.trim())) {
        let newList = document.getElementById(
            newStatus === "To-Do" ? "todoList" :
            newStatus === "In Progress" ? "progressList" :
            newStatus === "Incomplete" ? "incompleteList" : "completeList"
        );
        newList.appendChild(taskLi);
        updateTaskIndex(newList);
    }
}

function updateTaskIndex(list) {
    Array.from(list.children).forEach((li, index) => {
        let taskText = li.querySelector(".task-text");
        let taskContent = taskText.textContent.split(". ")[1];
        taskText.textContent = `${index + 1}. ${taskContent}`;
    });
}
