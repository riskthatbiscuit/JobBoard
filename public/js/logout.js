const logout = async () => {
  console.log('logout button pushed');
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
