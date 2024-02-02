const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('login button pushed');
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log(response);
      document.location.replace('/');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
