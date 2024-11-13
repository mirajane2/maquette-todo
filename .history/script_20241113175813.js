const form = document.getElementById('formulaire');
const formContainer = document.querySelector('.form-container');
const main = document.querySelector('.container');
const save = document.getElementById('enregistrer');
const suppr = document.getElementById('supprimer');
const table = document.querySelector('.valeur');


form.addEventListener('click', () => {
    main.style.display = 'none';
    formContainer.style.display = 'flex';
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

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>${category}</td>
        <td>${date} ${time}</td>
        <td>${priority}</td>
        <td>${fulfillment}%</td>
        <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
    `;
    table.appendChild(newRow);
    
    formContainer.style.display = 'none';
    mainContainer.style.display = 'block';
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



