document.addEventListener('deviceready', () => {
  console.log('deviceready received');

  console.log('spinning up worker');

  setTimeout(() => {
    const worker = new Worker('js/worker-worker.js');

    worker.postMessage(['what', 'up', 'fren']);
    worker.onmessage = e => {
      console.log('received message from worker:', e);
    };
  }, 1000);
});
