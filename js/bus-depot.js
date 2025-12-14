// BUS DEPOT - Código básico para reemplazar el archivo faltante
// Este código soluciona el error 404 y agrega funcionalidad mínima

console.log('✅ Bus Depot JS cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    // 1. Quitar el mensaje de "LOADING..."
    const loadingText = document.querySelector('p');
    if (loadingText && loadingText.textContent.includes('LOADING')) {
        loadingText.textContent = 'Sistema listo. Ingresa un número de flota.';
    }

    // 2. Agregar funcionalidad básica al campo de búsqueda
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('button') || document.createElement('button');
    
    if (searchInput) {
        searchInput.placeholder = 'Ej: 1001, 1002, 1003...';
        
        // Función para simular búsqueda
        function buscarFlota() {
            const numero = searchInput.value.trim();
            if (!numero) {
                alert('⚠️ Por favor, ingresa un número de flota.');
                return;
            }
            
            console.log(`Buscando flota #${numero}...`);
            
            // Mostrar resultado simulado
            if (loadingText) {
                loadingText.innerHTML = `🔍 <strong>Flota ${numero}</strong> encontrada.<br>
                                       📸 <em>La funcionalidad de cargar foto requiere el código original.</em>`;
            }
            
            // Limpiar campo después de buscar
            searchInput.value = '';
        }
        
        // Agregar botón si no existe
        if (!document.querySelector('button')) {
            searchButton.textContent = 'BUSCAR';
            searchButton.style.marginLeft = '10px';
            searchButton.style.padding = '5px 15px';
            searchButton.style.backgroundColor = '#4CAF50';
            searchButton.style.color = 'white';
            searchButton.style.border = 'none';
            searchButton.style.borderRadius = '4px';
            searchButton.style.cursor = 'pointer';
            
            searchInput.insertAdjacentElement('afterend', searchButton);
        }
        
        // Configurar eventos
        searchButton.onclick = buscarFlota;
        searchInput.onkeypress = function(event) {
            if (event.key === 'Enter') {
                buscarFlota();
            }
        };
    }
    
    // 3. Cambiar título si es necesario
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent === 'BUS DEPOT') {
        h1.innerHTML = '🚌 BUS DEPOT <small style="font-size:14px;color:#666;">(Modo básico activado)</small>';
    }
});
