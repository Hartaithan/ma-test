const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');

function getGroupComponents(id) {
  const input = document.querySelector(`#${id}`);
  const formGroup = input.parentElement;
  const small = formGroup.querySelector('small');
  return { input, formGroup, small };
}

function setError(id, message) {
  const { formGroup, small } = getGroupComponents(id);
  formGroup.className = 'form__group invalid';
  small.innerText = message;
}

function resetError(id) {
  const { formGroup, small } = getGroupComponents(id);
  formGroup.className = 'form__group';
  small.innerText = '';
}

function validateInputs() {
  for (let i = 0; i < inputs.length; i += 1) {
    const { id, value } = inputs[i];
    if (value.trim() === '') {
      setError(id, 'Это поле обязательно');
      document.querySelector('.form__submit').disabled = true;
      return false;
    }
    switch (id) {
      case 'firstName':
        break;
      case 'lastName':
        break;
      default:
        break;
    }
  }
  return true;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateInputs()) {
    const payload = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phone: e.target[2].value,
      password: e.target[3].value,
    };
    alert(JSON.stringify(payload)); // eslint-disable-line
  }
});

form.addEventListener('keydown', () => {
  const errors = form.querySelectorAll('.invalid');
  let valideInputs = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const { value } = inputs[i];
    if (value.trim().length > 0) {
      valideInputs += 1;
    }
  }
  if (valideInputs === inputs.length && errors.length === 0) {
    document.querySelector('.form__submit').disabled = false;
  }
});

for (let i = 0; i < inputs.length; i += 1) {
  const element = inputs[i];
  element.addEventListener('input', (e) => {
    const { id, value } = e.target;
    if (value.trim().length > 0) {
      resetError(id);
    }
  });
}
