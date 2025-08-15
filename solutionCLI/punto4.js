//punto 4 parte 2//
//punto 5//
function mayorCero(producto) {
    return producto.stock>0;
}

const productosConStock=products.filter(mayorCero);
console.log("Productos con stock mayor a 0",productosConStock);

//punto 6//
function nombres(producto){
    return producto.name
}

const nombresProductos=products.map(nombres)
console.log("Nombres de todos los productos:",nombresProductos);

//punto 7//

function elementoCinco(producto){
return producto.id ==5;
}

let primerProducto= products.find(elementoCinco)
if (primerProducto){
console.log("encontrado",primerProducto);
} else {
console.log("Este producto no existe");
}


//punto 8//
const productosOrdenados=products.slice().sort(function(a,b) {
return b.price - a.price;

});
console.log("productos ordenados:",productosOrdenados);