const form = document.getElementById('form');

function setError(id, message) {
  const input = document.querySelector(`#${id}`);
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  formGroup.className = 'form__group invalid';
  small.innerText = message;
}

function validateInputs() {
  form.querySelectorAll('input');
  for (let i = 0; i < form.length; i += 1) {
    const { id, value } = form[i];
    if (value.trim() === '') {
      setError(id, 'Это поле обязательно');
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs();
});
