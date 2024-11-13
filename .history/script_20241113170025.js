const form = document.getElementById('formulaire');
const modal = documant.querySelector('.form-container');
const main = document.querySelector('.container');
const save = document.getElementById('enregistrer');
const suppr = document.getElementById('supprimer');
const table = document.querySelector('.valeur');

form.addEventListener('click', () => {
    modal.style.display = 'block';
});

suppr.addEventListener('click', () => {
    modal.style.display = 'none';
    clearForm();
})
