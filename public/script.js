console.log('Script cargado');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Página cargada');
});

document.getElementById('boton').addEventListener('click', () => {
  const respuesta = document.querySelector('input[name="respuesta"]:checked').value;

  fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ respuesta })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('respuesta').innerText = data.mensaje;
    });
});