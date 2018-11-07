document.addEventListener('deviceready', () => {
  console.log('deviceready received');
  console.log('camera:', navigator.camera);

  const resultElement = document.getElementById('camera-result');

  document.getElementById('take-picture').addEventListener('click', event => {
    event.preventDefault();

    const successCallback = image => {
      console.log('image:', image);
      resultElement.setAttribute('src', image);
    };

    const errorCallback = error => {
      console.error(error);
    };

    navigator.camera.getPicture(successCallback, errorCallback, {});
  });
});
