document.addEventListener('deviceready', () => {
  console.log('deviceready received');

  document.getElementById('send-get').addEventListener('click', event => {
    event.preventDefault();
    sendGET();
  });

  document.getElementById('send-post').addEventListener('click', event => {
    event.preventDefault();
    sendPOST();
  });

  document.getElementById('send-get-cors').addEventListener('click', event => {
    event.preventDefault();
    sendGETCORS();
  });

  document.getElementById('send-post-cors').addEventListener('click', event => {
    event.preventDefault();
    sendPOSTCORS();
  });

  document.getElementById('send-get-local').addEventListener('click', event => {
    event.preventDefault();
    sendGETLocal();
  });
});

async function sendGET() {
  console.log('performing GET');
  doGET('http://webviewtests.000webhostapp.com/nocors/heroes.json');
}

async function sendGETCORS() {
  console.log('performing GET with CORS enabled');
  doGET('http://webviewtests.000webhostapp.com/cors/heroes.json');
}

async function sendGETLocal() {
  console.log('performing GET to local file');
  doGET('./heroes.json');
}

async function doGET(url) {
  const res = await fetch(url);
  const data = await res.json()
  console.log('response:', data);
}

async function sendPOST() {
  console.log('performing POST');
  doPOST('http://webviewtests.000webhostapp.com/nocors/post.php');
}


async function sendPOSTCORS() {
  console.log('performing POST with CORS enabled');
  doPOST('http://webviewtests.000webhostapp.com/cors/post.php');
}

async function doPOST(url) {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: 'hello from app',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
  const data = await res.text();
  console.log('response:', data);
}

