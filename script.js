let imageURL;

function submitHandler() {
    console.log("click");
    const fileInput = document.getElementById('fileInput');
    console.log(fileInput.files);
    const image = fileInput.files[0];

    // Multipart file
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = 'dgyjpaELPofnEvPCji1pzEuc';

    const removeButton = document.querySelector('.btn-primary'); // Mengambil referensi ke tombol "Remove"
    removeButton.disabled = true; // Menonaktifkan tombol "Remove"

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
        .then(function (response) {
            return response.blob()
        })
        .then(function (blob) {
            console.log(blob);
            const url = URL.createObjectURL(blob);
            imageURL = url;
            const img = document.createElement('img');
            img.src = url;
            img.className = 'removed-image'; // Menambahkan class ke gambar
            // Memilih tempat untuk menyisipkan elemen <img>
            img.style.maxWidth = '100%';
            const downloadButton = document.querySelector('.btn-warning');
            const parentDiv = downloadButton.parentNode;
            parentDiv.insertBefore(img, downloadButton); // Menyisipkan elemen <img> sebelum tombol "Download"

            // Menambahkan event listener ke tombol "Download"
            downloadButton.addEventListener('click', function() {
                // Menghapus gambar yang ditambahkan sebelumnya
                const removedImage = document.querySelector('.removed-image');
                if (removedImage) {
                    removedImage.remove();
                }
            });
        })
        .catch()
        .finally(() => {
            removeButton.disabled = false; // Mengaktifkan kembali tombol "Remove" setelah selesai
        });
}



function downloadFile() {
    var anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'naciasv.png';
    document.body.appendChild(anchorElement);

    anchorElement.click();

    document.body.removeChild(anchorElement);
}
