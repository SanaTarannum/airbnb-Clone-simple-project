
  document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', validatePassword);
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    toggleValidation(emailInput, valid);
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    const valid = password.length >= 6;
    toggleValidation(passwordInput, valid);
  }

  function toggleValidation(input, isValid) {
    const parent = input.parentElement;
    parent.querySelectorAll('.validation-icon, .validation-message').forEach(el => el.remove());

    const icon = document.createElement('span');
    icon.classList.add('absolute', 'left-2', 'top-1/2', '-translate-y-1/2', 'text-xl', 'validation-icon');
    icon.innerHTML = isValid ? '✔️' : '❌';

    const message = document.createElement('p');
    message.classList.add('text-sm', 'mt-1', 'validation-message');
    message.classList.add(isValid ? 'text-green-600' : 'text-red-600');
    message.textContent = isValid ? 'Looks good!' : 'Invalid input';

    parent.classList.add('relative');
    input.classList.add('pl-8');
    parent.appendChild(icon);
    parent.appendChild(message);
  }
});
