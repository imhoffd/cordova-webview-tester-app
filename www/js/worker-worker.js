onmessage = function(e) {
    console.log('worker: hello I got a message');
    console.log('worker: and here it is:', e);
    console.log('worker: now I will do work');

    setTimeout(() => {
        const req = new XMLHttpRequest();
        req.addEventListener('load', function () {
            console.log('worker: loaded a thing', this.responseText);
            postMessage('thanks');
        });
        req.open('POST', 'http://10.0.1.237:3000');
        req.send('here is some datar');
    }, 500);
}
