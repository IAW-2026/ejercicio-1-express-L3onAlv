const express = require('express');
const app = express();

// Variable para contar visitas
let visitasInicio = 0;

const mensajes = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz (ANTES del middleware estático)
app.get('/', (req, res) => {
  visitasInicio += 1;
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

//Ruta /stats - Mostrar contador de visitas
app.get('/stats', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Estadísticas</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>Estadísticas</h1>
        <p>La ruta <strong>/</strong> ha sido visitada <strong>${visitasInicio}</strong> veces.</p>
        <div class = "enlaces">
          <a href="/acerca">Acerca de</a>
          <a href="/contacto">Contactame</a>
          <a href="/">Volver al inicio</a>
        </div>
        <script src="script.js"></script>
    </body>
    </html>
  `);
});

app.post('/', (req,res)=>{
  const { mensaje } = req.body;
  mensajes.push(mensaje);
  res.send(`
    <h1>Amorosos comentarios:</h1>
    <ul>${mensajes.join('<p>')}</ul>
    <style>body { background-color: #2BFF00;}</style>
    <a href="/">Volver al inicio</a>
  `);
})

app.get('/api/productos', (req, res) => {
  const productos = [
    { nombre: 'Titulo1', precio: 1500 },
    { nombre: 'Titulo2', precio: 3000 },
    { nombre: 'Titulo3', precio: 8000 }
  ];
  res.json(productos);
});

app.post('/api/contacto', (req, res) => {
  const { respuesta } = req.body;
  const mensaje = respuesta === 'si' ? '¡Perfecto!' : '...';
  res.json({ mensaje });
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

app.get('/encuesta',(req,res)=> {
  res.sendFile(__dirname + '/public/encuesta.html');
})

app.post('/encuesta', (req, res) => {
  const { respuesta } = req.body;
  res.send(`<h1>Tu titulo favorito es: ${respuesta}</h1>
    <style>body { background-color: #2BFF00;}</style>
    <a href="/">Volver al inicio</a>`);
});

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