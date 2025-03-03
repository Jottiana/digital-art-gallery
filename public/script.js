fetch('/images')
    .then(response => response.json())
    .then(images => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = "";
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Image uploadée";
            img.style.maxWidth = "200px";
            img.style.margin = "10px";
            gallery.appendChild(img);
        });
    })
    .catch(error => console.error("Erreur lors du chargement des images:", error));
