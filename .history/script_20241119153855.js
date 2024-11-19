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
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(taskData),
            })

            if(response.ok) {
                edition = false;
                editingRow = null;
                fetchAndDisplayTasks();
            }
            else {
                console.error('Echec de la mise ja jour', response.status);
            }
        }
        else {
            const response = await fetch(`http://localhost:3000/tasks`, {
                method: 'POST',
                headers : {'Content-Type' :  'application/json'},
                body : JSON.stringify(taskData),
            });
            if(response.ok) {
                fetchAndDisplayTasks();
            }
            else {
                console.error("echec de l'ajout de tache");
            }
        }
    }catch(error) {
        console.error('Erreru de enregistrement de la tache', error);
    }
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('taskPriority').value = '';
    document.getElementById('taskFulfillment').value = '';

    formContainer.style.display = 'none';
    main.style.display = 'block';
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
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {method: 'DELETE'});
        if(response.ok) {
            console.log('tache supprimé avec succes')
            fetchAndDisplayTasks();
        }
    }
    catch(error) {
        console.error('erreur lors de la suppression ', error)
    }
}
function editTask(row) {
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

table.addEventListener('click', (event) => {
    if(event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
        const taskId = row.dataset.id;
        deleteTask(taskId);
    }

    if(event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        editTask(row);
    }
});
fetchAndDisplayTasks();