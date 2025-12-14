// BUS DEPOT - Sistema Simple y Visual
console.log('🚌 Sistema Bus Depot INICIADO');

function mostrarResultado(mensaje, tipo = 'info') {
    const colores = {
        info: 'blue',
        exito: 'green',
        error: 'red',
        advertencia: 'orange'
    };
    
    // Crear o actualizar el área de resultados
    let resultadoDiv = document.getElementById('resultadoBusqueda');
    if (!resultadoDiv) {
        resultadoDiv = document.createElement('div');
        resultadoDiv.id = 'resultadoBusqueda';
        resultadoDiv.style.cssText = `
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            max-width: 800px;
            text-align: center;
            border-left: 5px solid ${colores[tipo]};
        `;
        document.body.appendChild(resultadoDiv);
    }
    
    resultadoDiv.innerHTML = `
        <h3 style="color:${colores[tipo]};">${mensaje.titulo || 'Resultado:'}</h3>
        <p>${mensaje.texto || ''}</p>
        ${mensaje.imagen ? `<img src="${mensaje.imagen}" style="max-width:300px; margin:15px 0; border:3px solid ${colores[tipo]};">` : ''}
        ${mensaje.detalles ? `<div style="background:#f8f9fa; padding:10px; margin-top:10px; text-align:left;">${mensaje.detalles}</div>` : ''}
    `;
}

function buscarFlota() {
    const numero = document.querySelector('input[type="text"]')?.value || '101';
    
    if (!numero || isNaN(numero)) {
        mostrarResultado({
            titulo: '⚠️ Error',
            texto: 'Ingresa un número válido (ej: 101, 202, 1001)'
        }, 'error');
        return;
    }
    
    mostrarResultado({
        titulo: '🔍 Buscando...',
        texto: `Probando fotos para flota <strong>${numero}</strong>`
    }, 'info');
    
    // Patrones comunes a probar
    const patrones = [
        `https://megiasnp.github.io/bus-depot/${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/bus-${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/flota${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/${numero}-bus.jpg`,
        `https://megiasnp.github.io/bus-depot/IMG_${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/bus_${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/autobus${numero}.jpg`,
        `https://megiasnp.github.io/bus-depot/${numero}.png`,
        `https://megiasnp.github.io/bus-depot/bus-${numero}.png`
    ];
    
    let encontrada = false;
    
    // Probar cada patrón
    patrones.forEach((url, index) => {
        setTimeout(() => {
            if (encontrada) return;
            
            const img = new Image();
            img.onload = function() {
                encontrada = true;
                mostrarResultado({
                    titulo: '🎉 ¡FOTO ENCONTRADA!',
                    texto: `Flota <strong>${numero}</strong> encontrada con patrón: <code>${url.split('/').pop()}</code>`,
                    imagen: url,
                    detalles: `✅ ¡ÉXITO! URL: <a href="${url}" target="_blank">${url}</a><br>
                              Guarda este patrón para el sistema final.`
                }, 'exito');
                
                // Guardar en consola
                console.log(`✅ FOTO ENCONTRADA: ${url}`);
            };
            
            img.onerror = function() {
                // Solo mostrar el último error si no se encontró nada
                if (index === patrones.length - 1 && !encontrada) {
                    mostrarResultado({
                        titulo: '🤔 No se encontró',
                        texto: `No hay foto para flota ${numero} con los patrones comunes.`,
                        detalles: `Patrones probados:<br>${patrones.map(p => `• ${p.split('/').pop()}`).join('<br>')}`
                    }, 'advertencia');
                }
            };
            
            img.src = url;
        }, index * 300); // Pequeño retraso entre pruebas
    });
}

// Inicializar cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página cargada, sistema listo');
    
    // Crear botón si no existe
    if (!document.querySelector('button')) {
        const input = document.querySelector('input[type="text"]');
        if (input) {
            const boton = document.createElement('button');
            boton.textContent = '🔍 BUSCAR FOTO';
            boton.style.cssText = `
                padding: 10px 20px;
                background: #2c3e50;
                color: white;
                border: none;
                border-radius: 5px;
                margin-left: 10px;
                cursor: pointer;
                font-size: 16px;
            `;
            boton.onclick = buscarFlota;
            input.parentNode.appendChild(boton);
        }
    }
    
    // Configurar búsqueda automática al cargar
    setTimeout(() => {
        buscarFlota();
    }, 1000);
});
