// BUS DEPOT - Sistema de Fotos
console.log('🚌 Bus Depot System LOADED');

// Función que busca fotos (llamada desde el botón SEARCH)
window.searchFleet = function(fleetNumber) {
    console.log('🔍 Searching for fleet:', fleetNumber);
    
    const photoContainer = document.getElementById('photoContainer');
    const debugInfo = document.getElementById('debugInfo');
    
    // Mostrar estado inicial
    photoContainer.innerHTML = `
        <div class="photo-frame">
            <h3>Searching fleet: <strong>${fleetNumber}</strong></h3>
            <p>Testing photo patterns...</p>
            <div id="testResults" style="margin-top:10px;"></div>
        </div>
    `;
    
    debugInfo.innerHTML = `<strong>Debug Info:</strong><br>Starting search for fleet ${fleetNumber}...`;
    
    // Patrones comunes a probar
    const patterns = [
        `${fleetNumber}.jpg`,
        `bus-${fleetNumber}.jpg`,
        `flota${fleetNumber}.jpg`,
        `${fleetNumber}-bus.jpg`,
        `IMG_${fleetNumber}.jpg`,
        `bus_${fleetNumber}.jpg`,
        `vehicle${fleetNumber}.jpg`,
        `autobus${fleetNumber}.jpg`,
        `${fleetNumber}.png`,
        `bus-${fleetNumber}.png`
    ];
    
    const baseUrl = 'https://megiasnp.github.io/bus-depot/';
    let found = false;
    
    // Probar cada patrón
    patterns.forEach((pattern, index) => {
        setTimeout(() => {
            if (found) return;
            
            const imgUrl = baseUrl + pattern;
            const img = new Image();
            
            img.onload = function() {
                found = true;
                
                // Mostrar foto encontrada
                photoContainer.innerHTML = `
                    <div class="photo-frame" style="border:4px solid #27ae60; background:#e8f8ef;">
                        <h3 style="color:#27ae60;">✅ FOUND: Fleet ${fleetNumber}</h3>
                        <p><strong>Pattern:</strong> <code>${pattern}</code></p>
                        <img src="${imgUrl}" 
                             alt="Fleet ${fleetNumber}" 
                             style="max-width:100%; max-height:400px; border-radius:8px; margin:15px 0;">
                        <p><small>URL: <a href="${imgUrl}" target="_blank">${imgUrl}</a></small></p>
                    </div>
                `;
                
                debugInfo.innerHTML = `<strong>✅ SUCCESS!</strong><br>
                                      Photo found for fleet ${fleetNumber}<br>
                                      Pattern: ${pattern}<br>
                                      URL: ${imgUrl}`;
                
                console.log('✅ Photo found:', imgUrl);
            };
            
            img.onerror = function() {
                // Actualizar debug info
                const testResults = document.getElementById('testResults');
                if (testResults) {
                    testResults.innerHTML += `<div style="color:#999;">❌ ${pattern}</div>`;
                }
                
                debugInfo.innerHTML = `<strong>Testing:</strong><br>
                                      ${patterns.slice(0, index+1).map(p => `• ${p}`).join('<br>')}`;
                
                // Si es el último patrón y no se encontró nada
                if (index === patterns.length - 1 && !found) {
                    photoContainer.innerHTML = `
                        <div class="photo-frame" style="border:4px solid #e74c3c; background:#fdeaea;">
                            <h3 style="color:#e74c3c;">❌ No photo found</h3>
                            <p>No photo found for fleet <strong>${fleetNumber}</strong> with common patterns.</p>
                            <p><strong>Try:</strong> 101, 102, 1001, 200</p>
                        </div>
                    `;
                }
            };
            
            img.src = imgUrl;
        }, index * 500); // Medio segundo entre pruebas
    });
};

// Función para prueba automática (llamada desde AUTO TEST)
window.runAutoTest = function() {
    console.log('🤖 Starting auto-test');
    
    const testNumbers = [101, 102, 1001, 200, 201, 300, 1000];
    let currentIndex = 0;
    
    function testNextNumber() {
        if (currentIndex >= testNumbers.length) {
            document.getElementById('photoContainer').innerHTML = `
                <div class="photo-frame">
                    <h3>🤖 Auto-test completed</h3>
                    <p>Tested numbers: ${testNumbers.join(', ')}</p>
                    <p>No photos found with common patterns.</p>
                </div>
            `;
            return;
        }
        
        const num = testNumbers[currentIndex];
        document.getElementById('fleetInput').value = num;
        window.searchFleet(num);
        currentIndex++;
        
        // Probar siguiente número después de 3 segundos
        if (currentIndex < testNumbers.length) {
            setTimeout(testNextNumber, 3000);
        }
    }
    
    testNextNumber();
};

// Inicialización automática
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page ready');
    
    // Probar automáticamente con 101 después de 2 segundos
    setTimeout(() => {
        if (document.getElementById('fleetInput').value === '') {
            document.getElementById('fleetInput').value = '101';
            // Auto-buscar opcional:
            // window.searchFleet('101');
        }
    }, 2000);
});
