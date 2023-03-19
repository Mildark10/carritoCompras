
//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];


// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    
     // Al Vaciar el carrito
    
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
     });
}

///FUNCIONES

function  agregarCurso(e) {
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
   }
}

//eliminar un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}

//leer el contenido del html al ue le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    //crear un objeto con el contenido del curso actual
    const inforCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent, //text content => es para obtener el texto de ese elemento html
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento  ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === inforCurso.id);


    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === inforCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; // retorna el objeto no duplicados 
            }
        });
        articulosCarrito = [...cursos];
    } else {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito , inforCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();

}

//muestra el carrito de compras en el html
function carritoHTML() {
    //LIMPIAR HTML
    limpiarHTML();
    //recorrer el carrito y generar el html
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad} </td>
            <td>
                 <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;  
        //Agregamos el html del carrito en tbody
        contenedorCarrito.appendChild(row);
    });
}


function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}