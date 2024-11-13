const form = document.getElementById('formulaire');
const formContainer = documant.querySelector('.form-container');
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


