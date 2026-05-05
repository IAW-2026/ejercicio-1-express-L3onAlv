const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

//Ruta /acerca
app.get('/acerca',(req,res) => {
  res.sendFile(__dirname + '/public/acerca.html');
}
);

//Ruta /contacto
app.get('/contacto',(req,res) => {
  res.sendFile(__dirname + '/public/contacto.html');
}
);

app.post('/contacto', (req, res) => {
  const { nombre, mensaje } = req.body;
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Datos Enviados</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>Datos Recibidos</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        <div class = "enlaces">
          <a href="/acerca">Acerca de</a>
          <a href="/contacto">Volver al formulario</a>
          <a href="/">Volver al inicio</a>
        </div>
        <script src="script.js"></script>
    </body>
    </html>
  `);
}
);



// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 