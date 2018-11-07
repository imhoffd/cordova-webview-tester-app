document.addEventListener('deviceready', () => {
  console.log('deviceready received');

  document.getElementById('download-video-file').addEventListener('click', event => {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://10.0.1.237:3000/big_buck_bunny.mp4', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
      console.log('load:', this);

      if (this.status === 200) {
        const blob = new Blob([this.response], { type: 'video/mp4' });
        saveFile(blob);
      }
    };

    xhr.send();
  });
});

function saveFile(fileData) {
  requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, fs => {
    console.log('fs opened:', fs);

    fs.root.getFile('big_buck_bunny.mp4', { create: true, exclusive: false }, fileEntry => {
      console.log('fileEntry:', fileEntry);
      writeFile(fileEntry, fileData, true);
    }, error => console.error(error));
  }, error => console.error(error));
}

function writeFile(fileEntry, dataObj, isAppend) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file read...");
      // readFile(fileEntry);
      const videoElement = document.getElementById('local-file-video');
      videoElement.setAttribute('src', fileEntry.nativeURL);
    };

    fileWriter.onerror = function (e) {
      console.log("Failed file read: " + e.toString());
    };

    // If we are appending data to file, go to the end of the file.
    if (isAppend) {
      try {
        fileWriter.seek(fileWriter.length);
      }
      catch (e) {
        console.log("file doesn't exist!");
      }
    }
    fileWriter.write(dataObj);
  });
}

// function readFile(fileEntry) {
//   fileEntry.file(function (file) {
//     var reader = new FileReader();

//     reader.onloadend = function() {
//       console.log("Successful file read: " + this.result);
//       console.log(fileEntry.fullPath + ": " + this.result);
//     };

//     reader.readAsText(file);

//   }, error => console.error(error));
// }
