// CÓDIGO DETECTIVE MEJORADO - Versión 2
console.log('🔍 Detective activado - Buscando fotos de flota');

document.addEventListener('DOMContentLoaded', function() {
    document.body.innerHTML = `
        <div style="max-width:800px; margin:20px auto; padding:20px; font-family:Arial;">
            <h1>🚌 BUS DEPOT - Buscador de Fotos</h1>
            <p>Se encontró una foto en el sistema: <strong>depot-map(1).jpg</strong></p>
            <p>Ingresa un número de flota para buscar su foto:</p>
            
            <input type="text" id="flotaInput" placeholder="Ej: 101, 202, 305, 1001..." 
                   style="padding:10px; width:200px; font-size:16px;">
            <button id="buscarBtn" 
                    style="padding:10px 20px; background:#4CAF50; color:white; border:none; border-radius:4px; font-size:16px; cursor:pointer;">
                BUSCAR FOTO
            </button>
            
            <div style="margin-top:30px;">
                <h3>📍 Foto de referencia encontrada:</h3>
                <img src="https://megiasnp.github.io/bus-depot/depot-map(1).jpg" 
                     alt="Mapa del depósito" 
                     style="max-width:400px; border:2px solid #ccc; margin:10px 0;">
                <p><small>Esta imagen prueba que las fotos SÍ están en: <code>https://megiasnp.github.io/bus-depot/</code></small></p>
            </div>
            
            <div id="resultado" style="margin-top:30px; padding:20px; background:#f8f9fa; border-radius:8px; min-height:100px;">
                <p>Los resultados de búsqueda aparecerán aquí...</p>
            </div>
            
            <div style="margin-top:40px; padding:15px; background:#e8f4fc; border-radius:5px; font-size:14px;">
                <h4>🧩 Patrones que se probarán automáticamente:</h4>
                <ul>
                    <li><code>[numero].jpg</code> → Ej: 101.jpg</li>
                    <li><code>bus-[numero].jpg</code> → Ej: bus-101.jpg</li>
                    <li><code>flota[numero].jpg</code> → Ej: flota101.jpg</li>
                    <li><code>[numero]-bus.jpg</code> → Ej: 101-bus.jpg</li>
                    <li><code>IMG_[numero].jpg</code> → Ej: IMG_101.jpg</li>
                </ul>
                <p><strong>Instrucción:</strong> Escribe un número y haz clic en BUSCAR. Si una foto existe, aparecerá en <span style="color:green;">VERDE</span>.</p>
            </div>
        </div>
    `;
    
    // PATRONES INTELIGENTES para probar
    const patrones = [
        { nombre: 'Numero simple', ruta: (num) => `${num}.jpg` },
        { nombre: 'bus-Numero', ruta: (num) => `bus-${num}.jpg` },
        { nombre: 'bus_Numero', ruta: (num) => `bus_${num}.jpg` },
        { nombre: 'flotaNumero', ruta: (num) => `flota${num}.jpg` },
        { nombre: 'Numero-bus', ruta: (num) => `${num}-bus.jpg` },
        { nombre: 'IMG_Numero', ruta: (num) => `IMG_${num}.jpg` },
        { nombre: 'autobusNumero', ruta: (num) => `autobus${num}.jpg` },
        { nombre: 'vehiculoNumero', ruta: (num) => `vehiculo${num}.jpg` },
        // También probar con .png
        { nombre: 'Numero.png', ruta: (num) => `${num}.png` },
        { nombre: 'bus-Numero.png', ruta: (num) => `bus-${num}.png` }
    ];
    
    document.getElementById('buscarBtn').onclick = buscarFoto;
    document.getElementById('flotaInput').onkeypress = function(e) {
        if (e.key === 'Enter') buscarFoto();
    };
    
    function buscarFoto() {
        const numero = document.getElementById('flotaInput').value.trim();
        const resultadoDiv = document.getElementById('resultado');
        
        if (!numero || isNaN(numero)) {
            resultadoDiv.innerHTML = '<p style="color:red; padding:10px;">⚠️ Ingresa un número válido (ej: 101, 200, 1001)</p>';
            return;
        }
        
        resultadoDiv.innerHTML = `
            <h3>🔎 Buscando foto para flota <span style="color:#2c3e50;">${numero}</span>...</h3>
            <div id="pruebas" style="margin-top:15px;"></div>
            <hr style="margin:20px 0;">
        `;
        
        const pruebasDiv = document.getElementById('pruebas');
        let fotosEncontradas = 0;
        
        // Probar TODOS los patrones
        patrones.forEach(patron => {
            const nombreArchivo = patron.ruta(numero);
            const urlCompleta = `https://megiasnp.github.io/bus-depot/${nombreArchivo}`;
            
            // Crear prueba
            const pruebaDiv = document.createElement('div');
            pruebaDiv.style.cssText = 'margin:8px 0; padding:10px; border-left:4px solid #ddd;';
            pruebaDiv.innerHTML = `
                Probando: <code>${nombreArchivo}</code><br>
                <small>URL: <a href="${urlCompleta}" target="_blank">${urlCompleta}</a></small>
                <div class="estado" style="margin-top:5px; font-weight:bold;">⏳ Probando...</div>
            `;
            
            pruebasDiv.appendChild(pruebaDiv);
            
            // Intentar cargar la imagen
            const img = new Image();
            img.onload = function() {
                // ¡ÉXITO! Foto encontrada
                pruebaDiv.style.borderLeftColor = '#2ecc71';
                pruebaDiv.style.backgroundColor = '#e8f8ef';
                pruebaDiv.querySelector('.estado').innerHTML = `
                    <span style="color:#27ae60;">✅ ¡FOTO ENCONTRADA!</span><br>
                    <img src="${urlCompleta}" 
                         style="max-width:250px; margin:10px 0; border:3px solid #27ae60; border-radius:4px;">
                `;
                fotosEncontradas++;
                
                // Mostrar mensaje de éxito principal
                if (fotosEncontradas === 1) {
                    resultadoDiv.innerHTML += `
                        <div style="background:#d4edda; color:#155724; padding:15px; border-radius:5px; margin-top:15px;">
                        <h4>🎉 ¡PATRÓN DESCUBIERTO!</h4>
                        <p>Las fotos de flota se llaman: <code><strong>${nombreArchivo}</strong></code></p>
                        <p>Guarda esta información. Con este patrón podemos hacer que el sistema funcione completamente.</p>
                        </div>
                    `;
                }
            };
            
            img.onerror = function() {
                // Foto no encontrada con este patrón
                pruebaDiv.querySelector('.estado').innerHTML = '<span style="color:#95a5a6;">❌ No encontrada</span>';
            };
            
            img.src = urlCompleta;
        });
        
        // Si no se encontró ninguna foto después de 3 segundos
        setTimeout(() => {
            if (fotosEncontradas === 0) {
                resultadoDiv.innerHTML += `
                    <div style="background:#f8d7da; color:#721c24; padding:15px; border-radius:5px; margin-top:20px;">
                    <h4>🤔 No se encontraron fotos con los patrones comunes</h4>
                    <p><strong>Sugerencias:</strong></p>
                    <ol>
                        <li>Prueba con otros números (100, 200, 1, 2, 10, 20...)</li>
                        <li>Revisa tu repositorio en GitHub para ver los nombres REALES de las fotos</li>
                        <li>Las fotos podrían estar en una carpeta (ej: <code>/fotos/</code> o <code>/images/</code>)</li>
                    </ol>
                    </div>
                `;
            }
        }, 3000);
    }
    
    // Probar automáticamente con un número común al cargar
    setTimeout(() => {
        document.getElementById('flotaInput').value = '101';
        document.getElementById('buscarBtn').click();
    }, 500);
});
