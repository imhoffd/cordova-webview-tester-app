document.addEventListener('deviceready', () => {
  console.log('deviceready received');
  console.log('cordova file:', cordova.file);

  document.getElementById('create-file').addEventListener('click', event => {
    event.preventDefault();

    requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
      console.log('fs opened:', fs);

      fs.root.getFile('myPersistentFile.txt', { create: true, exclusive: false }, fileEntry => {
        console.log('fileEntry:', fileEntry);
        writeFile(fileEntry, new Date().toISOString() + '\n', true);
      }, error => console.error(error));
    }, error => console.error(error));
  });

  document.getElementById('read-file').addEventListener('click', event => {
    event.preventDefault();
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, fs => {
      console.log('fs opened:', fs);

      fs.root.getFile('myPersistentFile.txt', { create: true, exclusive: false }, fileEntry => {
        console.log('fileEntry:', fileEntry);
        readFile(fileEntry);
      }, error => console.error(error));
    }, error => console.error(error));
  });

  document.getElementById('clear').addEventListener('click', event => {
    event.preventDefault();
    displayFileData('');
  });

});


function writeFile(fileEntry, dataObj, isAppend) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file read...");
      readFile(fileEntry);
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

function readFile(fileEntry) {
  fileEntry.file(function (file) {
    var reader = new FileReader();

    reader.onloadend = function() {
      console.log("Successful file read: " + this.result);
      displayFileData(fileEntry.fullPath + ": " + this.result);
    };

    reader.readAsText(file);

  }, error => console.error(error));
}

function displayFileData(data) {
  const displayBox = document.getElementById('file-content');

  displayBox.innerHTML = data;
}
