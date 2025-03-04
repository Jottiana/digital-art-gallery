fetch('/images')
    .then(response => response.json())
    .then(images => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = "";

        images.forEach(imageUrl => {
            if (!imageUrl.startsWith("http")) return;

            const imgContainer = document.createElement('div');
            imgContainer.classList.add("image-container");

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Image téléchargée";
            img.style.maxWidth = "200px";
            img.style.margin = "10px";
            img.classList.add("gallery-image");

            img.addEventListener("click", () => openImage(imageUrl));

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "🗑 Supprimer";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => deleteImage(imageUrl, imgContainer);

            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteBtn);
            gallery.appendChild(imgContainer);
        });
    })
    .catch(error => console.error("🚨 Erreur lors du chargement des images :", error));

function openImage(url) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = url;
}

document.addEventListener("DOMContentLoaded", () => {
    const closeModalButton = document.getElementById("close-modal");
    const modal = document.getElementById("image-modal");

    closeModalButton.addEventListener("click", () => {
        console.log("🔴 Fermeture via la croix ✖");
        modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            console.log("🔴 Fermeture via clic extérieur");
            modal.style.display = "none";
        }
    });
});

function deleteImage(imageUrl, imgContainer) {
    fetch('/delete', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            imgContainer.remove();
        } else {
            alert("❌ Erreur lors de la suppression !");
        }
    })
    .catch(error => console.error("🚨 Erreur de suppression :", error));
}
