




function toggleReadMore(btn) {
    const content = btn.previousElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        btn.textContent = "Read More";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        btn.textContent = "Show Less";
    }
}

function downloadPDF(orderId) {
    window.location.href = `/download/pdf/${orderId}`;
}

function downloadImage(orderId) {
    window.location.href = `/download/image/${orderId}`;
}



document.getElementById('searchInput').addEventListener('input', function () {
    const val = this.value.trim().toLowerCase();
    const regex = new RegExp(`\\b${val}`, 'i'); // matches words starting with val

    document.querySelectorAll('.order-card').forEach(card => {
        if (val.length === 0) {
            card.style.display = 'none';
        } else {
            const searchData = card.dataset.search;
            card.style.display = regex.test(searchData) ? 'block' : 'none';
        }
    });
});




