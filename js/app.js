// Función para generar el código QR
function generarQR() {
    const texto = document.getElementById("texto_input").value;
    const correccion = document.getElementById("correccion_input").value;
    const tamano = parseInt(document.getElementById("tamano_input").value, 10) || 256;
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    if (texto.trim() === "") {
        qrcodeContainer.innerHTML = "<p class='text-sm text-slate-500'>Ingresa un valor para generar el código.</p>";
        document.getElementById("descargarBtn").classList.add("hidden");
        return;
    }
    // Mapeo de nivel de corrección
    const niveles = {
        'L': QRCode.CorrectLevel.L,
        'M': QRCode.CorrectLevel.M,
        'Q': QRCode.CorrectLevel.Q,
        'H': QRCode.CorrectLevel.H
    };
    new QRCode(qrcodeContainer, {
        text: texto,
        width: tamano,
        height: tamano,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : niveles[correccion] || QRCode.CorrectLevel.H
    });
    document.getElementById("descargarBtn").classList.remove("hidden");
}

// Función para descargar el código QR como imagen
function descargarQR() {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("Primero genera un código QR para descargar.");
        return;
    }
    const enlace = document.createElement("a");
    enlace.download = "codigo-qr.png";
    enlace.href = canvas.toDataURL("image/png");
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}
