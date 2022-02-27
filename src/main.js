/* eslint-disable no-duplicate-case */
/* eslint-disable no-console */

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
    const trimmedValue = value.trim();
    if (trimmedValue === '') {
      setError(id, 'Это поле обязательно');
      document.querySelector('.form__submit').disabled = true;
      return false;
    }
    switch (id) {
      case 'firstName':
      case 'lastName':
        if (!trimmedValue.match(/[a-zA-Z]+/g)) {
          setError(id, 'Поле должно состоять только из латинских символов');
          return false;
        }
        break;
      case 'phone':
        if (!trimmedValue.match(/^[0-9]+$/g)) {
          setError(id, 'Телефон должен состоять только из цифр');
          return false;
        }
        if (trimmedValue[0] !== '7') {
          setError(id, 'Телефон должен начинаться с 7');
          return false;
        }
        break;
      case 'password':
        if (trimmedValue !== inputs[4].value.trim()) {
          setError(id, 'Пароли должны совпадать');
          setError('passwordCheck', 'Пароли должны совпадать');
          return false;
        }
        break;
      case 'password':
      case 'passwordCheck':
        if (value.length < 6) {
          console.log(value.length);
          setError('password', 'Пароль должен иметь длину от 6 символов');
          setError('passwordCheck', 'Пароль должен иметь длину от 6 символов');
          return false;
        }
        if (!trimmedValue.match(/[a-zA-Z0-9]+/g)) {
          setError(
            id,
            'Поле должно состоять только из латинских символов и цифр',
          );
          return false;
        }
        if (!value.match(/[A-Z]+/g)) {
          setError(
            'password',
            'Пароль должен содержать в себе хоты бы одну заглавную букву',
          );
          setError(
            id,
            'Пароль должен содержать в себе хоты бы одну заглавную букву',
          );
          return false;
        }
        if (!value.match(/[\d]/g)) {
          setError(
            'password',
            'Пароль должен содержать в себе хоты бы одну цифру',
          );
          setError(id, 'Пароль должен содержать в себе хоты бы одну цифру');
          return false;
        }
        if (value.match(/[\s]/g)) {
          setError('password', 'Пароль не должен содержать в себе пробелы');
          setError(id, 'Пароль не должен содержать в себе пробелы');
          return false;
        }
        break;
      default:
        break;
    }
  }
  const submit = document.querySelector('.form__submit');
  submit.className = 'form__submit success';
  submit.innerText = 'Данные отправлены';
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
    console.log(payload);
  }
});

form.addEventListener('keydown', () => {
  const errors = form.querySelectorAll('.invalid');
  let valideInputs = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const { id, value } = inputs[i];
    if (value.trim().length > 0) {
      valideInputs += 1;
      resetError(id);
    }
  }
  if (valideInputs === inputs.length && errors.length === 0) {
    document.querySelector('.form__submit').disabled = false;
  } else {
    document.querySelector('.form__submit').disabled = true;
  }
});
