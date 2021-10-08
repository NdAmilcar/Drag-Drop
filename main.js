
const DropSector = document.querySelector(".drop"),
  dragText = DropSector.querySelector("header"),
  button = DropSector.querySelector("button"),
  Drag = document.querySelector("#Drag"),
  input = DropSector.querySelector("#in-put");
let files; 
Drag.addEventListener("submit", (e) => {
    e.preventDefault();
    if (files) {
      e.submit();
    }
  });
  button.addEventListener("click", (e) => {
    input.click(); 
  });
  input.addEventListener("change", function () {
    files = this.files[0];
    DropSector.classList.add("active");
    showFile(files); 
  });
  
  DropSector.addEventListener("dragover", (event) => {
    event.preventDefault(); 
    DropSector.classList.add("active");
    dragText.textContent = "Release to Upload File";
  });
  
  DropSector.addEventListener("dragleave", () => {
    DropSector.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  });
  
  DropSector.addEventListener("drop", (event) => {
    event.preventDefault(); 
    files = event.dataTransfer.files;
    showFile(files); 
    DropSector.classList.remove("active");
  });
  
  function showFile(files) {
    [...files].forEach((file) => {
      let fileType = file.type; 
      let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
      if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let fileURL = fileReader.result; 
          const image = document.createElement("img");
          image.src = fileURL;
          image.setAttribute("width", "50px");
          let imgTag = `<img src="${fileURL}" alt="image">`; 
          document.querySelector("#vista").appendChild(image);
        };
        fileReader.readAsDataURL(file);
      } else {
        alert("This is not an Image File!");
        DropSector.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
      }
    });
  }