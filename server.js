const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Configurar el servidor para servir archivos estáticos desde la carpeta 'src'
app.use(express.static(path.join(__dirname, 'src')));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`The server express to listen in http://localhost:${port}`);
});
