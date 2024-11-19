const form = document.getElementById('formulaire');
const formContainer = document.querySelector('.form-container');
const main = document.querySelector('.container');
const save = document.getElementById('enregistrer');
const suppr = document.getElementById('supprimer');
const table = document.querySelector('.valeur');
const task = document.getElementById('taskList');

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
    clearForm();
});

save.addEventListener('click', () => {
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
    if (edition && editingRow) {

        editingRow.cells[0].textContent = name;
        editingRow.cells[1].textContent = description;
        editingRow.cells[2].textContent = category;
        editingRow.cells[3].textContent = `${date} ${time}`;
        editingRow.cells[4].textContent = priority;
        editingRow.cells[5].textContent = `${fulfillment}%`;
        edition = false;  
        editingRow = null;  
    }
    else {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <th>${name}</th>
        <th>${description}</th>
        <th>${category}</th>
        <th>${date} ${time}</th>
        <th>${priority}</th>
        <th>${fulfillment}%</th>
        <th>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </th>
    `;
    table.appendChild(newRow);
    }

    
    formContainer.style.display = 'none';
    main.style.display = 'block';
    clearForm();
});

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskFulfillment').value = '0';
}

table.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.closest('tr').remove();
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

        task.innerHTML = '';

        tasks.forEach(task => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th>${task.name}</th>
                <th>${task.description}</th>
                <th>${task.category}</th>
                <th>${task.date} ${task.time}</th>
                <th>${task.priority}</th>
                <th>${task.fulfillment}%</th>
                <th>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </th>
            `;
            task.appendChild(newRow);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

fetchAndDisplayTasks();

    



