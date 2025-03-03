document.addEventListener("DOMContentLoaded", () => {
  fetch("/images.json")
      .then(response => response.json())
      .then(images => {
          const gallery = document.getElementById("gallery");
          images.forEach(image => {
              let imgElement = document.createElement("img");
              imgElement.src = `/uploads/${image}`;
              gallery.appendChild(imgElement);
          });
      })
      .catch(error => console.error("Erreur :", error));
});
