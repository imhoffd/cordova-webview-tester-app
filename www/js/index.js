document.addEventListener('deviceready', () => {
  console.log('deviceready received');

  // setTimeout(() => {
  //   console.log('doing request');
  //   doRequest();
  // }, 1500);

  // setTimeout(() => {
  //   console.log('starting worker');
  //   const worker = new Worker('js/worker.js');

  //   worker.postMessage(['what', 'up', 'fren']);
  //   worker.onmessage = (e) => {
  //     console.log('wow I got a message from worker:', e);
  //   };
  // }, 3000);
});

async function doRequest() {
  const res = await fetch('http://10.0.1.237:3000', { method: 'POST', mode: 'cors', body: 'hello there' });
  console.log(res);
}
