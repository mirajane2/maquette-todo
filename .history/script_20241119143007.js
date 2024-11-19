const form = document.getElementById('formulaire');
const formContainer = document.querySelector('.form-container');
const main = document.querySelector('.container');
const save = document.getElementById('enregistrer');
const suppr = document.getElementById('supprimer');
const table = document.querySelector('.valeur');
const taskList = document.getElementById('taskList');

let edition = false;  
let editingRow = null;


form.addEventListener('click', () => {
    main.style.display = 'none';
    formContainer.style.display = 'flex';
    edition = false;
});

suppr.addEventListener('click', () => {
    formContainer.style.display = 'none';
    main.style.display = 'block';
});

save.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    const priority = document.getElementById('taskPriority').value;
    const fulfillment = document.getElementById('taskFulfillment').value;

    if (name.trim() === '') {
        alert('Please enter a task name.');
        return;
    }

    const taskData = {
        name, 
        description,
        category, 
        date, 
        time, 
        priority, 
        fulfillment 
    };

    try {
        if(edition && editingRow) {
            const taskId = editingRow.dataset.id
        }
    }
async function fetchAndDisplayTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tasks = await response.json();

        taskList.innerHTML = '';

        tasks.forEach(task => {
            const newRow = document.createElement('tr');
            newRow.dataset.id = task.id;
            newRow.innerHTML = `
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.category}</td>
                <td>${task.date} ${task.time}</td>
                <td>${task.priority}</td>
                <td>${task.fulfillment}%</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">delete</button>
                </td>
            `;
            taskList.appendChild(newRow);
        });
    } catch (error) {
        console.error('err');
    }
}
document.getElementById('enregistrer').addEventListener('click', () => {
    const newTask = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        date: document.getElementById('taskDate').value,
        time: document.getElementById('taskTime').value,
        priority: document.getElementById('taskPriority').value,
        fulfillment: document.getElementById('taskFulfillment').value
    };

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    })
    })