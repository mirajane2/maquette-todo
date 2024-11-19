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
    if (edition && editingRow) {
        // Mode édition : mettre à jour sur le serveur
        const taskId = editingRow.dataset.id;

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT', // Pour mettre à jour la tâche
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            // Mettre à jour la ligne du tableau
            editingRow.cells[0].textContent = name;
            editingRow.cells[1].textContent = description;
            editingRow.cells[2].textContent = category;
            editingRow.cells[3].textContent = `${date} ${time}`;
            editingRow.cells[4].textContent = priority;
            editingRow.cells[5].textContent = `${fulfillment}%`;

            edition = false;
            editingRow = null;
        } else {
            console.error("Failed to update task:", response.status);
        }
    } else {
        // Mode ajout : ajouter sur le serveur
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            const task = await response.json(); // Récupère la tâche avec son ID
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
            table.appendChild(newRow);
        } else {
            console.error("Failed to add task:", response.status);
        }
    }
} catch (error) {
    console.error("Error while saving the task:", error);
}

// Nettoyer le formulaire après ajout ou modification
document.getElementById('name').value = '';
document.getElementById('description').value = '';
document.getElementById('category').value = '';
document.getElementById('taskDate').value = '';
document.getElementById('taskTime').value = '';
document.getElementById('taskPriority').value = '';
document.getElementById('taskFulfillment').value = '';

formContainer.style.display = 'none';
main.style.display = 'block';
});

table.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        const taskId = row.dataset.id
        

        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' });
            
            if (response.ok) {
                console.log(`Task with ID ${taskId} deleted successfully`);
                row.remove(); 
            } else {
                console.error(`Failed to delete task with ID ${taskId}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error while deleting the task:", error);
        }
    }
});

table.addEventListener('click', (event) => {
    if(event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const cells = row.children;
        document.getElementById('name').value = cells[0].textContent;
        document.getElementById('description').value = cells[1].textContent;
        document.getElementById('category').value = cells[2].textContent;
        document.getElementById('taskDate').value = cells[3].textContent.split(' ')[0];
        document.getElementById('taskTime').value = cells[3].textContent.split(' ')[1] || '';
        document.getElementById('taskPriority').value = cells[4].textContent.toLowerCase();
        document.getElementById('taskFulfillment').value = cells[5].textContent.replace('%', '');

        edition = true;  
        editingRow = row;

        main.style.display = 'none';
        formContainer.style.display = 'flex';
    }
    
})
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