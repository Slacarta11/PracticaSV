import axios from 'axios';

window.readPedidos = function () {
    axios.get('http://localhost:8080/PractivaSV')
        .then((response) => {
            const pedidosList = response.data; //lee las pelis
            const pedidosTable = document.getElementById('tableBody'); //al cambiar el formato a tablas ya no se usa movies como abajo sino que va tableBody
            //const movieUl = el('movies');   //identifica la lista que tiene que llenar


            pedidosList.forEach(pedido => {   
                const row = document.createElement('tr');  //ahora por cada peli vamos a crear una fila por cada peli
                row.id = 'pedido-' + pedido.id; //buscamos numerar las peliculas para una vez eliminemos la peli no haya que refrescar la pagina web
                row.innerHTML = td(pedido.fecha) +
                                /*'<td>' + movie.description + '</td>' +*/ //en vez de simplificar el td se podrian haber puesto asi pero al crear la variable td cambia todo
                                td(pedido.hora) +
                                td(pedido.numero) +
                                td(pedido.precio) +
                                td(pedido.cantidad) +
                                '<a class="btn btn-warning" href="modify.html">' +
                                icon('edit') +
                                '</a>' +
                                '<a class= "btn btn-danger" href="javascript:removePedido(' + pedido.id + ')">' +
                                icon('delete') +
                                '</a>';
                                
                pedidosTable.appendChild(row);  //con esto añadimos la fila del row a la tabla (movieTable)
            });

            window.removePedido = function(id) {    //nos va a permitir borrar la peli pasado un ID
                    if (confirm('¿Estás seguro de que quieres eliminar el pedido?')){  //buscamos sacar un letrero de confirmación de si quiere eliminar
                     axios.delete('http://localhost:8080/PracticaSV/' + id)  
                        .then((response) => {
                            if (response.status == 204) {
                                notifySuccess('Pedido eliminado');
                                el('pedido-' + id).remove(); //con esto borramos el elemento de la barra del frontend
                            }
                        });
                    }
            } 
        });
}
