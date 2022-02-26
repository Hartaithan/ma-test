const form = document.getElementById('form');

function setError(id) {
  console.log(id);
}

function validateInputs() {
  form.querySelectorAll('input');
  for (let i = 0; i < form.length; i++) {
    const { id, value } = form[i];
    if (value.trim() === '') {
      setError(id);
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs();
});
