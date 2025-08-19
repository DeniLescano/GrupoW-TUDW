const productosOrdenados = [
  {
    id: 1,
    name: 'Combo 1 – Gestión Empresarial Integral',
    description: 'Sistema de gestión contable, panel de inventarios y ventas, y WPA para facturación.',
    price: 5000,
    stock: 10
  },
  {
    id: 5,
    name: 'Combo 5 – Logística y Transporte',
    description: 'Sistema de gestión de flotas, panel web para seguimiento de envíos y WPA para control de entregas.',
    price: 4800,
    stock: 12
  },
  {
    id: 2,
    name: 'Combo 2 – Comercio y Ventas',
    description: 'Punto de venta (POS), tienda online con pasarela de pagos y WPA para gestión de pedidos.',
    price: 4500,
    stock: 15
  },
  {
    id: 3,
    name: 'Combo 3 – Salud y Bienestar',
    description: 'Software para gestión de turnos y pacientes, portal de reservas online y WPA para agenda médica.',
    price: 4000,
    stock: 20
  },
  {
    id: 4,
    name: 'Combo 4 – Educación y Capacitación',
    description: 'Plataforma de gestión académica, campus virtual con cursos y WPA para acceso de alumnos.',
    price: 3500,
    stock: 25
  },
  {
    id: 6,
    name: 'Combo 6 - Marketing Digital',
    description: 'Gestión de redes, SEO y campañas.',
    price: 3200,
    stock: 30
  }
];

const container = document.getElementById('productos-container');

productosOrdenados.forEach(producto => {
  const card = document.createElement('div');
  card.classList.add('card', 'p-3');

  card.innerHTML = `
    <h5 class="card-title">${producto.name}</h5>
    <p class="card-text">${producto.description}</p>
    <div class="price">$${producto.price.toLocaleString()}</div>
    <div class="stock-badge">Stock: ${producto.stock}</div>
  `;

  container.appendChild(card);
});

const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    toggleBtn.textContent = 'Modo Oscuro';
  } else {
    toggleBtn.textContent = 'Modo Claro';
  }
});
