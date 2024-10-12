class Producto {
    constructor(nombre, precio, año) {
        this.nombre = nombre;
        this.precio = precio;
        this.año = año;
    }
}

// Interfaz
class UI {
    addProduct(producto) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        
      
        element.innerHTML = `
            <div class="card small-card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center p-2">
                    <span class="product-name">${producto.nombre}</span>
                    <button class="btn btn-close" name="eliminar"></button>
                </div>
                <div class="card-body p-2">
                    <p class="product-price"><strong>Precio:</strong> Q ${producto.precio}</p>
                    <p class="product-year">${producto.año}</p>
                </div>
            </div>
        `;
        
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'eliminar') {
            element.closest('.card').remove(); 
            this.showMessage('Producto eliminado satisfactoriamente', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}

// Eventos del DOM
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('Nombre').value;
    const precio = document.getElementById('Precio').value;
    const año = document.getElementById('Año').value;

    const producto = new Producto(nombre, precio, año);
    const ui = new UI();


    if (nombre === '' || precio === '' || año === '') {
        return ui.showMessage('Completar datos de información', 'warning');
    }

    ui.addProduct(producto);
    ui.resetForm();
    ui.showMessage('Producto agregado satisfactoriamente', 'success');
});


document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});