document.addEventListener("DOMContentLoaded", function () {
    // Get all thumbnails
    let thumbnails = document.querySelectorAll(".thumbnail");
    let lightboxImage = document.getElementById("lightboxImage");
    let lightboxModal = new bootstrap.Modal(document.getElementById("lightboxModal"));

    // Add event listener to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            lightboxImage.src = this.src;
            lightboxModal.show();
        });
    });
});
