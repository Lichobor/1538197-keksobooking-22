const showMessage = (message) => {
  const containerMessage = document.createElement('div');
  containerMessage.style.zIndex = 100;
  containerMessage.style.position = 'fixed';
  containerMessage.style.bottom = 0;
  containerMessage.style.right = 0;
  containerMessage.style.color = 'red';
  containerMessage.style.fontFamily = 'Roboto';
  containerMessage.style.fontWeight = 'bold';
  containerMessage.style.fontSize = '20px';
  containerMessage.style.padding = '20px';
  containerMessage.style.cursor = 'default';

  containerMessage.textContent = message;

  document.body.appendChild(containerMessage);

  setTimeout(() => {
    containerMessage.remove();
  }, 3000);
}

const isUseEsc = (evt) => {
  return evt.key === ('Escape' || 'Esc');
}

export {showMessage, isUseEsc};
