document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    }

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 50000);

    // Establecer un flag para controlar si la notificación ya se mostró
    let notificationShown = false;

    window.addEventListener('online', () => {
        if (!notificationShown) {
            showNotification('La aplicación está en línea', 'online-icon.png');
            notificationShown = true;
        }
    });

    window.addEventListener('offline', () => {
        showNotification('La aplicación está fuera de línea', '../Images/offline.png');
        notificationShown = false; // Reiniciar el flag cuando cambia a estado "offline"
    });

    checkConnectionStatus();
});

function checkConnectionStatus() {
    if (navigator.onLine) {
        showNotification('La aplicación está en línea', 'online-icon.png');
    } else {
        showNotification('La aplicación está fuera de línea', '../Images/offline.png');
    }
}

function showNotification(message, icon) {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Estado de conexión', {
                    body: message,
                    icon: `Images/${icon}`
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const backgroundAudio = document.getElementById('backgroundAudio');

    if (backgroundAudio) {
        document.addEventListener('click', () => {
            backgroundAudio.play().catch(error => {
                console.error('Error al reproducir audio:', error);
            });
        }, { once: true }); 
    }
});
