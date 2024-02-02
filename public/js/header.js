const smButton = () => {
  const smMenu = document.getElementById('small_menu');
  console.log('in the menu button');
  console.log(smMenu);
  if (smMenu.hasAttribute('hidden')) {
    smMenu.removeAttribute('hidden');
  } else {
    smMenu.setAttribute('hidden', '');
  }
};

document.querySelector('#menu_button').addEventListener('click', smButton);
