//qr code image 
function toggleQRCodeSection() {
    const qrSection = document.getElementById('qr-code-section');
    qrSection.style.display = qrSection.style.display === 'none' ? 'block' : 'none';
}

function showScanner() {
    document.getElementById("scanner-box").style.display = "block";
  }

  //gpay and ppay code 
  function toggleUPIInput(method) {
    const gpay = document.getElementById("upi-gpay");
    const phonepe = document.getElementById("upi-phonepe");

    if (method === 'gpay') {
        // Toggle gpay box, hide phonepe
        gpay.style.display = (gpay.style.display === "block") ? "none" : "block";
        phonepe.style.display = "none";
    } else if (method === 'phonepe') {
        // Toggle phonepe box, hide gpay
        phonepe.style.display = (phonepe.style.display === "block") ? "none" : "block";
        gpay.style.display = "none";
    }
}


function payWithUPI(method) {
    let upiId = '';
    if (method === 'gpay') {
        upiId = document.getElementById('gpay-upi').value;
    } else if (method === 'phonepe') {
        upiId = document.getElementById('phonepe-upi').value;
    }

    if (!upiId || !upiId.includes('@')) {
        alert("Please enter a valid UPI ID.");
        return;
    }

    const amount = parseFloat(document.getElementById("cart-total-amount").innerText.replace(/[^\d.]/g, ''));

    const upiURL = `upi://pay?pa=${upiId}&pn=BillYear%20Store&tn=Grocery%20Payment&am=${amount}&cu=INR`;

    // Attempt to open UPI app
    const a = document.createElement('a');
    a.href = upiURL;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


//cash option selcted
function toggleCashOption() {
    const cashBox = document.getElementById("cash-section");
    cashBox.style.display = (cashBox.style.display === "block") ? "none" : "block";
}

function toggleDue(show) {
    const field = document.getElementById('due-amount-field');
    field.style.display = show ? 'block' : 'none';
  }