document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const resultSection = document.getElementById('result');
    const fileContent = document.getElementById('fileContent');
    const downloadBtn = document.getElementById('downloadBtn');
    
    let generatedContent = '';
    let fileName = '';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const semestre = document.getElementById('semestre').value;
        const materia = document.getElementById('materia').value;
        const comida = document.getElementById('comida').value;
        
        // Generar nombre del archivo (sin espacios ni caracteres especiales)
        const nombreArchivo = nombre.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
        fileName = `${nombreArchivo}_perfil.txt`;
        
        // Generar contenido del archivo
        const fecha = new Date().toLocaleDateString('es-ES');
        generatedContent = `===========================================
PERFIL DE ESTUDIANTE - GIT ESSENTIALS
===========================================

📅 Fecha de creación: ${fecha}
👤 Nombre: ${nombre}
📚 Semestre: ${semestre}
📖 Materia favorita: ${materia}
🍕 Comida favorita: ${comida}

===========================================
CURSO: Git Essentials
👨‍🏫 INSTRUCTOR: Luis Flores
⏱️ DURACIÓN: 3 horas
===========================================

📝 NOTAS PERSONALES:
- Este archivo fue generado como parte de la actividad práctica
- Recuerda hacer commit de este archivo a tu repositorio
- ¡Disfruta aprendiendo Git! 🚀

===========================================
¡Gracias por participar en Git Essentials!
===========================================`;

        // Mostrar vista previa
        fileContent.textContent = generatedContent;
        resultSection.style.display = 'block';
        
        // Scroll hacia el resultado
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    downloadBtn.addEventListener('click', function() {
        // Crear blob con el contenido
        const blob = new Blob([generatedContent], { type: 'text/plain' });
        
        // Crear URL temporal
        const url = window.URL.createObjectURL(blob);
        
        // Crear elemento de descarga temporal
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // Limpiar
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
    });

    function showSuccessMessage() {
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = '✅ ¡Descargado!';
        downloadBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.style.backgroundColor = '';
        }, 2000);
    }
});