// Código original básico para Bus Depot
console.log('Bus Depot JS cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página lista');
    
    // Solo quita el mensaje "LOADING..."
    const loadingElements = document.querySelectorAll('p');
    loadingElements.forEach(p => {
        if (p.textContent.includes('LOADING') || p.textContent.includes('Attempting')) {
            p.textContent = '✅ Sistema activo. Ingresa un número de flota.';
        }
    });
});
