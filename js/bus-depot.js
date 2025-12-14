// ARCHIVO ORIGINAL bus-depot.js
// No cambiar - Solo para cargar la página sin errores

console.log('Bus Depot - Sistema cargado');

// Esta función simplemente quita el mensaje "LOADING..."
function iniciarSistema() {
    console.log('Iniciando sistema...');
    
    // Buscar y reemplazar "LOADING..."
    const elementos = document.getElementsByTagName('p');
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].textContent.includes('LOADING')) {
            elementos[i].textContent = '✅ Sistema listo. Buscando fotos...';
            console.log('Mensaje LOADING reemplazado');
        }
    }
    
    // Intentar cargar foto automáticamente (si existe)
    setTimeout(function() {
        console.log('Intentando cargar foto automáticamente...');
        // Tu código original para cargar fotos iría aquí
    }, 1000);
}

// Ejecutar cuando la página cargue
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarSistema);
} else {
    iniciarSistema();
}
