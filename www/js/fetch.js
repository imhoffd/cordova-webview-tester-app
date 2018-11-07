document.addEventListener('deviceready', () => {
  console.log('deviceready received');

  document.getElementById('send-get').addEventListener('click', () => {
    sendGET();
  });

  document.getElementById('send-post').addEventListener('click', () => {
    sendPOST();
  });
});

async function sendGET() {
  console.log('performing GET');
  const res = await fetch('http://10.0.1.237:3000');
  console.log('response:', res);
}

async function sendPOST() {
  console.log('performing POST');
  const res = await fetch('http://10.0.1.237:3000', {
    method: 'POST',
    mode: 'cors',
    body: 'hello from app',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });

  console.log('response:', res);
}
