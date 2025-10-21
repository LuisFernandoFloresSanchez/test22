document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const profileViewer = document.getElementById('profileViewer');

    // Elementos para mostrar la información
    const profileTitle = document.getElementById('profileTitle');
    const fileName = document.getElementById('fileName');
    const studentName = document.getElementById('studentName');
    const studentSemester = document.getElementById('studentSemester');
    const studentSubject = document.getElementById('studentSubject');
    const studentFood = document.getElementById('studentFood');
    const courseName = document.getElementById('courseName');
    const instructor = document.getElementById('instructor');
    const duration = document.getElementById('duration');
    const creationDate = document.getElementById('creationDate');
    const rawFileContent = document.getElementById('rawFileContent');

    // Eventos para drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Evento para selección manual de archivo
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Función para manejar el archivo
    function handleFile(file) {
        // Verificar que sea un archivo .txt
        if (!file.name.toLowerCase().endsWith('.txt')) {
            showMessage('❌ Por favor selecciona un archivo .txt', 'error');
            return;
        }

        // Leer el archivo
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            displayProfile(file.name, content);
        };
        reader.readAsText(file);
    }

    // Función para mostrar el perfil
    function displayProfile(filename, content) {
        // Parsear el contenido del archivo
        const profileData = parseProfileContent(content);
        
        // Actualizar la interfaz
        profileTitle.textContent = `Perfil de ${profileData.nombre}`;
        fileName.textContent = filename;
        studentName.textContent = profileData.nombre;
        studentSemester.textContent = profileData.semestre;
        studentSubject.textContent = profileData.materia;
        studentFood.textContent = profileData.comida;
        courseName.textContent = profileData.curso;
        instructor.textContent = profileData.instructor;
        duration.textContent = profileData.duracion;
        creationDate.textContent = profileData.fecha;
        rawFileContent.textContent = content;

        // Mostrar el visor
        profileViewer.style.display = 'block';
        profileViewer.scrollIntoView({ behavior: 'smooth' });

        showMessage('✅ Perfil cargado exitosamente', 'success');
    }

    // Función para parsear el contenido del archivo
    function parseProfileContent(content) {
        const data = {
            nombre: 'No encontrado',
            semestre: 'No encontrado',
            materia: 'No encontrado',
            comida: 'No encontrado',
            curso: 'No encontrado',
            instructor: 'No encontrado',
            duracion: 'No encontrado',
            fecha: 'No encontrado'
        };

        // Extraer información usando expresiones regulares
        const patterns = {
            fecha: /📅 Fecha de creación: (.+)/,
            nombre: /👤 Nombre: (.+)/,
            semestre: /📚 Semestre: (.+)/,
            materia: /📖 Materia favorita: (.+)/,
            comida: /🍕 Comida favorita: (.+)/,
            curso: /CURSO: (.+)/,
            instructor: /👨‍🏫 INSTRUCTOR: (.+)/,
            duracion: /⏱️ DURACIÓN: (.+)/
        };

        Object.keys(patterns).forEach(key => {
            const match = content.match(patterns[key]);
            if (match) {
                data[key] = match[1].trim();
            }
        });

        return data;
    }

    // Función para mostrar mensajes
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }
});