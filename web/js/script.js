var sendData = {};
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = error => reject(error);
});

document.addEventListener("DOMContentLoaded", function (event) {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
  var fileInput = document.getElementById("thefile");
  var file = document.getElementById('thefile').files[0];
  var fileName = "";


  fileInput.onchange = function () {
    result = document.getElementById('result');
    result.innerHTML = 'Click on convert.';
    if (fileInput.files.length > 0) {
      file = document.getElementById('thefile').files[0];
      fileName = file.name;
      document.getElementById('fileName').innerHTML = fileName;


    }
    else {
      document.getElementById('fileName').innerHTML = "Select file";
    }
  }

});

async function UserAction() {
  var fileInput = document.getElementById("thefile");
  if (fileInput.files.length > 0) {



    var file = document.getElementById('thefile').files[0];
    var fileName = file.name;
    var fileExt = file.name.split('.').slice(-1)[0];
    var filebase64 = await toBase64(file);

    sendData = {
      "filename": fileName,
      "extension": document.querySelector('input[name = "convertFormat"]:checked').value,
      "body": filebase64
    };

    uploadingIcon = document.getElementById('uploadingIcon');
    uploadIcon = document.getElementById('uploadIcon');
    convertButton = document.getElementById('convert');
    uploadingIcon.classList.remove("hide");
    uploadIcon.classList.add("hide");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        res = this.responseText;
        if ("errorMessage" in JSON.parse(this.responseText)) {
          console.log('eroror');
          document.getElementById('result').innerHTML = "Error!"
          uploadIcon.classList.remove("hide");
          uploadingIcon.classList.add("hide");
          convertButton.classList.remove("is-loading");
        }
        else {

          uploadIcon.classList.remove("hide");
          uploadingIcon.classList.add("hide");
          convertButton.classList.remove("is-loading");
          link = document.createElement('a');
          link.setAttribute('class', 'link button');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', JSON.parse(this.responseText)['body']);
          link.textContent = "Download";
          result = document.getElementById('result');
          result.innerHTML = '';
          result.appendChild(link);
        }
      }
    };
    xhttp.open("POST", "type api url here", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(sendData));
    convertButton.classList.add("is-loading");
    result.innerHTML = 'Converting..';
  }

}
