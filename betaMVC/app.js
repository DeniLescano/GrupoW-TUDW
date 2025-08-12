
document.addEventListener('DOMContentLoaded', () => {
    const initialProducts = [
        { id: 1, name: "Combo 1 – Gestión Empresarial Integral", description: "Sistema de gestión contable, panel de inventarios y ventas, y WPA para facturación.", price: 5000, stock: 10 },
        { id: 2, name: "Combo 2 – Comercio y Ventas", description: "Punto de venta (POS), tienda online con pasarela de pagos y WPA para gestión de pedidos.", price: 4500, stock: 15 },
        { id: 3, name: "Combo 3 – Salud y Bienestar", description: "Software para gestión de turnos y pacientes, portal de reservas online y WPA para agenda médica.", price: 4000, stock: 20 },
        { id: 4, name: "Combo 4 – Educación y Capacitación", description: "Plataforma de gestión académica, campus virtual con cursos y WPA para acceso de alumnos.", price: 3500, stock: 0 },
        { id: 5, name: "Combo 5 – Logística y Transporte", description: "Sistema de gestión de flotas, panel web para seguimiento de envíos y WPA para control de entregas.", price: 4800, stock: 12 }
    ];

    let currentProducts = [...initialProducts];

    const container = document.getElementById('productos-container');

    const renderProducts = (productsToRender) => {
        container.innerHTML = ''; // Limpiar contenedor
        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card p-3';
            card.innerHTML = `
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <div class="price">$${product.price.toLocaleString()}</div>
                <div class="stock-badge">Stock: ${product.stock}</div>
            `;
            container.appendChild(card);
        });
    };

    // Botones de acciones
    document.getElementById('sort-price-desc').addEventListener('click', () => {
        currentProducts.sort((a, b) => b.price - a.price);
        renderProducts(currentProducts);
    });

    document.getElementById('sort-stock-asc').addEventListener('click', () => {
        currentProducts.sort((a, b) => a.stock - b.stock);
        renderProducts(currentProducts);
    });

    document.getElementById('filter-stock').addEventListener('click', () => {
        const inStock = currentProducts.filter(p => p.stock > 0);
        renderProducts(inStock);
    });

    document.getElementById('add-product').addEventListener('click', () => {
        const newId = Math.max(...currentProducts.map(p => p.id)) + 1;
        currentProducts.push({ id: newId, name: 'Nuevo Combo', description: 'Descripción de prueba.', price: 2500, stock: 5 });
        renderProducts(currentProducts);
    });

    document.getElementById('remove-last').addEventListener('click', () => {
        if (currentProducts.length > 0) {
            currentProducts.pop();
            renderProducts(currentProducts);
        }
    });

    document.getElementById('reset').addEventListener('click', () => {
        currentProducts = [...initialProducts];
        renderProducts(currentProducts);
    });

    // Botón de tema
    const toggleBtn = document.getElementById('toggle-theme');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        toggleBtn.textContent = document.body.classList.contains('light') ? 'Modo Oscuro' : 'Modo Claro';
    });

    // Render inicial
    renderProducts(currentProducts);
});
