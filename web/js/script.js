
var data = {
  "filename": "test5656.html",
  "extension": "pdf",
  "body": "PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8Ym9keT4KCjxoMT5NeSBGaXJzdCBIZWFkaW5nPC9oMT4KCjxwPk15IGZpcnN0IHBhcmFncmFwaC48L3A+Cgo8L2JvZHk+CjwvaHRtbD4="
};
 var sendData = {};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

document.addEventListener("DOMContentLoaded", function(event) {
    var fileInput = document.getElementById("thefile");
    var file = document.getElementById('thefile').files[0];
    var fileName = "";

    
fileInput.onchange = function(){
    if(fileInput.files.length > 0)
              {
                file = document.getElementById('thefile').files[0];
                fileName = file.name;
                document.getElementById('fileName').innerHTML = fileName;
              
          
              }
  else
  {
    document.getElementById('fileName').innerHTML = "Select file";
  }
}

});

async function UserAction() {
    var fileInput = document.getElementById("thefile");
    if(fileInput.files.length > 0){

  

    var file = document.getElementById('thefile').files[0];
    var fileName = file.name;
    var fileExt = file.name.split('.').slice(-1)[0];
    var filebase64 = await toBase64(file);
 
    sendData = {
     "filename": fileName,
     "extension": document.querySelector('input[name = "convertFormat"]:checked').value,
     "body": filebase64
   };

  console.log(sendData);
  uploadingIcon = document.getElementById('uploadingIcon');
  uploadIcon = document.getElementById('uploadIcon');
  uploadingIcon.classList.remove("hide");
  uploadIcon.classList.add("hide");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText);
             res = this.responseText;
             if("errorMessage" in JSON.parse(this.responseText))
             {
                 console.log('eroror');
                 document.getElementById('result').innerHTML = "Error!"
                 uploadIcon.classList.remove("hide");
                 uploadingIcon.classList.add("hide");
             }
             else{

                uploadIcon.classList.remove("hide");
                uploadingIcon.classList.add("hide");
                link = document.createElement('a');
                link.setAttribute('class', 'link');
                link.setAttribute('target', '_blank');
                link.setAttribute('href',JSON.parse(this.responseText)['body'] );
                link.textContent = JSON.parse(this.responseText)['body'];
                result = document.getElementById('result');
                result.innerHTML='';
                result.appendChild(link);
             }
         }
    };
xhttp.open("POST", "https://qvkr4rwczf.execute-api.us-east-1.amazonaws.com/v1", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(sendData));
}

}