const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []

cargarEventListeners()

// eventListeners
function cargarEventListeners() {

  listaCursos.addEventListener('click', agregarCarrito);
  carrito.addEventListener('click',eliminarCurso);

  vaciarCarritoBtn.addEventListener('click', () =>{
    articulosCarrito = []
    limpiarHTML()
  })
}

// funciones

function agregarCarrito(e){

  e.preventDefault()
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerCurso(cursoSeleccionado)
  }

}

function leerCurso(curso){

  //crea el objeto con la info del curso
  const infoCurso ={
    id: curso.querySelector('a').getAttribute('data-id'),
    titulo: curso.querySelector('h4').textContent,
    imagen: curso.querySelector('img').src,
    precio: curso.querySelector('p span').textContent,
    cantidad: 1
  }

  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe){
    // actualizar la cantidad
    const cursos = articulosCarrito.map( curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad ++
        return curso // retorna el curso actualizado
      }else{
        return curso // retorna los objetos que no son duplicados
      }
      articulosCarrito = [...cursos]
    })

  }else{

    articulosCarrito = [...articulosCarrito, infoCurso]
  }
  
  carritoHTML()
}

function carritoHTML(){

  // limpiar el html
  limpiarHTML()

  // recorre el carrito y los agrega al html
  articulosCarrito.forEach(curso => {
    const {imagen, titulo,precio,cantidad,id} = curso
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
      <img src='${imagen}' alt='curso ${titulo}'>
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href='#' class='borrar-curso' data-id='${id}'>X</a>
      </td>
    `
    contenedorCarrito.appendChild(row)
 });
}

function eliminarCurso(e){
  e.preventDefault()
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter(curso => cursoId !== curso.id)

    carritoHTML()
  }
  //const cursos = articulosCarrito.filter( curso => curso.id !== infoCurso.id)
  //console.log(cursos)
}

function limpiarHTML(){
  while(contenedorCarrito.firstChild){

    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}